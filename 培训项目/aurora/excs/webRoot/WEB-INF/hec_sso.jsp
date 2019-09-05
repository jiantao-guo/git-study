<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%
	HttpSession s = request.getSession(); 
	
	Object username = s.getAttribute("username");
	String u = username.toString();
	
	
	Object tokenO = s.getAttribute("token");
	String sso_op = request.getParameter("sso_op");
	String token = "";
	if(tokenO != null){
		token = tokenO.toString();
		if(token != null && !"".equals(token)){
			String url = "af_sso_login.screen?token=" + token ;
			if(sso_op != null && !"".equals(sso_op)){
				url += "&sso_op=" + sso_op;
			}
			response.sendRedirect(url.toString());
		}
	}else{
		//不知道什么原因,有时没有token
		//String sso_username = s.getAttribute("sso_username").toString();
		String sso_username = "ADMIN";
		String url = "af_sso_login.screen?sso_username=" + sso_username ;
		if(sso_op != null && !"".equals(sso_op)){
			url += "&sso_op=" + sso_op;
		}
		response.sendRedirect(url.toString());
	}
	
	//Object username = s.getAttribute("token");

	
%>
</body>
<div><%=u%></div>
</html>