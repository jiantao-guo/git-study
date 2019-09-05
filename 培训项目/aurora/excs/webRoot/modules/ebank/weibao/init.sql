begin
	
	
  	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_CUSTOMERNO','CHARACTER','银企直联-微保客户号','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保客户号','ZHS','EXP5140','N','N');
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_CUSTOMERNO','CHARACTER','银企直联-微保客户号','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保客户号','US','EXP5140','N','N');
	
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_GOODNO','CHARACTER','银企直联-微保商品号','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保商品号','ZHS','EXP5140','N','N');
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_GOODNO','CHARACTER','银企直联-微保商品号','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保商品号','US','EXP5140','N','N');

		
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_KEY','CHARACTER','银企直联-加密密码','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-加密密码','ZHS','EXP5140','N','N');
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_KEY','CHARACTER','银企直联-加密密码','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-加密密码','US','EXP5140','N','N');

	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_HOST','CHARACTER','银企直联-微保主机名','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保主机名','ZHS','EXP5140','N','N');
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_HOST','CHARACTER','银企直联-微保主机名','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保主机名','US','EXP5140','N','N');
	
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_PORT','CHARACTER','银企直联-微保端口','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保端口','ZHS','EXP5140','N','N');
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_PORT','CHARACTER','银企直联-微保端口','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保端口','US','EXP5140','N','N');
	
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_PAY_CONTEXT','CHARACTER','银企直联-微保支付接口上下文','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保支付接口上下文','ZHS','EXP5140','N','N');
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_PAY_CONTEXT','CHARACTER','银企直联-微保支付接口上下文','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保支付接口上下文','US','EXP5140','N','N');
	
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_QUERY_CONTEXT','CHARACTER','银企直联-微保查询接口上下文','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保查询接口上下文','ZHS','EXP5140','N','N');
	sys_parameter_pkg.insert_parameters_load('CSH','EBANK_WEIBAO_QUERY_CONTEXT','CHARACTER','银企直联-微保查询接口上下文','Y','Y','Y','N','N','',to_date('1000-01-01','YYYY-MM-DD'),to_date('3000-01-01','YYYY-MM-DD'),'银企直联-微保查询接口上下文','US','EXP5140','N','N');

  	sys_code_pkg.insert_sys_code_value('CODING_RULE_DOC_CATEGORY','91','微保流水号','ZHS','');
  	sys_code_pkg.update_sys_code_value('CODING_RULE_DOC_CATEGORY','91','WeiBao Request SN','US','');
end ;