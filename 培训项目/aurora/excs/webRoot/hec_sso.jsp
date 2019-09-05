<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.hand.sso.SSOOp" %>
<%@ page import="com.hand.sso.GetUsername" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>建信人寿费控系统</title>
</head>
<body>
	<%
	String tokens = request.getParameter("token");
	GetUsername gu = new GetUsername();
	String sso_username = gu.getCurrentUsername(tokens);
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
%>
</body>
<DIV><%=sso_username%></DIV>
</html>