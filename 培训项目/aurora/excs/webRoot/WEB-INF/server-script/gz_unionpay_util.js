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

function GzUnionPayUtil() {
	this.username = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_USERNAME'
	}).getChildren()[0].parameter_value;
	this.password = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_PASSWORD'
	}).getChildren()[0].parameter_value;
	this.decryptKeyPath = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_DECRYPT_KEY_PATH'
	}).getChildren()[0].parameter_value;
	this.encryptKeyPath = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_ENCRYPT_KEY_PATH'
	}).getChildren()[0].parameter_value;
	this.encryptKeyPassword = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_ENCRYPT_KEY_PASSWORD'
	}).getChildren()[0].parameter_value;
	this.host = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_HOST'
	}).getChildren()[0].parameter_value;
	this.port = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_PORT'
	}).getChildren()[0].parameter_value;
	this.context = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_CONTEXT'
	}).getChildren()[0].parameter_value;
	this.merchantId = $bm('ebank.get_parameter_value').queryAsMap({
		parameter_code : 'EBANK_GZ_UNIONPAY_MERCHANT_ID'
	}).getChildren()[0].parameter_value;
	this.url = String('http://' + this.host + ':' + this.port + this.context);
};

/**
 * 加密传送的XML报文
 */
GzUnionPayUtil.prototype.encryptXML = function(xmlStr) {
	// 签名，由我发发起的请求为UTF-8编码，需要设置为UTF-8加密方式
	var crypt = new Crypt("GBK");
	// 移除掉<SIGNED_MSG/>标签，对剩下的内容进行加签
	var strMsg = xmlStr.replace("<SIGNED_MSG/>", "");
	// 调用签名包签名接口(原文,私钥路径,密码)
	var signedMsg = crypt.sign(strMsg, this.encryptKeyPath,
			this.encryptKeyPassword);
	// 返回加签过后的报文
	return xmlStr.replace("<SIGNED_MSG/>", "<SIGNED_MSG>" + signedMsg
			+ "</SIGNED_MSG>");
};

/**
 * 验证回传的XML报文
 */
GzUnionPayUtil.prototype.validateSign = function(xmlStr) {
	// 验签，返回的报文内容为GBK编码，需要设置为GBK验签方式
	var crypt = new Crypt("GBK");
	// 找到<SIGNED_MSG>标签的起始位置
	var iStart = xmlStr.indexOf("<SIGNED_MSG>");
	if (iStart != -1) {
		// 找到</SIGNED_MSG>标签的中介位置
		var end = xmlStr.indexOf("</SIGNED_MSG>");
		// 获取到签名信息
		var signedMsg = xmlStr.substring(iStart + 12, end);
		// 获取到出去签名部分的信息
		var strMsg = xmlStr.substring(0, iStart) + xmlStr.substring(end + 13);
		// 验证签名
		if (crypt.verify(strMsg, signedMsg, this.decryptKeyPath)) {
			return true;
		} else {
			return false;
		}
	}
	return true;
};

/**
 * 获取请求流水号
 */
GzUnionPayUtil.prototype.getReqSn = function() {
	$bm('ebank.unionpay_guangzhou.get_req_sn').execute();
	var reqSn = $ctx.parameter.req_sn;
	return reqSn;
};

/**
 * 调用广银联接口
 */
GzUnionPayUtil.prototype.invokeInterface = function(xmlStr) {
	var requestStr, responseStr, errorStr, httpStatus, errorCode, successFlag = true;
	requestStr = xmlStr;
	$bm('db.sys_http_util_pkg.insert_http_record').execute({
		request_str : requestStr,
		url : this.url
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
				.setPort(this.port).setPath(this.context).build();
		// 新建POST请求
		var post = new HttpPost(uri);
		// 设置POST请求体
		post.setEntity(new StringEntity(requestStr, ContentType.create(
				"application/xml", "GBK")));
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
 * 获取由广银联支付的记录
 */
GzUnionPayUtil.prototype.getNeedPayRecords = function() {
	var recordsMap = $bm('ebank.unionpay_guangzhou.get_need_pay_records')
			.queryAsMap();
	return recordsMap.getChildren();
}

/**
 * 获取需要查询的REQ_SN号
 */
GzUnionPayUtil.prototype.getNeedQueryRecords = function() {
	var recordsMap = $bm('ebank.unionpay_guangzhou.get_need_query_records')
			.queryAsMap();
	return recordsMap.getChildren();
}