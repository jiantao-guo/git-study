var config = $config();

var object_code = 'HR_LBR_EMPLOYEE_BASE';
var role_id = $session.role_id;
var role_type = 'RELATIVE';
var view_flag = 'Y';
var employee_id = $ctx.parameter.employee_id; 

//获取当前登陆员工的employee_id
var empIdBm = new ModelService('hr.lbr.LBR150.hr_lbr_get_employee_id');
var empIdBmRes = empIdBm.queryAsMap();
var empIdBmResArr = empIdBmRes.getChildren();
var c_employee_id =  empIdBmResArr[0].employee_id;
var v_role_id = empIdBmResArr[0].role_id;

//println("role:============"+employee_id);

//传入employee_id 为空时 查询当前员工
if (!employee_id) {
    employee_id = c_employee_id;
}

var categoryBm = new ModelService('hr.lbr.LBR150.hr_lbr_get_field_category');
var categoryRes = categoryBm.queryAsMap({object_code : object_code,
										role_id : v_role_id,
										role_type : role_type,
										view_flag : view_flag });
var categoryArr = categoryRes.getChildren();

var roleFieldBm = new ModelService('hr.lbr.LBR150.hr_lbr_get_role_field');
var roleFieldRes = roleFieldBm.queryAsMap({object_code : object_code,
											role_id : v_role_id,
											role_type : role_type,
											view_flag : view_flag });
var param ={object_code : object_code,
        role_id : v_role_id,
        role_type : role_type,
        view_flag : view_flag };

//for (i in param) println(i+"--"+param[i]);

var roleFieldArr = roleFieldRes.getChildren();

if(roleFieldArr.length > 0){
//sql
var filed_sql = ' employee_id ';

for (f = 0;f < roleFieldArr.length;f++) {
	filed_sql = filed_sql + ' , ' + roleFieldArr[f].field_desc.toLowerCase()+' ';
}
$session.filed_sql=filed_sql;
 
//dataSet
var hr_lbr_employee_ds = new CompositeMap(CompositeUtil.findChild(config, "dataSets"))
.createChildNS("dataSet");
hr_lbr_employee_ds.id="hr_lbr_employee_ds";
//hr_lbr_employee_ds.loaddata="true";
hr_lbr_employee_ds.autoquery="true";
hr_lbr_employee_ds.model="hr.lbr.LBR150.hr_lbr_employee_report_vl" ;
hr_lbr_employee_ds.queryurl="${/request/@context_path}/autocrud/hr.lbr.LBR150.hr_lbr_employee_report_vl/query?employee_id=" + employee_id;
hr_lbr_employee_ds.processfunction="dsProcessFunction";

//if (categoryArr.length > 0){
//	var image = new CompositeMap(CompositeUtil.findChild(config, "screenBody"))
//	.createChildNS("image");
//	image.alt="photo";
//	image.height="200";
//	image.width="150" ;
//	image.src="${/request/@context_path}/images/NoPhoto.gif" ;
//}


for (i = 0;i < categoryArr.length;i++) {
	var form = new CompositeMap(CompositeUtil.findChild(config, "screenBody"))
	.createChildNS("form");
	form.column='2';
	var field_category = categoryArr[i].field_category ;
	form.title= field_category;
	form.width='1000';
	form.labelwidth='200';
	
	for (j = 0;j < roleFieldArr.length;j++) {
		var field_category_j = roleFieldArr[j].field_category;
  
	    var display_width = '250';
		if(field_category == field_category_j){
			var bindtarget='hr_lbr_employee_ds';
			var prompt=roleFieldArr[j].field_name_id_display;
			var name=roleFieldArr[j].field_name.toLowerCase();
			if ('DATE' == roleFieldArr[j].data_type){
				var datePicker = form.createChildNS('datePicker');
				datePicker.bindtarget=bindtarget;
				datePicker.prompt=prompt;
				datePicker.readonly='true';
				datePicker.name=name; 
                datePicker.width=display_width;
			}else{
				var textField = form.createChildNS('textField');
				textField.bindtarget=bindtarget;
				textField.prompt=prompt;
				textField.readonly='true';
				textField.name=name;
				textField.width=display_width;
			}
		}
	}
}
}
var screen = new CompositeMap(CompositeUtil.findChild(config, "screenBody")).createChildNS("screen-include");
    screen.screen="modules/hr/lbr/LBR150/hr_prj_tabs_display.screen?employee_id="+employee_id;

println(config.toXML());