<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" import="entity.*"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
	
	<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Single</title>
<link href="<%=request.getContextPath()%>/css/bootstrap.css" rel="stylesheet" type="text/css"
	media="all" />
<!--theme-style-->
<link href="<%=request.getContextPath()%>/css/style.css" rel="stylesheet" type="text/css" media="all" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/etalage.css" type="text/css"
	media="all" />
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
<script src="<%=request.getContextPath()%>/js/jquery.etalage.min.js"></script>
<script>
	jQuery(document)
			.ready(
					function($) {

						$('#etalage')
								.etalage(
										{
											thumb_image_width : 300,
											thumb_image_height : 400,
											source_image_width : 900,
											source_image_height : 1200,
											show_hint : true,
											click_callback : function(
													image_anchor, instance_id) {
												alert('Callback example:\nYou clicked on an image with the anchor: "'
														+ image_anchor
														+ '"\n(in Etalage instance: "'
														+ instance_id + '")');
											}
										});

					});
</script>
</head>
<body>
<%-- <%Dessert dessert=(Dessert)session.getAttribute("dessert");%> --%>
	<!--header-->
	<div class="header">
		<div class="top-header">
			<div class="container">
				<div class="top-header-left">
					<ul class="support">
						<li><a href="#"><label> </label></a></li>
						<li><a href="#">24x7 live<span class="live">
									support</span></a></li>
					</ul>
					<ul class="support">
						<li class="van"><a href="#"><label> </label></a></li>
						<li><a href="#">Free shipping <span class="live">on
									order over 500</span></a></li>
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
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="bottom-header">
			<div class="container">
				<div class="header-bottom-left">
					<div class="logo">
						<a href="index.html"><img src="<%=request.getContextPath()%>/images/logo.png" alt=" " /></a>
					</div>
					<div class="search">
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
					<%User user=(User)session.getAttribute("user");
					if(user!=null){
					%>
					<li><a href="login.html"><span> </span>${user.getUsername() }</a></li>
							<li class="login"><a href="<%=request.getContextPath()%>/Dessert/Index"><span> </span>注销</a></li>
							<li class="cart"><a href="#"><span> </span>购物车</a></li>
					<%
					}else{
					%>
					<li><a href="<%=request.getContextPath()%>/Account/Login"><span> </span>登录</a></li>
					<li class="login"><a href="<%=request.getContextPath()%>/Account/Register"><span> </span>注册</a></li>
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

	<div class="container">

		<div class=" single_top">
			<div class="single_grid">
				<div class="grid images_3_of_2">
					<ul id="etalage">
						<li><a href="optionallink.html"> <img
								class="etalage_thumb_image" src="<%=request.getContextPath()%>/pic/${dessert.getPic()}"
								class="img-responsive" /> <img class="etalage_source_image"
								src="<%=request.getContextPath()%>/pic/${dessert.getPic()}" class="img-responsive" title="" />
						</a></li>
						<li><img class="etalage_thumb_image" src="<%=request.getContextPath()%>/pic/${dessert.getPic()}"
							class="img-responsive" /> <img class="etalage_source_image"
							src="<%=request.getContextPath()%>/pic/${dessert.getPic()}" class="img-responsive" title="" /></li>
						<li><img class="etalage_thumb_image" src="<%=request.getContextPath()%>/pic/${dessert.getPic()}"
							class="img-responsive" /> <img class="etalage_source_image"
							src="<%=request.getContextPath()%>/pic/${dessert.getPic()}" class="img-responsive" /></li>
						<li><img class="etalage_thumb_image" src="<%=request.getContextPath()%>/pic/${dessert.getPic()}"
							class="img-responsive" /> <img class="etalage_source_image"
							src="<%=request.getContextPath()%>/pic/${dessert.getPic()}" class="img-responsive" /></li>
					</ul>
					<div class="clearfix"></div>
				</div>
				<div class="desc1 span_3_of_2">
					<ul class="back">
						<li><i class="back_arrow"> </i> <a href="<%=request.getContextPath()%>/Dessert/Index">
								回到首页</a></li>
					</ul>
					
					<h1>${dessert.getName()}</h1>
					<ul class="price_single">
						<li class="head"><h2>￥${dessert.getRebate()/100*dessert.getPrice()}</h2></li>
						<li class="head_desc sky-form"><span>库存：${dessert.getNum()}</span>
							</li>
						<div class="clearfix"></div>
					</ul>
					<p>${dessert.getDetails()}</p>
					<a href="<%=request.getContextPath()%>/Dessert/Cart?userId=${user.getId() }&dessertId=${dessert.getId()}&num=1" class="now-get">加入购物车</a>

				</div>
				<div class="clearfix"></div>
			</div>
			<ul id="flexiselDemo1">
				<li><img src="<%=request.getContextPath()%>/images/pi.jpg" />
				<div class="grid-flex">
						<a href="#">Bloch</a>
						<p>Rs 850</p>
					</div></li>
				<li><img src="<%=request.getContextPath()%>/images/pi1.jpg" />
				<div class="grid-flex">
						<a href="#">Capzio</a>
						<p>Rs 850</p>
					</div></li>
				<li><img src="<%=request.getContextPath()%>/images/pi2.jpg" />
				<div class="grid-flex">
						<a href="#">Zumba</a>
						<p>Rs 850</p>
					</div></li>
				<li><img src="<%=request.getContextPath()%>/images/pi3.jpg" />
				<div class="grid-flex">
						<a href="#">Bloch</a>
						<p>Rs 850</p>
					</div></li>
				<li><img src="<%=request.getContextPath()%>/images/pi4.jpg" />
				<div class="grid-flex">
						<a href="#">Capzio</a>
						<p>Rs 850</p>
					</div></li>
			</ul>
			<script type="text/javascript">
				$(window).load(function() {
					$("#flexiselDemo1").flexisel({
						visibleItems : 5,
						animationSpeed : 1000,
						autoPlay : true,
						autoPlaySpeed : 3000,
						pauseOnHover : true,
						enableResponsiveBreakpoints : true,
						responsiveBreakpoints : {
							portrait : {
								changePoint : 480,
								visibleItems : 1
							},
							landscape : {
								changePoint : 640,
								visibleItems : 2
							},
							tablet : {
								changePoint : 768,
								visibleItems : 3
							}
						}
					});

				});
			</script>
			<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.flexisel.js"></script>

			<div class="toogle">
				<h3 class="m_3">Product Details</h3>
				<p class="m_text">Lorem ipsum dolor sit amet, consectetuer
					adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
					dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
					quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
					aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
					hendrerit in vulputate velit esse molestie consequat, vel illum
					dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
					odio dignissim qui blandit praesent luptatum zzril delenit augue
					duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta
					nobis eleifend option congue nihil imperdiet doming id quod mazim
					placerat facer possim assum.</p>
			</div>
		</div>

		<!---->
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
		<!--initiate accordion-->
		<script type="text/javascript">
			$(function() {
				var menu_ul = $('.menu > li > ul'), menu_a = $('.menu > li > a');
				menu_ul.hide();
				menu_a.click(function(e) {
					e.preventDefault();
					if (!$(this).hasClass('active')) {
						menu_a.removeClass('active');
						menu_ul.filter(':visible').slideUp('normal');
						$(this).addClass('active').next().stop(true, true)
								.slideDown('normal');
					} else {
						$(this).removeClass('active');
						$(this).next().stop(true, true).slideUp('normal');
					}
				});

			});
		</script>
		<div class=" chain-grid menu-chain">
			<a href="<%=request.getContextPath()%>/Dessert/Single"><img class="img-responsive chain"
				src="<%=request.getContextPath()%>/images/wat.jpg" alt=" " /></a>
			<div class="grid-chain-bottom chain-watch">
				<span class="actual dolor-left-grid">300$</span> <span
					class="reducedfrom">500$</span>
				<h6>Lorem ipsum dolor</h6>
			</div>
		</div>
		<a class="view-all all-product" href="product.html">VIEW ALL
			PRODUCTS<span> </span>
		</a>
	</div>
		<div class="clearfix"></div>
	</div>
	<!---->
	<div class="footer">
		<div class="footer-top">
			<div class="container">
				<div class="latter">
					<h6>NEWS-LATTER</h6>
					<div class="sub-left-right">
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