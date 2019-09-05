importClass(Packages.com.gnete.security.crypt.Crypt);
importClass(Packages.com.gnete.security.crypt.CryptException);
importClass(Packages.java.io.InputStream);
importClass(Packages.java.io.UnsupportedEncodingException);
importClass(Packages.java.net.URI);
importClass(java.lang.StringBuffer);
importClass(Packages.org.apache.commons.logging.Log);
importClass(Packages.org.apache.commons.logging.LogFactory);
importClass(Packages.org.apache.http.HttpResponse);
importClass(Packages.org.apache.http.HttpStatus);
importClass(Packages.org.apache.http.client.HttpClient);
importClass(Packages.org.apache.http.client.methods.HttpPost);
importClass(Packages.org.apache.http.client.utils.URIBuilder);
importClass(Packages.org.apache.http.config.ConnectionConfig);
importClass(Packages.org.apache.http.entity.StringEntity);
importClass(Packages.org.apache.http.entity.ContentType);
importClass(Packages.org.apache.http.impl.client.HttpClients);
importClass(Packages.org.apache.http.impl.conn.BasicHttpClientConnectionManager);
importClass(Packages.org.apache.http.util.CharsetUtils);
importClass(Packages.org.apache.commons.io.IOUtils);
importClass(Packages.org.apache.commons.io.LineIterator);
importClass(Packages.aurora.plugin.hec.weibao.MD5Tool);
importClass(Packages.aurora.plugin.hec.weibao.BASE64Tool);
importClass(Packages.org.apache.http.NameValuePair);
importClass(Packages.org.apache.http.message.BasicNameValuePair);
importClass(Packages.org.apache.http.client.entity.UrlEncodedFormEntity);
importClass(Packages.java.util.List);
importClass(Packages.java.util.ArrayList);
importClass(Packages.org.apache.http.HttpEntity);

function WeibaoUtil() {
	this.customerNo = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_WEIBAO_CUSTOMERNO'
	}).getChildren()[0].parameter_value;
	this.goodNo = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_WEIBAO_GOODNO'
	}).getChildren()[0].parameter_value;
	this.key = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_WEIBAO_KEY'
	}).getChildren()[0].parameter_value;
	this.host = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_WEIBAO_HOST'
	}).getChildren()[0].parameter_value;
	this.port = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_WEIBAO_PORT'
	}).getChildren()[0].parameter_value;
	this.payContext = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_WEIBAO_PAY_CONTEXT'
	}).getChildren()[0].parameter_value;
	this.queryContext = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_WEIBAO_QUERY_CONTEXT'
	}).getChildren()[0].parameter_value;
	this.sendUrl = String('http://' + this.host + ':' + this.port + this.payContext);
	this.queryUrl = String('http://' + this.host + ':' + this.port + this.queryContext);
};

/**
 * 对传递的数据进行签名
 */
WeibaoUtil.prototype.sign = function(xmlStr) {
	var md5Tool = new MD5Tool();
	var signStr = md5Tool.getStrMD(MD5Tool.setLoop(xmlStr) + this.key)
			.toUpperCase();
	return signStr;
};

/**
 * 对传递的数据进行BASE64转码
 */
WeibaoUtil.prototype.encodeBase64 = function(str) {
	return BASE64Tool.getBase64(str);
};

/**
 * 获取批量订单号
 */
WeibaoUtil.prototype.getBatchOrderNo = function() {
	$bm('ebank.weibao.get_batch_order_no').execute();
	var batchOrderNo = $ctx.parameter.batch_order_no;
	return batchOrderNo;
};

/**
 * 调用微保接口
 */
WeibaoUtil.prototype.invokeInterface = function(sendStr, interfaceType) {
	if (interfaceType == 'SEND') {
		var url = this.sendUrl;
		var context = this.payContext;
	} else if (interfaceType == 'QUERY') {
		var url = this.queryUrl;
		var context = this.queryContext;
	}
	var requestStr, responseStr, errorStr, httpStatus, errorCode, successFlag = true;
	requestStr = sendStr;
	$bm('db.sys_http_util_pkg.insert_http_record').execute({
		request_str : requestStr,
		url : url
	});
	requestStr = new java.lang.String(requestStr);
	var recordId = $ctx.parameter.record_id;
	try {
		// 新建连接管理器
		var connManager = new BasicHttpClientConnectionManager();
		// 设置请求为GBK编码格式
		var connectionConfig = ConnectionConfig.custom().setCharset(
				CharsetUtils.get('UTF-8')).build();
		connManager.setConnectionConfig(connectionConfig);
		// 新建HTTP连接
		var client = HttpClients.custom().setConnectionManager(connManager)
				.build();
		// 设置URI信息
		var uri = new URIBuilder().setScheme("http").setHost(this.host)
				.setPort(this.port).setPath(context).build();
		// 新建POST请求
		var post = new HttpPost(uri);
		// 设置POST请求体
		post.setEntity(new StringEntity(requestStr, ContentType.create(
				"multipart/form-data", "GBK")));
		var formParams = new ArrayList();
		formParams.add(new BasicNameValuePair('reqmsg',sendStr));
		var entity = new UrlEncodedFormEntity(formParams, "GBK");
		post.setEntity(entity);
		// 在client上执行post请求
		var resp = client.execute(post);
		// 获得返回的HTTP状态码
		httpStatus = resp.getStatusLine().getStatusCode();
		// HTTP请求失败
		if (resp.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
			successFlag = false;
			// 获取状态行
			errorCode = resp.getStatusLine();
			// 读取内容
			var sb = new StringBuffer();
			var is = resp.getEntity().getContent();
			try {
				// 设置返回内容的编码格式
				var it = IOUtils.lineIterator(is, "GBK");
				while (it.hasNext()) {
					sb.append(it.nextLine());
				}
			} finally {
				IOUtils.closeQuietly(is);
			}
			errorStr = sb.toString();
		} else {
			successFlag = true;
			// 读取内容
			var sb = new StringBuffer();
			var is = resp.getEntity().getContent();
			try {
				// 设置返回内容的编码格式
				var it = IOUtils.lineIterator(is, "GBK");
				while (it.hasNext()) {
					sb.append(it.nextLine());
				}
			} finally {
				IOUtils.closeQuietly(is);
			}
			responseStr = sb.toString();
		}
	} catch (e) {
		successFlag = false;
		errorStr = e.message;
	} finally {
		$bm('db.sys_http_util_pkg.update_http_record').execute({
			record_id : recordId,
			response_str : responseStr,
			http_status : httpStatus,
			error_code : errorCode,
			error_str : errorStr
		});
	}
	if (successFlag) {
		return responseStr;
	} else {
		return 'ERROR';
	}
};

/**
 * 获取由微保支付的记录
 */
WeibaoUtil.prototype.getNeedPayRecords = function() {
	var recordsMap = $bm('ebank.weibao.get_need_pay_records').queryAsMap();
	return recordsMap.getChildren();
}

/**
 * 获取需要查询的batchOrderNo号
 */
WeibaoUtil.prototype.getNeedQueryRecords = function() {
	var recordsMap = $bm('ebank.weibao.get_need_query_records').queryAsMap();
	return recordsMap.getChildren();
}