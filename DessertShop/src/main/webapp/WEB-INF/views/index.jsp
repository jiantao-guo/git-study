<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" import="entity.*" import="vo.*"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%> --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Home</title>
<link href="<%=request.getContextPath()%>/css/bootstrap.css"
	rel="stylesheet" type="text/css" media="all" />
<!--theme-style-->
<link href="<%=request.getContextPath()%>/css/style.css"
	rel="stylesheet" type="text/css" media="all" />
<!--//theme-style-->
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<script type="application/x-javascript">
	
	
	
	
	 addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } 




</script>
<!--fonts-->
<link
	href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800'
	rel='stylesheet' type='text/css'>
<!--//fonts-->
<script src="<%=request.getContextPath()%>/js/jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/js/jquery.easydropdown.js"></script>
<!--script-->
</head>
<body>
	<!--header-->
	<div class="header">
		<div class="top-header">
			<div class="container">
				<div class="top-header-left">
					<ul class="support">
						<li><a href="#"><label> </label></a></li>
						<li><a href="#">24x7 服务支持<span class="live">
									</span></a></li>
					</ul>
					<ul class="support">
						<li class="van"><a href="#"><label> </label></a></li>
						<li><a href="#">已全面覆盖全国各大中小城市 <span class="live">
									</span></a></li>
					</ul>
					<div class="clearfix"></div>
				</div>
				<div class="top-header-right">
					<div class="down-top">

						<select tabindex="4" class="dropdown">
							<option value="" class="label" value="">English</option>
							<option value="1">Japanese</option>
							<option value="2">French</option>
							<option value="3">German</option>
						</select>
					</div>
					<div class="down-top top-down">

						<select tabindex="4" class="dropdown ">
							<option value="" class="label" value="">Currency :USD</option>
							<option value="1">Dollar</option>
							<option value="2">Euro</option>
						</select>
					</div>

					<!---->
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="bottom-header">
			<div class="container">
				<div class="header-bottom-left">
					<div class="logo">
						<a href="<%=request.getContextPath()%>/Dessert/Index"><img
							src="<%=request.getContextPath()%>/images/logo.png" alt=" " /></a>
					</div>
					<div class="search">
						<!-- <input type="text" value="" onfocus="this.value = '';"
							onblur="if (this.value == '') {this.value = '';}"> <input
							type="submit" value="查询"> -->

						 <form action="<%=request.getContextPath()%>/Dessert/Query"
							method="post">
							<input type="text" value="" name="keyword"
								onfocus="this.value = '';"
								onblur="if (this.value == '') {this.value = '';}"> <input
								type="submit" value="查询">

						</form>  
 

					</div>
					<div class="clearfix"></div>
				</div>
				<div class="header-bottom-right">
					<ul class="men-grid">
						<%
							User user = (User) session.getAttribute("user");
							if (user != null) {
						%>
						<li><a href="login.html"><span> </span>${user.getUsername() }</a></li>
						<li class="login"><a
							href="<%=request.getContextPath()%>/Dessert/Index"><span>
							</span>注销</a></li>
						<li class="cart"><a href="#"><span> </span>购物车</a></li>
						<%
							} else {
						%>
						<li><a href="<%=request.getContextPath()%>/Account/Login"><span>
							</span>登录</a></li>
						<li class="login"><a
							href="<%=request.getContextPath()%>/Account/Register"><span>
							</span>注册</a></li>
						<%
							}
						%>

					</ul>

				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!---->
	<div class="tlinks">
		Collect from <a href="http://www.cssmoban.com/">网页模板</a>
	</div>
	<div class="container">
		<div class="banner-menu">

			<div class="shoes-grid">
				<div class="wmuSlider example1 slide-grid">
					<c:forEach items="${bigDessert }" var="bigDessert">
						<div class="wmuSliderWrapper">

							<article style="position: absolute; width: 100%; opacity: 0;">
							<div class="banner-matter">
								<img class="img-responsive banner-bag"
									src="<%=request.getContextPath()%>/pic/${bigDessert.getPic()}" alt=" " />
								<div class="banner-off">
									<h2>折扣 ${bigDessert.getRebate() }%</h2>
									<span>${bigDessert.getName() } <b>限时销售</b></span>
									<p></p>
									<a class="now-get"
										href="<%=request.getContextPath()%>/Dessert/Single?id=${bigDessert.getId()}">马上购买</a>
								</div>
								<div class="clearfix"></div>
							</div>
							</article>

						</div>
						<ul class="wmuSliderPagination">
							<li><a href="#" class=""></a></li>
						</ul>
					</c:forEach>
				</div>

				<script src="<%=request.getContextPath()%>/js/jquery.wmuSlider.js"></script>
				<script>
					$('.example1').wmuSlider();
				</script>
				<!---->
				<%-- <div class="shoes-grid-left">
					<c:forEach items="${clicksDessert }" var="clicksDessert">
						<div class=" con-sed-grid sed-left-top" style="margin-right: 13px;">
							<div class="elit-grid" >
								<h4>热门首选</h4>
								<span>${clicksDessert.getName() }</span>
								<p>安心食材，放心品尝。
								</p>
								<!-- <p>口感一流，美味健康。
								</p> -->
								<a class="now-get" href="<%=request.getContextPath()%>/Dessert/Single?id=${clicksDessert.getId()}">查看详情</a>
							</div>
							<a href="single.html"><img class="img-responsive shoe-left"
								src="<%=request.getContextPath()%>/pic/${clicksDessert.getPic()}" alt=" " style="weight:160px;height:160px;"/></a>
						</div>
					</c:forEach>
											
					
					
				</div> --%>
				<div class="clearfix"></div>
				<div class="products">
					<h5 class="latest-product">最新上架</h5>
					<a class="view-all" href="<%=request.getContextPath()%>/Dessert/Search?keyword=null&pageNo=null&typeWord=null">更多<span> </span></a>
				</div>
				<div class="product-left">
					<c:forEach items="${newDessert }" var="newDessert">

						<div class=" chain-grid" style="margin-right: 17px;">
							<a
								href="<%=request.getContextPath()%>/Dessert/Single?id=${newDessert.getId()}"><img
								class="img-responsive chain"
								src="<%=request.getContextPath()%>/pic/${newDessert.getPic()}" alt=" " /></a> <span
								class="star"> </span>
							<div class="grid-chain-bottom">
								<h6>${newDessert.getName() }</h6>
								<div class="star-price">
									<div class="dolor-grid">
										<span class="actual">${newDessert.getPrice() }$</span>
										<span class="reducedfrom">${newDessert.getPrice() }$</span> <span
											class="rating"> <input type="radio"
											class="rating-input" id="rating-input-1-5"
											name="rating-input-1"> <label for="rating-input-1-5"
											class="rating-star1"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-4"
											name="rating-input-1"> <label for="rating-input-1-4"
											class="rating-star1"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-3"
											name="rating-input-1"> <label for="rating-input-1-3"
											class="rating-star"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-2"
											name="rating-input-1"> <label for="rating-input-1-2"
											class="rating-star"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-1"
											name="rating-input-1"> <label for="rating-input-1-1"
											class="rating-star"> </label>
										</span>
									</div>
									<a class="now-get get-cart" href="#">查看详情</a>
								</div>
							</div>

						</div>

					</c:forEach>
				</div>
				<div class="clearfix"></div>
				<div class="products">
					<h5 class="latest-product">最热商品</h5>
					<a class="view-all" href="<%=request.getContextPath()%>/Dessert/Search?keyword=null&pageNo=null&typeWord=null">更多<span> </span></a>
				</div>
				<c:forEach items="${hotDessert }" var="hotDessert">
					<div class="product-left">
						<div class=" chain-grid" style="margin-right: 17px;">
							<a href="single.html"><img class="img-responsive chain"
								src="<%=request.getContextPath()%>/pic/${hotDessert.getPic()}" alt=" " /></a>
							<span class="star"> </span>
							<div class="grid-chain-bottom">
								<h6>${hotDessert.getName() }</h6>
								<div class="star-price">
									<div class="dolor-grid">
										<span class="actual">${hotDessert.getRebate()/100*hotDessert.getPrice() }$</span>
										<span class="reducedfrom">${hotDessert.getPrice() }$</span> <span
											class="rating"> <input type="radio"
											class="rating-input" id="rating-input-1-5"
											name="rating-input-1"> <label for="rating-input-1-5"
											class="rating-star1"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-4"
											name="rating-input-1"> <label for="rating-input-1-4"
											class="rating-star1"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-3"
											name="rating-input-1"> <label for="rating-input-1-3"
											class="rating-star"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-2"
											name="rating-input-1"> <label for="rating-input-1-2"
											class="rating-star"> </label> <input type="radio"
											class="rating-input" id="rating-input-1-1"
											name="rating-input-1"> <label for="rating-input-1-1"
											class="rating-star"> </label>

										</span>
									</div>
									<a class="now-get get-cart" href="#">查看详情</a>
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
					</div>
				</c:forEach>
				<div class="clearfix"></div>
			</div>
			<div class="sub-cate">
				<div class=" top-nav rsidebar span_1_of_left">
					<h3 class="cate">分类</h3>
					<ul class="menu">


						<ul class="kid-menu ">
							<li><a href="<%=request.getContextPath()%>/Dessert/Type?typeWord=1">手机</a></li>
							<li><a href="<%=request.getContextPath()%>/Dessert/Type?typeWord=2">电脑</a></li>
							<li><a href="<%=request.getContextPath()%>/Dessert/Type?typeWord=3">男装</a></li>
							<li><a href="<%=request.getContextPath()%>/Dessert/Type?typeWord=4">女装</a></li>
							<li><a href="<%=request.getContextPath()%>/Dessert/Type?typeWord=5">数码</a></li>
							<li><a href="<%=request.getContextPath()%>/Dessert/Type?typeWord=6">日用品</a></li>
							<li><a href="<%=request.getContextPath()%>/Dessert/Type?typeWord=7">零食</a></li>
						</ul>
					</ul>
				</div>

				<c:forEach items="${expensiveDessert }" var="expensiveDessert">
					<div class=" chain-grid menu-chain">
						<a href="<%=request.getContextPath()%>/Dessert/Single?id=${expensiveDessert.getId()}"><img class="img-responsive chain"
							src="<%=request.getContextPath()%>/pic/${expensiveDessert.getPic()}" alt=" " /></a>
						<div class="grid-chain-bottom chain-watch">
							<span class="actual dolor-left-grid">￥${expensiveDessert.getRebate()/100*expensiveDessert.getPrice()}</span> <span
								class="reducedfrom">￥${expensiveDessert.getPrice()}</span>
							<h6>${expensiveDessert.getName() }</h6>
						</div>
					</div>
				</c:forEach>
				 <a class="view-all all-product"
					href="<%=request.getContextPath()%>/Dessert/Search?keyword=null&pageNo=null&typeWord=null">查看更多<span>
				</span>
				</a> 
				<%-- <a class="view-all all-product"
					href="<%=request.getContextPath()%>/Dessert/Search?">查看更多<span>
				</span>
				</a> --%>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
	<!---->
	 <div class="footer">
		<div class="footer-top">
			<div class="container">
				<div class="latter">
					<h6>NEWS-LATTER</h6>
					<div class="sub-left-right">
						<form>
							<input type="text" value="Enter email here"
								onfocus="this.value = '';"
								onblur="if (this.value == '') {this.value = 'Enter email here';}" />
							<input type="submit" value="SUBSCRIBE" />
						</form>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="latter-right">
					<p>FOLLOW US</p>
					<ul class="face-in-to">
						<li><a href="#"><span> </span></a></li>
						<li><a href="#"><span class="facebook-in"> </span></a></li>
						<div class="clearfix"></div>
					</ul>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="container">
				<div class="footer-bottom-cate">
					<h6>CATEGORIES</h6>
					<ul>
						<li><a href="#">Curabitur sapien</a></li>
						<li><a href="#">Dignissim purus</a></li>
						<li><a href="#">Tempus pretium</a></li>
						<li><a href="#">Dignissim neque</a></li>
						<li><a href="#">Ornared id aliquet</a></li>
						<li><a href="#">Ultrices id du</a></li>
						<li><a href="#">Commodo sit</a></li>
						<li><a href="#">Urna ac tortor sc</a></li>
						<li><a href="#">Ornared id aliquet</a></li>
						<li><a href="#">Urna ac tortor sc</a></li>
						<li><a href="#">Eget nisi laoreet</a></li>
						<li><a href="#">Faciisis ornare</a></li>
					</ul>
				</div>
				<div class="footer-bottom-cate bottom-grid-cat">
					<h6>FEATURE PROJECTS</h6>
					<ul>
						<li><a href="#">Curabitur sapien</a></li>
						<li><a href="#">Dignissim purus</a></li>
						<li><a href="#">Tempus pretium</a></li>
						<li><a href="#">Dignissim neque</a></li>
						<li><a href="#">Ornared id aliquet</a></li>
						<li><a href="#">Ultrices id du</a></li>
						<li><a href="#">Commodo sit</a></li>
					</ul>
				</div>
				<div class="footer-bottom-cate">
					<h6>TOP BRANDS</h6>
					<ul>
						<li><a href="#">Curabitur sapien</a></li>
						<li><a href="#">Dignissim purus</a></li>
						<li><a href="#">Tempus pretium</a></li>
						<li><a href="#">Dignissim neque</a></li>
						<li><a href="#">Ornared id aliquet</a></li>
						<li><a href="#">Ultrices id du</a></li>
						<li><a href="#">Commodo sit</a></li>
						<li><a href="#">Urna ac tortor sc</a></li>
						<li><a href="#">Ornared id aliquet</a></li>
						<li><a href="#">Urna ac tortor sc</a></li>
						<li><a href="#">Eget nisi laoreet</a></li>
						<li><a href="#">Faciisis ornare</a></li>
					</ul>
				</div>
				<div class="footer-bottom-cate cate-bottom">
					<h6>OUR ADDERSS</h6>
					<ul>
						<li>Aliquam metus dui.</li>
						<li>orci, ornareidquet</li>
						<li>ut,DUI.</li>
						<li>nisi, dignissim</li>
						<li>gravida at.</li>
						<li class="phone">PH : 6985792466</li>
						<li class="temp">
							<p class="footer-class">
								Copyright &copy; 2015.Company name All rights reserved.More
								Templates <a href="http://www.cssmoban.com/" target="_blank"
									title="模板之家">模板之家</a> - Collect from <a
									href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a>
							</p>
						</li>
					</ul>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div> 

</body>
</html>