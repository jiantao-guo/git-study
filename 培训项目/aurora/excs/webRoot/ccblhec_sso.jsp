<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.hand.sso.SSOOp"%>
<%@ page import="com.hand.sso.GetLocalIP"%>
<%@ page import="com.hand.sso.GetAdParameter"%>
<%@ page import="com.ping.ahservice.common.util.ClientUtil"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>建信人寿费用管控系统</title>
</head>
<body>
	<%
    /* post的方式传值参数获取 */
	String systemId = request.getParameter("SystemID");//需要验证的业务系统id（包括分公司id）
	String userId = request.getParameter("userid");//用户id
	String username = request.getParameter("username");//用户名
	String cmpid = request.getParameter("cmpid");//公司ID
	/* 系统配置参数获取 */
	GetAdParameter gp = new GetAdParameter();
	String ahIP = gp.getAdParameter("SSO_AH_IP");//单点登录验证服务器ip
	String ahServlet = gp.getAdParameter("SSO_AH_SERVLET");//单点登录验证servlet名
	String ahPort = gp.getAdParameter("SSO_AH_PORT");//单点登录验证服务器端口
	GetLocalIP gi = new GetLocalIP();
	String localIp = gi.getlocalIp();//客户端的IP地址
	String localServerName = "CCBLHECSERVER";//需要验证的业务系统服务器名 
	
	boolean flag = false ;
	ClientUtil ct = new ClientUtil();
	flag = ClientUtil.ah(systemId,userId,ahIP,ahServlet,ahPort,localIp ,localServerName);
	
	if(flag){
	/* 校验通过，执行费控系统登录逻辑*/
	String sso_username = username;
	if(sso_username != null && !"".equals(sso_username)){
		SSOOp ssoOp = new SSOOp();
		Object tokenO = ssoOp.generateToken(sso_username);
		String sso_op = request.getParameter("sso_op");
		String record_id = request.getParameter("record_id");
		String instance_id = request.getParameter("instance_id");
		String token = "";
		 if(tokenO != null){
			token = tokenO.toString();
			if(token != null && !"".equals(token)){
				String url = "af_sso_login.screen?token=" + token ;
				if(sso_op != null && !"".equals(sso_op)&&record_id != null && !"".equals(record_id)){
					url += "&sso_op=" + sso_op+"&record_id=" + record_id ;
				}
				if(sso_op != null && !"".equals(sso_op)&&instance_id != null && !"".equals(instance_id)){
					url += "&sso_op=" + sso_op +"&instance_id=" + instance_id;
				}
			    response.sendRedirect(url.toString());
			}
		} 
	}else{
	}
	}else{
		%>
	<script language=javascript>
		alert("操作失败，连不上单点服务器！");
		parent.window.location = "pageError.gif";
	</script>
	alert("操作失败！");
	<%
	}
%>
</body>
<DIV><%=sso_username%></DIV>
</html>