<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" import="entity.*" import="vo.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Product</title>
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
						<li><a href="#">24x7 服务支持<span class="live"> </span></a></li>
					</ul>
					<ul class="support">
						<li class="van"><a href="#"><label> </label></a></li>
						<li><a href="#">已全面覆盖全国各大中小城市 <span class="live"></span></a></li>
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
						<a href="<%=request.getContextPath()%>/Dessert/"><img
							src="<%=request.getContextPath()%>/images/logo.png" alt=" " /></a>
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
	<!-- start content -->
	<div class="container">
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
				<a href="<%=request.getContextPath()%>/Dessert/Single2"><img
					class="img-responsive chain"
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

		<div class="women-product">
			<div class=" w_content">
				<div class="women">
					<a href="#"><h4>
							Enthecwear - <span>4449 itemms</span>
						</h4></a>
					<ul class="w_nav">
						<li>Sort :</li>
						<li><a class="active" href="#">popular</a></li> |
						<li><a href="#">new </a></li> |
						<li><a href="#">discount</a></li> |
						<li><a href="#">price: Low High </a></li>
						<div class="clearfix"></div>
					</ul>
					<div class="clearfix"></div>
				</div>
			</div>
			<!-- grids_of_4 -->
			<%-- <c:out value="${page }"></c:out> --%>
			 <c:forEach items="${page.getList() }" var="pages">
				<div class="grid-product">
					<div class="  product-grid" style="margin-right: 8px;">
						<div class="content_box">
							<a
								href="<%=request.getContextPath()%>/Dessert/Single?id=${pages.getId()}">
								<div class="left-grid-view grid-view-left">
									<img
										src="<%=request.getContextPath()%>/pic/${pages.getPic()}"
										class="img-responsive watch-right" alt="" />
									<!-- <div class="mask">
									<div class="info">Quick View</div>
								</div> -->
							</a>
						</div>
						<h4>
							<a
								href="<%=request.getContextPath()%>/Dessert/Single?id=${pages.getId()}">
								${pages.getName() }</a>
						</h4>
						<p>${pages.getDetails() }</p>
						￥${pages.getPrice() }
					</div>
				</div>
			</c:forEach> 
			
			

		</div>


		<div class="clearfix"></div>
	</div>
<!-- 分页开始 -->
			 <table id="page-table" cellspacing="0">
				<tr>
					<td width="80%">&nbsp;</td>
					<td align="center" nowrap="true">
					
					<a href="<%=request.getContextPath()%>/Dessert/Search?keyword=${param.keyword}&pageNo=${page.pageNo-1 }&type=${param.type }">上一页</a>
					
					<a href="<%=request.getContextPath()%>/Dessert/Search?keyword=${param.keyword}&pageNo=${page.pageNo+1 }&type=${param.type }">下一页</a>
					
					</td>
					
				</tr>
			</table> 

			<!-- 分页结束 -->
	<div class="clearfix"></div>

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
	 <script>
        //分页
        $(function() {
 
            $('.setPageDiv').change(function() {
 
                getMsg(parseInt($(this).val()))
            })
 
            console.log("${searchList }");
            function getMsg(num) {
                $.ajax({
                    url: '${searchList }',
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        //1.计算分页数量
                        var showNum = num;
                        var dataL = data.list.length;
                        var pageNum = Math.ceil(dataL / showNum);
                        $('.Pagination').pagination(pageNum, {
                            num_edge_entries: 1, //边缘页数
                            num_display_entries: 4, //主体页数
                            items_per_page: 1, //每页显示1项
                            prev_text: "上一页",
                            next_text: "下一页",
                            callback: function(index) {
                                //console.log(index);
                                var html = '<ul>'
 
                                console.log(showNum * index + '~' + parseInt(showNum * index) + parseInt(showNum))
                                for(var i = showNum * index; i < showNum * index + showNum; i++) {
                                    //console.log(i)
                                    if(i < dataL) {
 
                                        var img = data.list[i].img;
                                        var manager = data.list[i].manager; //交易类型
                                        html += "<div class='row'>";
                                        html += "<div class='col-md-1   col-xs-1'>"
                                        html += "<img src='" + img + "'/   class='img-responsive'>"
                                        html += "</div>"
                                        html += "<div class='col-md-3   col-xs-3'>"
                                        html += "<p>" + manager + "</p>"
                                        html += "</div></div>";
 
                                    }
                                }
                                html += '</ul>';
                                $('.list').html(html)
                            }
                        })
 
                    }
                })
            }
            getMsg(6)
 
        })
    </script>

</body>
</html>