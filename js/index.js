$(function() {
	var hideNav = $("#hide_nav");
	var jszb = $("#jszb");
	var qgzb = $("#qgzb");
	$.getJSON("json/index.json", function(a) {
		var list = a.list;
		var title = list.title;
		var icon = list.icon;
		var twotitle = list.twotitle;
		var twocont = list.twocont;
		var banner = a.banner;
		var bgcolor = a.bgcolor;
		var twotitle1 = list.twotitle1.one;
		var twotitle2 = list.twotitle1.one_1;
		var twotitle3 = list.twotitle1.two_1;
		var twotitle4 = list.twotitle1.three_1;
		var twotitle5 = list.twotitle1.four_1;
		//动态创建菜单栏
		//		<a href='javascript:;'><span>|</span></a>
		$.each(title, function(i) {
			$("<li class='tab" + i + " t1'><i><img src='" + icon[i] + "'/></i><a href='list.html'>" + title[i] + "</a><b></b><ul id='hide'></ul></li>").appendTo($(".two-nav"));
		});
		$.each(twotitle, function(l) {
			$("<li><h2><a href='list.html'>" + twotitle[l] + "</a></h2><div class='two-tab'><a href='list.html'><span></span>" + twocont[l] + "</a></div></li>").appendTo($(".two-nav li.tab0 ul"));
		});
		$.each(twotitle1, function(l) {
			$("<li><h2><a href='list.html'>" + twotitle1[l] + "</a></h2><div class='two-tab'><a href='list.html'><span></span>" + twotitle1[l] + "</a></div></li>").appendTo($(".two-nav li.tab1 ul"));
		});
		$.each(twotitle2, function(l) {
			$("<li><h2><a href='list.html'>" + twotitle2[l] + "</a></h2><div class='two-tab'><a href='list.html'><span></span>" + twotitle2[l] + "</a></div></li>").appendTo($(".two-nav li.tab2 ul"));
		});
		$.each(twotitle3, function(l) {
			$("<li><h2><a href='list.html'>" + twotitle[3] + "</a></h2><div class='two-tab'><a href='list.html'><span></span>" + twocont[3] + "</a></div></li>").appendTo($(".two-nav li.tab3 ul"));
		});
		$.each(twotitle4, function(l) {
			$("<li><h2><a href='list.html'>" + twotitle4[l] + "</a></h2><div class='two-tab'><a href='list.html'><span></span>" + twotitle4[l] + "</a></div></li>").appendTo($(".two-nav li.tab4 ul"));
		});
		$.each(twotitle2, function(l) {
			$("<li><h2><a href='list.html'>" + twotitle2[l] + "</a></h2><div class='two-tab'><a href='list.html'><span></span>" + twotitle2[l] + "</a></div></li>").appendTo($(".two-nav li.tab5 ul"));
		});
		$.each(twotitle5, function(l) {
			$("<li><h2><a href='list.html'>" + twotitle5[l] + "</a></h2><div class='two-tab'><a href='list.html'><span></span>" + twotitle5[l] + "</a></div></li>").appendTo($(".two-nav li.tab6 ul"));
		});
		//		$.each(twocont, function(m) {
		//			$("<a href='javascript:;'><span>|</span>"+twocont[m]+"</a><b>"+m+"</b>").appendTo($(".two-tab"));
		//		});
		//二级菜单事件
		$.each($(".two-nav .t1"), function(n) {
			$(".two-nav li.tab" + n + "").mouseover(function() {
				$(".two-nav .t1 ul").css("display", "none");
				$(this).children("#hide").css("display", "block");
			})
		});
		$(".two-nav .t1").mouseout(function() {
			$(".two-nav .t1 ul").css("display", "none");
		})
		//动态创建banner图
		$.each(banner, function(j) {
			$("<li style='background:" + bgcolor[j] + "'><div class='m_width'><a href='javascript'><img src='" + banner[j] + "'/></a></div></li>").appendTo($("#pic"));
		});
		$.each(banner, function(k) {
			$("<li></li>").appendTo($("#smallpic"));
		});
		//banner图轮播
		var len = $("#pic li").size();
		var pic = $("#pic li");
		var smallpic = $("#smallpic li");
		var index = 0;
		var timer = null;
		$("#pic").mouseover(function() {
			$(".prev").css("display", "block");
			$(".last").css("display", "block");
		})
		$(".prev").mouseover(function() {
			$(this).css("display", "block");
			$(".last").css("display", "block");
			$(this).animate({
				opacity: 1
			}, 600);
		})
		$(".prev").mouseout(function() {
			$(this).animate({
				opacity: .3
			}, 600);
		})
		$(".last").mouseover(function() {
			$(this).animate({
				opacity: .3
			}, 600);
		})
		$(".last").mouseover(function() {
			$(this).css("display", "block");
			$(".prev").css("display", "block");
			$(this).animate({
				opacity: 1
			}, 600);
		})
		$("#pic").mouseout(function() {
			$(".prev").css("display", "none");
			$(".last").css("display", "none");
		})
		$(".prev").on("click", function() {
			clearInterval(timer);
			index--;
			change();

		})
		$(".last").on("click", function() {
			clearInterval(timer);
			index++;
			change();
		})
		myShow();

		function myShow() {
			clearInterval(timer);
			timer = setInterval(function() {
				index++;
				change();
			}, 3000)
		}
		myShow();

		function change() {
			smallpic.eq(index).addClass("on").siblings().removeClass("on");
			pic.eq(index).fadeIn();
			pic.eq(index).siblings().fadeOut();
			if(index == smallpic.length - 1) {
				index = 0;
				pic.eq(0).fadeIn();
				smallpic.eq(index).addClass("on").siblings().removeClass("on");
			} else if(index == 0) {
				index = smallpic.length - 1;
				pic.eq(smallpic.length - 1).fadeIn();
			}
			myShow();
		}

		//content内容区动态获取
		var content = a.content;
		var left = content.left;
		var cleft = content.c_left;
		var cmid = content.c_middle;
		var cright = content.c_right;
		var spName = content.sp_name;
		var spImg = content.sp_img;
		var spImg1 = content.sp_img1;
		var spImg2 = content.sp_img2;
		var spImg3 = content.sp_img3;
		var spPrice = content.sp_price;
		$.each(left, function(a) {
			$("<a href='detail.html'><img src='" + left + "'/></a>").appendTo($(".s_content  .tab_left"));
		});
		$.each(cleft, function(b) {
			$("<li class='sp for" + b + "'><a href='detail.html'><img src='" + cleft[b] + "'/></a></li>").appendTo($(".hot"));
		});
		$.each(cmid, function(c) {
			$("<a href='javascript:;'><img src='" + cmid + "'/></a>").appendTo($(".zhong"));
		});
		$.each(cright, function(d) {
			$("<li class='rpic" + d + "'><a href='detail.html'><img src='" + cright[d] + "'/></a></li>").appendTo($(".h_right"));
		});
		$.each(cleft, function(e) {
			$("<div id='f_" + (e + 1) + " 'class='sp_div'><ul class='sp_jf' id='s" + e + "'></ul></div>").appendTo($(".s_content"));
		});
		$.each(spName, function(f) {
			$("<li><div class='sp_img'><a href='detail.html'><img src='" + spImg[f] + "'/></a></div><div class='sp_name'><a href='detail.html'>" + spName[f] + "</a></div><div class='sp_price'>" + spPrice[f] + "</div></li>").appendTo($(".con #s0"));
			$("<li><div class='sp_img'><a href='detail.html'><img src='" + spImg1[f] + "'/></a></div><div class='sp_name'><a href='detail.html'>" + spName[f] + "</a></div><div class='sp_price'>" + spPrice[f] + "</div></li>").appendTo($(".con #s1"));
			$("<li><div class='sp_img'><a href='detail.html'><img src='" + spImg2[f] + "'/></a></div><div class='sp_name'><a href='detail.html'>" + spName[f] + "</a></div><div class='sp_price'>" + spPrice[f] + "</div></li>").appendTo($(".con #s2"));
			$("<li><div class='sp_img'><a href='detail.html'><img src='" + spImg3[f] + "'/></a></div><div class='sp_name'><a href='detail.html'>" + spName[f] + "</a></div><div class='sp_price'>" + spPrice[f] + "</div></li>").appendTo($(".con #s3"));
		});
		$("#c_nav li").mouseover(function() {
			var index = $(this).index();
			$(this).parents(".con").children(".s_content").children(".sp_div").hide();
			$(this).parents(".con").children(".s_content").children(".sp_div").eq(index).show();

		})
		//为你推荐栏
		for(var i = 0; i < 5; i++) {
			$.each(spName, function(g) {
				$("<li><a href='detail.html'><div class='p_img'><img src='" + spImg1[g] + "'/></div></a><p class='p_title'><a href='detail.html'>" + spName[g] + "</a></p><p class='p_p'><span class='p_s'>￥<b>" + spPrice[g] + "</b></span><a class='p_a' href=''></a></p></li>").appendTo($(".t_goods"));
			});
		}
		screen();
		//图片点击创建cookie存储信息
		$("body ul li img ").click(function() {
			var imgsrc = $(this).attr("src");
			var name = $(this).parents(".sp_img").siblings(".sp_name").children("a").html();
			var price = $(this).parents(".sp_img").siblings(".sp_price").html();
			$.cookie("img-index", imgsrc, { expires: 7, path: '/' });
			$.cookie("name", name, { expires: 7, path: '/' });
			$.cookie("price", price, { expires: 7, path: '/' });
		})
	})
	$("#jszb-tab").mouseover(function() {
		jszb.removeClass().show().addClass("active in");
		qgzb.removeClass().hide().addClass("tab-pane fade");
	})
	$("#qgzb-tab").mouseover(function() {
		qgzb.removeClass().show().addClass("active in");
		jszb.removeClass().hide().addClass("tab-pane fade");
	})
	$(".toolbar-tab i").hover(
		function() {
			$(".toolbar-tab").removeClass("tbar-tab-selected");
			$(this).parents(".toolbar-tab").addClass("tbar-tab-selected");
			$(this).siblings(".tab-text").addClass("tbar-tab-hover");
		},
		function() {
			$(this).parents(".toolbar-tab").removeClass("tbar-tab-selected");
			$(this).siblings(".tab-text").removeClass("tbar-tab-hover");
		}

	)
	$(".toolbar-footer .toolbar-tab i").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 600)

	})
	//屏幕分辨率兼容
	function screen() {
		if(window.screen.width < 1440) {
			$(".m_width").css("left", "225px");
			$(".last").css("margin-right", "-370px");
			$(".b-right").css("right", "37px");
		} else if(window.screen.width > 1440){
			$(".m_width").css("left", "500px");
			$(".last").css("margin-right", "-352px");
			$(".b-right").css("right", "380px");
		}else{
			$(".m_width").css("left", "414px");
			$(".last").css("margin-right", "-352px");
			$(".b-right").css("right", "116px");
		}
	}
	screen();
	//判断购物车
	function cart() {
		var shuliang = 0;
		var sum = 0;
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		for(var id in cartObj) {
			//商品信息对象
			var good = cartObj[id];
			var str = '<ul class="i_detail">' +
				'<li>' +
				'<div class="i_pic"><img src=' + id + ' /></div>' +
				'<div class="i_name">' + good.name + '</div>' +
				'<div class="i_price">' + good.price + '</div>' +
				'<div class="i_num">' +
				+good.num +
				'<span>删除</span>' +
				'</div>' +
				'</li>' +
				'</ul>'
			$(str).insertBefore(".sum");
		}
		for(var i = 0; i < $(".i_detail").length; i++) {
			shuliang += parseInt($(".i_detail").eq(i).find($(".i_num")).html());
			sum += parseFloat($(".i_detail").eq(i).find($(".i_price")).html())*parseInt($(".i_detail").eq(i).find($(".i_num")).html());
		}
		$(".total i").html(shuliang);
		$(".cart #sl").html(shuliang);
		$(".total strong").html("￥" + (sum));
	}
	cart();
	//购物车删除按钮
	$(".i_num span").click(function() {
		var id = $(this).parents(".i_num").siblings(".i_pic").children("img").attr("src");
		//从cookie中将该商品删除
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		//商品信息对象;
		delete cartObj[id];
		//将新商品信息放回cookie
		$.cookie('cart', convertObjToCartStr(cartObj), {
			expires: 7,
			path: "/"
		});
		$(this).parents(".i_detail").hide();
		location.reload();
	})
	//给购物车添加鼠标移入移出事件
	$(".cart").on("mouseover", function() {
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		if(cartStr == "") {
			$(".i_menu").hide();
			$(".goods").show();
			$(".i_count").hide();
		} else {
			$(".i_menu").show();
			$(".i_count").show();
			$(".goods").hide();
		}
	})
	$(".cart").mouseout(function() {
		$(".i_menu").hide();
		$(".goods").hide();
	})
	//判断用户登录状态
	status()

	function status() {
		var users = $.cookie("register") ? $.cookie("register") : "";
		users = convertStrToObj(users);
		for(var id in users) {
			var user1 = users[id];
			if(users == "") {
				$(".top ul li:lt(6)").show();
				$(".welcome1").hide();
			} else {
				$(".top ul li:lt(6)").hide();
				var str = '<li class="welcome1">' +
					'您好,' +
					'<a style="margin: 0px -10px;color: rgb(237, 65, 91);"> ' + user1 + ' </a> ' +
					'欢迎光临好享购物商城' +
					'<a href="javascript:;" id="top_exit">退出</a>'
				'</li>'
				$(str).insertBefore("#dingdan");
			}
		}

	}
	//退出按钮事件
	$("#top_exit").click(function() {
		location.href = "login.html";
//		$(".welcome1").hide();
//		$(".top ul li:lt(6)").show();
//		var users = $.cookie("register") ? $.cookie("register") : "";
//		users = convertStrToObj(users);
//		for(var id in users) {
//			delete users[id];
//		}
//		$.cookie('register', convertObjToStr(users), {
//			expires: 7,
//			path: "/"
//		});
//		console.log(users)
	})

	function convertCartStrToObj(cartStr) {
		//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
		//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
		if(!cartStr) {
			return {};
		}
		var goods = cartStr.split(":");
		var obj = {};
		for(var i = 0; i < goods.length; i++) {
			var data = goods[i].split(",");
			//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
			obj[data[0]] = {
				name: data[1],
				price: parseFloat(data[2]),
				num: parseInt(data[3]),
			}
		}
		return obj;
	}

	function convertObjToCartStr(obj) {
		/* {
		 * 	sp1 : {
		 * 		name : "香蕉",
		 * price : 30,
		 * num : 1,
		 * src : "img/1.jpg"
		 * },
		 * sp2 :{
		 * 	name :"苹果",
		 * price : 40,
		 * num:2,
		 * src : "img/2.jpg"
		 * },
		 * sp3{
		 * 	name : "梨"，
		 * price : 50,
		 * num : 3,
		 * src : "img/3.jpg"
		 * }
		 * }
		 */
		var cartStr = "";
		//遍历对象
		for(var id in obj) {
			if(cartStr) {
				cartStr += ":";
			}
			cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num;
		}
		return cartStr;
	}

	function convertStrToObj(str) {
		if(!str) {
			return {};
		}
		//假设不为空："test1,123:test2,abc:test3,888:李涛,123"
		var users = str.split(":"); //将字符串转为数组 ["test1,123","test2,abc","test3,888"]
		var obj = {};
		/*
		 * var obj = new Object();
		 * obj["name"] = "zhangsan";
		 * 
		 */
		//遍历数组
		for(var i = 0; i < users.length; i++) {
			//将字符串转为数组
			var userData = users[i].split(",");
			//["test1",123] ["test2","abc"] ["test3",888]
			obj[userData[0]] = userData[1];
			/*转为对象如下：
			 * obj = {
			 * 	test1 : 123,
			 *  test2 : abc,
			 *  test3 : 888
			 * }
			 */
		}
		return obj;
	}
	//将对象转为字符串
	function convertObjToStr(obj) {
		////假设不为空："test1,123:test2,abc:test3,888:李涛,123"
		var str = "";
		for(var usn in obj) {
			var pwd = obj[usn];
			if(str) {
				//看是否是第一组用户名和密码，如果不是，先在前面添加一个：
				str += ":";
			}
			str += usn + ',' + pwd;
		}
		return str;
	}

})
