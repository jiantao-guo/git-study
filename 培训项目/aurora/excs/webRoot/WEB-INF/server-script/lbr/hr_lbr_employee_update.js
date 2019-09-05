var config = $config();

var object_code = 'HR_LBR_EMPLOYEE_BASE';
var role_id = $session.role_id;
var role_type = 'RELATIVE';
var update_flag = 'Y';

var employee_id = $ctx.parameter.employee_id; 

//获取当前登陆员工的employee_id
var empIdBm = new ModelService('hr.lbr.LBR150.hr_lbr_get_employee_id');
var empIdBmRes = empIdBm.queryAsMap();
var empIdBmResArr = empIdBmRes.getChildren();
var c_employee_id = empIdBmResArr[0].employee_id;

//传入employee_id 为空时 查询当前员工
if (!employee_id) {
  employee_id = c_employee_id;
}

//获取数据
var categoryBm = new ModelService('hr.lbr.LBR150.hr_lbr_get_field_category');
var categoryRes = categoryBm.queryAsMap({object_code : object_code,
										role_id : role_id,
										role_type : role_type,
										update_flag : update_flag });
var categoryArr = categoryRes.getChildren();

var roleFieldBm = new ModelService('hr.lbr.LBR150.hr_lbr_get_role_field');
var roleFieldRes = roleFieldBm.queryAsMap({object_code : object_code,
											role_id : role_id,
											role_type : role_type,
											update_flag : update_flag });
var roleFieldArr = roleFieldRes.getChildren();

//var employeeIdBm = new ModelService('hr.lbr.LBR150.hr_lbr_get_employee_id');
//var employeeIdRes = employeeIdBm.queryAsMap();
//var employeeIdArr = employeeIdRes.getChildren();
//var employee_id =employeeIdArr[0].employee_id;
//sql

if(roleFieldArr.length > 0){
	var filed_sql = ' employee_id ';
for (f = 0;f < roleFieldArr.length;f++) {
	filed_sql = filed_sql + ' , ' + roleFieldArr[f].field_name.toLowerCase()+' ';
}
$session.filed_sql=filed_sql;

//dataSet
var hr_lbr_employee_ds = new CompositeMap(CompositeUtil.findChild(config, "dataSets"))
.createChildNS("dataSet");
hr_lbr_employee_ds.id="hr_lbr_employee_ds";
hr_lbr_employee_ds.autoquery="true";
hr_lbr_employee_ds.model="hr.lbr.hr_lbr_employee" ;
hr_lbr_employee_ds.queryurl="${/request/@context_path}/autocrud/hr.lbr.LBR150.hr_lbr_employee_report_vl/query?employee_id=" + employee_id ;
hr_lbr_employee_ds.submiturl="${/request/@context_path}/autocrud/hr.lbr.hr_lbr_employee/batch_update" ;
hr_lbr_employee_ds.processfunction="dsProcessFunction";

//员工号，状态不可修改
var fields = hr_lbr_employee_ds.createChildNS('fields');

var employee_code = fields.createChildNS('field');
employee_code.name="employee_code";
employee_code.readonly= "true";

var employee_status = fields.createChildNS('field');
employee_status.name="cur_state";
employee_status.readonly= "true";

//组件展示
//	var image = new CompositeMap(CompositeUtil.findChild(config, "screenBody"))
//	.createChildNS("image");
//	image.alt="photo";
//	image.height="200";
//	image.width="150" ;
//	image.src="${/request/@context_path}/images/NoPhoto.gif" ;
//	var upLoadButton = new CompositeMap(CompositeUtil.findChild(config, "screenBody"))
//	.createChildNS("button");
//	upLoadButton.text='上传照片';

	

for (i = 0;i < categoryArr.length;i++) {
	var form = new CompositeMap(CompositeUtil.findChild(config, "screenBody"))
	.createChildNS("form");
	form.column='1';
	var field_category = categoryArr[i].field_category;
		form.title= field_category;
		form.width='800';
	    form.labelwidth='200';
	
	for (j = 0;j < roleFieldArr.length;j++) {
		var field_category_j = roleFieldArr[j].field_category;
		
		if(field_category == field_category_j){
			var bindtarget='hr_lbr_employee_ds';
			var prompt=roleFieldArr[j].field_name_id_display;
			var name=roleFieldArr[j].field_name.toLowerCase();
			var display_width = '250'; 
			
			
			if (roleFieldArr[j].display_width){
				display_width = roleFieldArr[j].display_width;
			}
			if ('DATE' == roleFieldArr[j].data_type){
				var datePicker = form.createChildNS('datePicker');
				datePicker.bindtarget=bindtarget;
				datePicker.prompt=prompt;
				datePicker.name=name;
				datePicker.width=display_width;
			}else if (roleFieldArr[j].reference_object){
				//ds
				var lookupCode = roleFieldArr[j].reference_object;
				var cdodDsId = name+"_ds";
				//syscode  ds
				var codeDataSet = new CompositeMap(CompositeUtil.findChild(config, "dataSets"))
				.createChildNS("dataSet");
				codeDataSet.id=cdodDsId;
				codeDataSet.lookupcode=lookupCode;
				var field = fields.createChildNS('field');
				
				field.name=name;
				field.displayfield=roleFieldArr[j].reference_dis_field;
				field.options=cdodDsId;
				var physical_name = roleFieldArr[j].physical_name.toLowerCase();
				field.returnfield= physical_name;   //name+"_id" ;
				field.valuefield=roleFieldArr[j].reference_value_field;
				
                var field_id = fields.createChildNS('field');
				
                field_id.name=physical_name;
				
				var comboBox = form.createChildNS('comboBox');
				comboBox.bindtarget=bindtarget;
				comboBox.prompt=prompt;
				comboBox.name=name;
				comboBox.width=display_width;
				
			}else{
				var textField = form.createChildNS('textField');
				textField.bindtarget=bindtarget;
				textField.prompt=prompt;
				textField.name=name;
				textField.width=display_width;
			}
			
			
		}
	}
}


var hBox = new CompositeMap(CompositeUtil.findChild(config, "screenBody"))
.createChildNS("hBox");

var saveButton = hBox.createChildNS("button");
saveButton.text='HAP_SAVE';
saveButton.click='saveEmployee';

var resetButton = hBox.createChildNS("button");
resetButton.text='HAP_RESET';
resetButton.click='resetFun';
}