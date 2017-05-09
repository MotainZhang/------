$(function() {
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	loadCart();
	if(!cartStr) {
		$(".empty_car").css({
			display: "block"
		});
	} else {
		var cartObj = convertCartStrToObj(cartStr);
		for(var id in cartObj) {
			//商品信息对象
			var good = cartObj[id];
			var str = '<ul class="car_list_td" style="background: rgb(255, 245, 242) none repeat scroll 0% 0%;">' +
				'<li class="car_li01">' +
				'<div class="check checkedwrap on_check">' +
				'</div>' +
				'</li>' +
				'<li class="car_li02"><img src=' + id + '></li>' +
				'<li class="car_li03" style="margin-left:20px;">' + good.name + '</li>' +
				'<li class="car_li04">' + good.price + '</li>' +
				'<li class="car_li05">' +
				'<div class="num">' +
				'<a class="btn_qty" id="jian" style="text-align: center; line-height: 33px;">-</a>' +
				'<font id="itemqty1" class="goods_qty" style="text-align: center;line-height: 33px;">' + good.num + '</font>' +
				'<a class="btn_qty" id="jia" style="text-align: center;line-height: 33px;">+</a>' +
				'</div>' +
				'</li>' +
				'<li class="car_li06" style="text-align:center;">' + good.num * good.price + '</li>' +
				'<li class="car_li07">' +
				'<a class="car_del" href="javascript:;">删除</a>' +
				'<a class="car_move" href="javascript:;">移到收藏</a>' +
				'</li>' +
				'</ul>'
			//将上面的结构添加到brand_goods中去
			$(str).appendTo(".brand_goods");
		}
	}
	//删除商品
	$(".car_del").click(function() {
		var id = $(this).parents(".car_li07").siblings(".car_li02").children("img").attr("src");
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
		$(this).parents(".car_list_td").hide();
		location.reload();
	})
	//加按钮
	$(".car_li05 .num #jia").click(function() {
		var id = $(this).parents(".car_li05").siblings(".car_li02").children("img").attr("src");
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		//商品信息对象;
		cartObj[id].num += 1;
		//将页面上显示的数量加1
		$(this).siblings("font").html("" + cartObj[id].num);
		//更新页面上的小计
		$(this).parent().siblings('.car_li06').html(cartObj[id].num * cartObj[id].price + "");
		//将信息放回cookie
		$.cookie('cart', convertObjToCartStr(cartObj), {
			expires: 7,
			path: "/"
		});
		sum();
		location.reload();
	})
	//计算总计函数判断是否为0
	function sum() {
		var item = $(".car_list_td");
		var sum = 0;
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		if(cartStr == "") {
			$(".price span").html("0");
			$(".car_list").hide();
		} else {
			for(var i = 0; i < item.length; i++) {
				$(".car_list").show();
				sum += parseInt(item.eq(i).find(".car_li06").html());
			}
			$(".price span").html(sum);
		}

	}
	sum();
	//减按钮
	$(".car_li05 .num #jian").click(function() {
		var id = $(this).parents(".car_li05").siblings(".car_li02").children("img").attr("src");
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		//商品信息对象;
		if(cartObj[id].num > 1) { //商品数量减少不能少于1
			cartObj[id].num -= 1;
			//将页面上显示的数量减1
			$(this).siblings("font").html("" + cartObj[id].num);
			//更新页面上的小计
			$(this).parent().siblings('.car_li06').html(cartObj[id].num * cartObj[id].price + "");
			//将信息放回cookie
			$.cookie('cart', convertObjToCartStr(cartObj), {
				expires: 7,
				path: "/"
			});
		}
		sum();
		location.reload();
	})
	//多选框按钮事件
	var length = $(".car_list_td").length;
	$(".jiesuan ul li font").html(length);
	$(".jiesuan ul li div.check").click(function() {
		if($(this).hasClass("on_check")) {
			$(this).removeClass("on_check");
			$(".car_li01 div.check").removeClass("on_check");
			$(".jiesuan ul li font").html(0);
			$(".price span").html(0);
		} else {
			$(this).addClass("on_check");
			$(".car_li01 div.check").addClass("on_check");
			$(".jiesuan ul li font").html(length);
			sum();
		}
	})
	$(".car_list_th .car_li01 div.check").click(function() {
		if($(this).hasClass("on_check")) {
			$(this).removeClass("on_check");
			$(".jiesuan ul li div.check").removeClass("on_check");
			$(".car_li01 div.check").removeClass("on_check");
			$(".jiesuan ul li font").html(0);
			$(".price span").html(0);
		} else {
			$(this).addClass("on_check");
			$(".jiesuan ul li div.check").addClass("on_check");
			$(".car_li01 div.check").addClass("on_check");
			$(".jiesuan ul li font").html(length);
			sum();
		}
	})
	$(".car_list_td .car_li01 div.check").click(function() {
		if($(this).hasClass("on_check")) {
			$(this).removeClass("on_check");
			if(length == 1) {
				$(".car_li01 div.check").removeClass("on_check");
				$(".jiesuan ul li div.check").removeClass("on_check");
				$(".car_list_th .car_li01 div.check").removeClass("on_check");
				$(".jiesuan ul li font").html(0);
				$(".price span").html(0);
			} else {
				$(this).removeClass("on_check");
				$(".jiesuan ul li div.check").removeClass("on_check");
				$(".car_list_th .car_li01 div.check").removeClass("on_check");
				length -= 1;
				var this_sum = $(this).parents(".car_li01").siblings(".car_li06").html();
				var shi_num = parseFloat($(".price span").html()) - this_sum;
				$(".price span").html(shi_num);
				$(".jiesuan ul li font").html(length);
			}
		} else {
			if(length == $(".car_list_td").length) {
				$(this).addClass("on_check");
				$(".jiesuan ul li div.check").addClass("on_check");
				$(".car_list_th .car_li01 div.check").addClass("on_check");
				$(".jiesuan ul li font").html(length);
				sum();
			} else {
				$(this).addClass("on_check");
				length += 1;
				var this_sum = parseFloat($(this).parents(".car_li01").siblings(".car_li06").html());
				var shi_num = parseFloat($(".price span").html()) + this_sum;
				$(".price span").html(shi_num);
				$(".jiesuan ul li font").html(length);
			}

		}
	})
	//删除选中商品事件
	$(".del_check_goods").click(function() {
		var carList = $(".car_list_td");
		var check = $(".car_list_td .car_li01 div.check");
		for(var i = 0; i < carList.length; i++) {
			if(check.eq(i).hasClass("on_check")) {
				var id = carList.eq(i).parents(".car_li07").siblings(".car_li02").children("img").attr("src");
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
				check.eq(i).parents(".car_list_td").hide();
				$(".jiesuan ul li font").html(0);
				$(".price span").html(0);
//				location.reload();
			}else if(carList.length == 0){
				$(".jiesuan ul li font").html(0);
				$(".price span").html(0);
				$(".car_list_th").hide();
				$(".empty_car").show();
			}
		}
	})

	$.getJSON("json/list.json", function(a) {
		var name = a.list.sp_name;
		var pic = a.list.sp_img;
		var price = a.list.sp_price;
		var img2 = a.list.sp_img1;
		$.each(name, function(e) {
			$("<li><a href='detail.html' ><img class='' src='" + pic[e] + "'></a><div class='world_s_title'><a href='detail.html' >" + name[e] + "</a></div><span>" + price[e] + "</span></li>").appendTo($("#item1 ul"))
		});
		$.each(img2, function(e) {
			$("<li><a href='detail.html' ><img class='' src='" + img2[e] + "'></a><div class='world_s_title'><a href='detail.html' >" + name[e] + "</a></div><span>" + price[e] + "</span></li>").appendTo($("#item2 ul"))
		});
		$("#cart_prev").click(function() {
			if($("#item1").hasClass("active left")) {
				$("#item2").addClass("active left").show();
				$("#item1").removeClass("active left").hide();
			} else {
				$("#item1").addClass("active left").show();
				$("#item2").removeClass("active left").hide();
			}
		})
		$("#cart_next").click(function() {
			if($("#item1").hasClass("active left")) {
				$("#item2").addClass("active left").show();
				$("#item1").removeClass("active left").hide();
			} else {
				$("#item1").addClass("active left").show();
				$("#item2").removeClass("active left").hide();
			}
		})
	})
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