var CacheTool = function() {

	var loadPageNormal = function(pageAtt) {
		var httpRequest = $ctx['_instance.javax.servlet.http.HttpServletRequest'];
		var cookies = httpRequest.getCookies();
		var pageUrl = new java.lang.String(httpRequest.getRequestURL())
				.replace(httpRequest.getRequestURI(), '')
				+ $ctx.getObject('request').context_path
				+ '/'
				+ pageAtt.screen
				+ '?page_id=' + pageAtt.page_id + '&refresh_cache=Y';
		var url = new java.net.URL(pageUrl);
		var urlConn = url.openConnection();
		for(var cookieIndex in cookies){
			urlConn.addRequestProperty("Cookie",cookies[cookieIndex].getName() + '=' + cookies[cookieIndex].getValue());
		}
		var isr = null;
		var br = null;
		try {
			isr = new java.io.InputStreamReader(urlConn.getInputStream())
			br = new java.io.BufferedReader(isr);
			while (br.readLine() != null);
		} finally {
			try {
				br.close()
			} finally {
				isr.close();
			}
		}
	}

	var loadPageOperate = function(pageAtt) {
		var httpRequest = $ctx['_instance.javax.servlet.http.HttpServletRequest'];
		var cookies = httpRequest.getCookies();
		var pageUrl = new java.lang.String(httpRequest.getRequestURL())
				.replace(httpRequest.getRequestURI(), '')
				+ $ctx.getObject('request').context_path
				+ '/'
				+ pageAtt.screen
				+ '?page_id='
				+ pageAtt.page_id
				+ '&refresh_cache=Y&view_type=OPERATE';
		var url = new java.net.URL(pageUrl);
		var urlConn = url.openConnection();
		for(var cookieIndex in cookies){
			urlConn.addRequestProperty("Cookie",cookies[cookieIndex].getName() + '=' + cookies[cookieIndex].getValue());
		}
		var isr = null;
		var br = null;
		try {
			isr = new java.io.InputStreamReader(urlConn.getInputStream())
			br = new java.io.BufferedReader(isr);
			while (br.readLine() != null);
		} finally {
			try {
				br.close()
			} finally {
				isr.close();
			}
		}
	}

	var loadPageView = function(pageAtt) {
		var httpRequest = $ctx['_instance.javax.servlet.http.HttpServletRequest'];
		var cookies = httpRequest.getCookies();
		var pageUrl = new java.lang.String(httpRequest.getRequestURL())
				.replace(httpRequest.getRequestURI(), '')
				+ $ctx.getObject('request').context_path
				+ '/'
				+ pageAtt.screen
				+ '?page_id='
				+ pageAtt.page_id
				+ '&refresh_cache=Y&view_type=VIEW';
		var url = new java.net.URL(pageUrl);
		var urlConn = url.openConnection();
		for(var cookieIndex in cookies){
			urlConn.addRequestProperty("Cookie",cookies[cookieIndex].getName() + '=' + cookies[cookieIndex].getValue());
		}
		var isr = null;
		var br = null;
		try {
			isr = new java.io.InputStreamReader(urlConn.getInputStream())
			br = new java.io.BufferedReader(isr);
			while (br.readLine() != null);
		} finally {
			try {
				br.close()
			} finally {
				isr.close();
			}
		}
	}
	

	var loadPageSuperView = function(pageAtt) {
		var httpRequest = $ctx['_instance.javax.servlet.http.HttpServletRequest'];
		var cookies = httpRequest.getCookies();
		var pageUrl = new java.lang.String(httpRequest.getRequestURL())
				.replace(httpRequest.getRequestURI(), '')
				+ $ctx.getObject('request').context_path
				+ '/'
				+ pageAtt.screen
				+ '?page_id='
				+ pageAtt.page_id
				+ '&refresh_cache=Y&view_type=SUPER_VIEW';
		var url = new java.net.URL(pageUrl);
		var urlConn = url.openConnection();
		for(var cookieIndex in cookies){
			urlConn.addRequestProperty("Cookie",cookies[cookieIndex].getName() + '=' + cookies[cookieIndex].getValue());
		}
		var isr = null;
		var br = null;
		try {
			isr = new java.io.InputStreamReader(urlConn.getInputStream())
			br = new java.io.BufferedReader(isr);
			while (br.readLine() != null);
		} finally {
			try {
				br.close()
			} finally {
				isr.close();
			}
		}
	}
	

	var loadPageCurrentNodeView = function(pageAtt) {
		var httpRequest = $ctx['_instance.javax.servlet.http.HttpServletRequest'];
		var cookies = httpRequest.getCookies();
		var pageUrl = new java.lang.String(httpRequest.getRequestURL())
				.replace(httpRequest.getRequestURI(), '')
				+ $ctx.getObject('request').context_path
				+ '/'
				+ pageAtt.screen
				+ '?page_id='
				+ pageAtt.page_id
				+ '&refresh_cache=Y&view_type=CURRENT_NODE_VIEW';
		var url = new java.net.URL(pageUrl);
		var urlConn = url.openConnection();
		for(var cookieIndex in cookies){
			urlConn.addRequestProperty("Cookie",cookies[cookieIndex].getName() + '=' + cookies[cookieIndex].getValue());
		}
		var isr = null;
		var br = null;
		try {
			isr = new java.io.InputStreamReader(urlConn.getInputStream())
			br = new java.io.BufferedReader(isr);
			while (br.readLine() != null);
		} finally {
			try {
				br.close()
			} finally {
				isr.close();
			}
		}
	}
	

	var loadPageUserView = function(pageAtt) {
		var httpRequest = $ctx['_instance.javax.servlet.http.HttpServletRequest'];
		var cookies = httpRequest.getCookies();
		var pageUrl = new java.lang.String(httpRequest.getRequestURL())
				.replace(httpRequest.getRequestURI(), '')
				+ $ctx.getObject('request').context_path
				+ '/'
				+ pageAtt.screen
				+ '?page_id='
				+ pageAtt.page_id
				+ '&refresh_cache=Y&view_type=USER_VIEW';
		var url = new java.net.URL(pageUrl);
		var urlConn = url.openConnection();
		for(var cookieIndex in cookies){
			urlConn.addRequestProperty("Cookie",cookies[cookieIndex].getName() + '=' + cookies[cookieIndex].getValue());
		}
		var isr = null;
		var br = null;
		try {
			isr = new java.io.InputStreamReader(urlConn.getInputStream())
			br = new java.io.BufferedReader(isr);
			while (br.readLine() != null);
		} finally {
			try {
				br.close()
			} finally {
				isr.close();
			}
		}
	}

	return {
		refresh : function() {
			var paraArray = $ctx.parameter.getChildren();
			var paraLength = paraArray.length;
			if (paraArray && paraLength && paraLength > 0) {
				for ( var i = 0; i < paraLength; i++) {
					var para = paraArray[i];
					if (para['group_id'] && !para['page_id']) {
						$ctx.parameter['group_id'] = para['group_id'];
						$ctx.parameter['page_id'] = null;
						var pageMap = $bm('bpm.ENGINE.bpm_pages').queryAsMap();
						var pageArr = pageMap.getChildren();
						var pageLength = pageArr.length;
						if (pageArr && pageArr.length && pageArr.length > 0) {
							for ( var j = 0; j < pageLength; j++) {
								loadPageNormal(pageArr[j]);
								loadPageOperate(pageArr[j]);
								loadPageView(pageArr[j]);
								loadPageSuperView(pageArr[j]);
								loadPageCurrentNodeView(pageArr[j]);
								loadPageUserView(pageArr[j])
							}
						}
					} else if (para['page_id']) {
						$ctx.parameter['page_id'] = para['page_id'];
						$ctx.parameter['group_id'] = null;
						var pageMap = $bm('bpm.ENGINE.bpm_pages').queryAsMap();
						var pageArr = pageMap.getChildren();
						var pageLength = pageArr.length;
						if (pageArr && pageArr.length && pageArr.length > 0) {
							for ( var j = 0; j < pageLength; j++) {
								loadPageNormal(pageArr[j]);
								loadPageOperate(pageArr[j]);
								loadPageView(pageArr[j]);
								loadPageSuperView(pageArr[j]);
								loadPageCurrentNodeView(pageArr[j]);
								loadPageUserView(pageArr[j])
							}
						}
					}
				}
			} else if ($ctx.parameter.group_id || $ctx.parameter.page_id) {
				var pageMap = $bm('bpm.ENGINE.bpm_pages').queryAsMap();
				var pageArr = pageMap.getChildren();
				var pageLength = pageArr.length;
				if (pageArr && pageArr.length && pageArr.length > 0) {
					for ( var j = 0; j < pageLength; j++) {
						loadPageNormal(pageArr[j]);
						loadPageOperate(pageArr[j]);
						loadPageView(pageArr[j]);
						loadPageSuperView(pageArr[j]);
						loadPageCurrentNodeView(pageArr[j]);
						loadPageUserView(pageArr[j])
					}
				}
			}
		}
	}
}();
// 刷新缓存
CacheTool.refresh();