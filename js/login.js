$(function() {
	var user = $("#user");
	var pwd = $("#pwd");
	var userRequired = $(".tips");
	var pwdRequired = $(".tips1");
	var btn = $(".btn-login");
	user.focus(function() {
		$(".user").find("b").removeClass().addClass("change");
	})
	pwd.focus(function() {
		$(".pwd").find("b").removeClass().addClass("change1");
	})
	user.keydown(function() {
		$(".user").find("em").css("display", "block");
	})
	pwd.keydown(function() {
		$(".pwd").find("em").css("display", "block");
	})
	$(".user").find("em").click(function() {
		user.val("");
		$(".user").find("em").css("display", "none");
	})
	$(".pwd").find("em").click(function() {
		pwd.val("");
		$(".pwd").find("em").css("display", "none");
	})
	user.blur(function() {
		var re = /^1[34578]\d{9}$/;
		if(re.test(user.val()) == false || user.val() == "") {
			userRequired.html("<span></span><i>请输入用户名或手机号</i>");
			userRequired.find("span").addClass("show");
		} else {
			$(".tips").html("");
		}
		$(".user").find("b").removeClass().addClass("user-icon");
	});
	pwd.blur(function() {
		var re = /^[a-zA-Z]\w{5,17}$/;
		if(re.test(pwd.val()) == false || pwd.val() == "") {
			pwdRequired.html("<span></span><i>请输入密码</i>");
			pwdRequired.find("span").addClass("show");
		} else {
			$(".tips1").html("");
		}
		$(".pwd").find("b").removeClass().addClass("pwd_icon");
	})
	btn.click(function() {
		var user1 = user.val();
		var pwd1 = pwd.val();
		var users = $.cookie("register1") ? $.cookie("register1") : "";
		users = convertStrToObj(users);
		if(users[user1] == pwd1) {
			$.cookie("loginster", user, 7, { path: "/" });
			location.href = "index.html";
		} else {
			alert("用户名密码不存在，请前往注册页面")
		}
	})
	$("#auto_login").click(function(){
		if($(this).hasClass("on_check")){
			$(this).removeClass("on_check");
		}else{
			$(this).addClass("on_check");
		}
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

});