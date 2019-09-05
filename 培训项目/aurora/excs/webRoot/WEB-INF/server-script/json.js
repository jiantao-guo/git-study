function fmt(s) {
	if (typeof s == 'object' && s != null)
		return json2str(s);
	return typeof s == 'string' ? '"' + s.replace('"', '\\"') + '"' : s;
}
function json2str(o) {
	var arr = [];
	var ia = o instanceof Array;
	for ( var i in o) {
		if (ia)
			arr.push(fmt(o[i]));
		else
			arr.push('"' + i + '":' + fmt(o[i]));
	}
	return (ia ? '[' : '{') + arr.join(',') + (ia ? ']' : '}');
}

function parseErrorMessage(e) {
	var serviceContext = Packages.aurora.service.ServiceContext
			.createServiceContext($ctx.getData());
	var ed = $instance('aurora.service.exception.IExceptionDescriptor');
	var map = new CompositeMap(ed.process(serviceContext, e));
	return map.message;
}

function write(json) {
	var resp = $ctx['_instance.javax.servlet.http.HttpServletResponse'];
	resp.setContentType('application/json;charset=utf-8');
    resp.setCharacterEncoding("utf-8");
	resp.setHeader("Cache-Control", "no-cache, must-revalidate");
	resp.getWriter().write(json2str(json));
	resp.getWriter().close();
}

function writeUm(compositeMap){
    var json = Packages.uncertain.composite.JSONAdaptor.toJSONObject(result.getData(), null);
    var resp = $ctx.getData().get('_instance.javax.servlet.http.HttpServletResponse');
    resp.setContentType('application/json;charset=utf-8');
    resp.setCharacterEncoding("utf-8");
    json.write(resp.getWriter());
    resp.getWriter().close();	
}

function catchCode(){
	/*异常处理方式1,将异常信息直接传给客户端 
		var serviceContext = Packages.aurora.service.ServiceContext.createServiceContext($ctx.getData());
		var ed = $instance('aurora.service.exception.IExceptionDescriptor');
		var map = new CompositeMap(ed.process(serviceContext, e.javaException));
	  
		var result = new CompositeMap();
		var head = result.createChild('head');
		head.message = map.message;
		head.code = 'failure';
		return result;         
	*/
	  
	//异常处理方式2,查询sys_raise_app_errrors表,将message字段传给客户端 start
	  try{
	    var bm = new ModelService('mobile.sys_raise_app_errors_query');
	    var res = bm.queryAsMap();
	    var arr = res.getChildren();
	     	
	  	var result = new CompositeMap();
	  	var head = result.createChild('head');
	  	head.message = arr[0].MESSAGE;
	  	head.code = 'failure';    
	  }catch(e){
	   	var serviceContext = Packages.aurora.service.ServiceContext.createServiceContext($ctx.getData());
	  	var ed = $instance('aurora.service.exception.IExceptionDescriptor');
	  	var map = new CompositeMap(ed.process(serviceContext, e.javaException));
	  
	  	var result = new CompositeMap();
	  	var head = result.createChild('head');
	  	head.message = map.message;
	  	head.code = 'failure';                                          
	  } finally{
		  return result;
	  }
	//异常处理方式2,查询sys_raise_app_errrors表,将message字段传给客户端 end
}

function finallyCode(result){
	if(result instanceof CompositeMap){
		writeUm(result);
	}else{
		write(result);
	}
}