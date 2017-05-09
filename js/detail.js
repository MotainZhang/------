$(function() {
	var imgsrc = $.cookie("img-index") ? $.cookie("img-index") : "";
	var name = $.cookie("name") ? $.cookie("name") : "";
	var price = $.cookie("price") ? $.cookie("price") : "";
	$(".main-nav li.all-cate").hover(
		function() {
			$(this).children(".two-nav").show();
		},
		function() {
			$(this).children(".two-nav").hide();
		}
	)
	$.getJSON("json/detail.json", function(a) {
		var diqu = a.detail.diqu;
		var hd = a.detail.hd;
		var hb = a.detail.hb;
		var hn = a.detail.hn;
		var db = a.detail.db;
		var xn = a.detail.xn;
		var xb = a.detail.xb;
		var hz = a.detail.hz;
		var jqimg = a.detail.scale;
		var goodspic = a.detail.goods_pic;
		//收货地址地区选择
		$.each(diqu, function(b) {
			$("<li class='arealist'><div class='dt'>" + diqu[b] + "</div><div class='dd' id='area" + b + "'></div></li>").appendTo($(".province_list"));
		});
		$.each(hd, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + hd[b] + "</a>").appendTo($("#area0"));
		});
		$.each(db, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + db[b] + "</a>").appendTo($("#area1"));
		});
		$.each(hb, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + hb[b] + "</a>").appendTo($("#area2"));
		});
		$.each(hz, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + hz[b] + "</a>").appendTo($("#area3"));
		});
		$.each(xn, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + xn[b] + "</a>").appendTo($("#area4"));
		});
		$.each(hd, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + hd[b] + "</a>").appendTo($("#area5"));
		});
		$.each(hn, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + hn[b] + "</a>").appendTo($("#area6"));
		});
		$.each(xb, function(b) {
			$("<a class='sec_item' href='javascript:;'>" + xb[b] + "</a>").appendTo($("#area7"));
		});
		//放大镜图片		
		$.each(jqimg, function(b) {
			$("<img class='jqimg' src='" + jqimg[b] + "' />").appendTo($(".jqzoom"));
		});
		$.each(jqimg, function(b) {
			$("<li><img class='jqimg' src='" + jqimg[b] + "' /></li>").appendTo($(".items ul"));
		});
		$.each(jqimg, function(b) {
			$("<img src='" + jqimg[b] + "' /></li>").appendTo($(".bigpic"));
		});
		//判断是否为空空给指定名字
		if(name == ""){
			$(".detail_info_tit h1 b").html("美国GNC健安喜玛卡胶囊 50粒*2瓶");
		}else{
			$(".detail_info_tit h1 b").html(name);
		}
		if(price == ""){
			$(".sales_price b").html(370);
		}else{
			$(".sales_price b").html(price);
		}
		$("<img class='jqimg' src='" + imgsrc + "' />").appendTo($(".jqzoom"));
		$("<li><img class='jqimg' src='" + imgsrc + "' /></li>").appendTo($(".items ul"));
		$("<img src='" + imgsrc + "' />").appendTo($(".bigpic"));
		$(".items ul li").mouseover(function() {
			var index = $(this).index();
			$(".jqzoom img.jqimg").hide();
			$(".jqzoom img.jqimg").eq(index).show();
			$(".bigpic img").hide();
			$(".bigpic img").eq(index).show();
			$(".items ul li").removeClass("hover");
			$(this).addClass("hover");
		})
		//放大镜效果
		var $smallImg = $(".jqzoom"); //小图
		var $bigImg = $(".bigpic img") //大图
		var $smallCursor = $(".jqzoom"); //小可视区域
		var $bigCursor = $(".bigpic"); //大可视区域
		var oFloat = $(".float");
		$smallImg.mouseover(function() {
			$bigCursor.css("display", "block");
			oFloat.css("display", "block")
		})
		$smallImg.mouseout(function() {
			$bigCursor.css("display", "none");
			oFloat.css("display", "none")
		})
		$smallCursor.mousemove(function(evt) {
			var e = evt || window.event;
			var l = e.pageX - $(this).offset().left - oFloat.width() / 2;
			var t = e.pageY - $(this).offset().top - oFloat.height() / 2;
			if(l < 0) {
				l = 0;
			} else if(l > $(this).outerWidth() - oFloat.outerWidth()) {
				l = $(this).outerWidth() - oFloat.outerWidth();
			}
			if(t < 0) {;
				t = 0;
			} else if(t > $(this).outerHeight() - oFloat.outerHeight()) {
				t = $(this).outerHeight() - oFloat.outerHeight();
			}
			oFloat.css({ "left": l, "top": t });
			var biX = l / ($(this).outerWidth() - oFloat.outerWidth());
			var biY = t / ($(this).outerHeight() - oFloat.outerHeight());
			var disX = -biX * ($bigImg.outerWidth() - $bigCursor.outerWidth());
			var disY = -biY * ($bigImg.outerHeight() - $bigCursor.outerHeight());
			$bigImg.css({ "left": disX, "top": disY });
		})
		//商品介绍
		$.each(goodspic, function(c) {
			$("<img src='" + goodspic[c] + "' />").appendTo($(".goods_pic"));
		});
		//购物车
		loadCart();
		$("#buy").click(function() {
			location.href = "cart.html";
		})
		$("#cart").click(function() {
			var goodName = $(this).parents(".detail_info").children(".detail_info_tit").children("h1").children("b").html();
			var goodPrice = $(this).parents(".detail_info").children(".sales_info").children(".sales_price").children("b").html();
			//获取商品的图片src
			var goodSrc = imgsrc;
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			var value = parseInt($("#itemqty1").text());
			if(goodSrc in cartObj) {
				cartObj[goodSrc].num += 1;
			} else {
				cartObj[goodSrc] = {
					name: goodName,
					price: goodPrice,
					num: value
				};
			}

			cartStr = convertObjToCartStr(cartObj);
			$.cookie("cart", cartStr, { expires: 7, path: "/" });
			console.log(decodeURIComponent(document.cookie))
			location.href = "cart.html";
		})

	})
	//收货地址
	$(".add_1").hover(function() {
		$(".add_detail_main").css("display", "none");
		$(this).siblings(".add_detail_main").css("display", "block");
	}, function() {
		$(this).siblings(".add_detail_main").css("display", "none");
	})
	$("#hide").hover(function() {
		$(".adds_area").addClass(".det_hover");
		$(".hide_adds").addClass(".block").css("display", "block");
	}, function() {
		$(".adds_area").removeClass(".det_hover");
		$(".hide_adds").removeClass(".block").css("display", "none");
	})
	$(".detail_close").click(function() {
		$(".hide_adds").css("display", "none");
	})
	//加减按钮
	$("#jia").click(function() {
		var value = parseInt($("#itemqty1").text());
		value += 1;
		if(value >= 11) {
			alert("商品订购数量不可超过10件！");
			value = 10;
		}
		$("#itemqty1").text(value);
	})
	$("#jian").click(function() {
		var value = parseInt($("#itemqty1").text());
		value -= 1;
		if(value < 1) {
			alert("受不了了，宝贝不能再减少了！");
			value = 1;
		}
		$("#itemqty1").text(value);
	})
	$(".goods_tit li").click(function() {
		$(".goods_tit li").removeClass("on");
		$(this).addClass("on");
	})
	$(".detail_all_tabs li").click(function() {
		$(".detail_all_tabs li").removeClass("on");
		$(this).addClass("on");
	})

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

	//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
	function loadCart() {
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		//获取到购物车中所有商品的数量
		var total = 0;
		for(var id in cartObj) {
			total += cartObj[id].num;
		}
		$("#buy").val("购物车(" + total + ")");
	}

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
})