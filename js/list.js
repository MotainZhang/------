$(function() {
	$(".main-nav li.all-cate").hover(
		function() {
			$(this).children(".two-nav").show();
		},
		function() {
			$(this).children(".two-nav").hide();
		}
	)
	$.getJSON("json/list.json", function(a) {
		var Img = a.list.img;
		var tit = a.list.one_1;
		var shangbiao = a.list.shangbiao;
		var name = a.list.sp_name;
		var pic = a.list.sp_img;
		var price = a.list.sp_price;
		var img2 = a.list.img2;
		var listimg = a.list.list_img;
		var listname = a.list.list_name;
		var listprice = a.list.list_price;
		var index = 0;
		$.each(Img, function(b) {
			$("<li><p class='news_pic'><a href='list.html'><img src='" + Img[b] + "'/></a></p></li>").appendTo($(".news_list ul"))
		});
		$.each(tit, function(c) {
			$("<li><a href='detail.html'>" + tit[c] + "</a></li>").appendTo($(".text_list ul"))
		});
		for(var i = 0; i < 4; i++) {
			$.each(shangbiao, function(d) {
				$("<li><a href='index.html'><img src='" + shangbiao[d] + "'/></a></li>").appendTo($(".pic_list ul"))
			});
		}
		$(".pin_more span.xia").click(function() {
			$(".pic_list").addClass("pic_list2");
			$(".pin_tit").addClass("bg_gray");
			$(".pin_list").addClass("pic_list_border");
			$(".xia").css("display", "none");
			$(".shang").css("display", "block");
		})
		$(".pin_more span.shang").click(function() {
			$(".pic_list").removeClass("pic_list2");
			$(".pin_tit").removeClass("bg_gray");
			$(".pin_list").removeClass("pic_list_border");
			$(".shang").css("display", "none");
			$(".xia").css("display", "block");
		})
		$.each(name, function(e) {
			$("<li><div class='world_s_pic'><a href='detail.html' ><img class='' src='" + pic[e] + "'></a></div><div class='world_s_price'><font>￥</font><span>" + price[e] + "</span></div><div class='world_s_title'><a href='detail.html' >" + name[e] + "</a></div></li>").appendTo($(".shop_new ul.shop_list_new"))
		});
		$.each(img2, function(f) {
			$("<li><div class='world_s_pic'><a href='detail.html' ><img class='' src='" + img2[f] + "'></a></div><div class='world_s_price'><font>￥</font><span>" + price[f] + "</span></div><div class='world_s_title'><a href='detail.html' >" + name[f] + "</a></div></li>").appendTo($(".hot_list"))
		});
		$.each(name, function(e) {
			$("<ul class='goods_list'></ul>").appendTo($(".status"));
		});
		for(var i = 0; i < 　5; i++) {
			$.each(listimg, function(g) {
				$("<li><div class='world_s_pic'><a href='detail.html' ><img class='' src='" + listimg[g] + "'></a></div><div class='world_s_price'><font>￥</font><span>" + listprice[g] + "</span></div><div class='world_s_title'><a href='detail.html' >" + listname[g] + "</a></div><i class='quanqiu'></i><i class='shop_tit'>海米派美国仓官方旗舰店</i></li>").appendTo($(".goods_list"))
			});
		}
		var smallpic = $(".right nav .num li");
		var pic = $(".status ul.goods_list");
		$(".right nav .num li").click(function() {
			var index = $(this).index();
			$(".right nav .num li").removeClass("hover");
			$(this).addClass("hover");
			$(".status ul.goods_list").hide();
			$(".status ul.goods_list").eq(index + 1).show();
		})
		$(".sure").click(function() {
			var num = parseInt($(".go").val());
			if(isNaN(num)) {
				alert("请输入有效数字");
			} else if(num < 1) {
				alert("已到达第一页了");
			} else if(num > smallpic.length - 2) {
				alert("已经是最后一页了")
			} else {
				$(".right nav .num li").removeClass("hover");
				$(".right nav .num li").eq(num).addClass("hover");
				$(".status ul.goods_list").eq(num).show();
			}
		})
		$("body ul li img").click(function() {
			var imgsrc = $(this).attr("src");
			var name = $(this).parents(".world_s_pic").siblings(".world_s_title").children("a").html();
			var price = $(this).parents(".world_s_pic").siblings(".world_s_price").children("span").html();
			$.cookie("name", name, { expires: 7, path: '/' });
			$.cookie("img-index", imgsrc, { expires: 7, path: '/' });
			$.cookie("price", price, { expires: 7, path: '/' });
		})
	})
})