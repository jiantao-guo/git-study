function auto_login_check() {

}

auto_login_check.prototype.setTokenFromReq = function() {
	// println("setToken");
	var parameter = $ctx.parameter;
	var token = parameter.token;
	parameter.user_language = 'ZHS';
	if (!token) {
		var req = $ctx.getData().get(
				'_instance.javax.servlet.http.HttpServletRequest');
		token = req.getHeader("token");
	}
	parameter.sid = String(token);
};

auto_login_check.prototype.getTokenCount = function() {
	// println("getTokenCount");
	// var parameter = $ctx.parameter;
	// println(parameter.token);
	// $ctx.parameter.token = parameter.token;
	var bm = new ModelService(
			'mobile.clients.commons.login.mbs_auto_login_token_check');
	bm.option = {
		rootPath : 'token_count'
	};
	bm.query();
	var tokenCount = $ctx.get('/model/token_count/record/@token_count');
	// println(tokenCount);
	return tokenCount;
};

auto_login_check.prototype.writeSession = function() {
	// println("writeSession");
	if (this.getTokenCount() >= 1) {
		var bm = new ModelService(
				'mobile.touch.login.sys_user_auto_login_with_userid');
		bm.execute();
		var parameter = $ctx.parameter;
		var mobile_auto_status = parameter.mobile_auto_status;

		if (mobile_auto_status == "SUCCESS") {
			var sid = parameter.sid;
			var encryted_session_id = parameter.encryted_session_id;

			$session.write('session_id', '/session/@session_id');
			$session.write('lang', '/parameter/@user_language');
			$session.write('user_id', '/session/@user_id');
			$session.write('company_id', '/session/@company_id');
			$session.write('role_id', '/session/@role_id');
			$session.write('device_type', '/session/@device_type');
			$session.copy();
			$cookie.put('SID', sid);
			$cookie.put('JSID', encryted_session_id);
			$cookie.put('IS_NTLM', 'N');
		}
	} else {
		var parameter = $ctx.parameter;
		parameter.mobile_auto_status = "FAILED";
	}
};