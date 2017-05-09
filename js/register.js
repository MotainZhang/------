$(function() {
	var oCav = $(".yanzhengma");
	var arr = [];
	$("#mb").focus(function() {
		$("#mobile").css("border", "1px solid #f60");
		$("#mobile_icon").css("display", "block");
		$("#mobile_icon .tips_icon").css("background-position", "-35px -57px");
		$("#mobile_icon span").css({ "color": "#ccc", "font-size": "12px" });
		$("#mobile_icon span").html("该手机号码可用于登录好享购物，以及找回密码");
	})
	$("#mb").blur(function() {
		$("#mobile").css("border", "1px solid #f60");
		var re = /^1[34578]\d{9}$/;
		if(re.test($("#mb").val()) == false || $("#mb") == "") {
			$("#mobile_icon span").html("手机号码不能为空或请输入正确的手机号码");
			$("#mobile_icon .tips_icon").css("background-position", "-35px -32px");
			$("#mobile_icon span").css({ "color": "#e4393c", "font-size": "12px" });
		} else {
			$("#mobile_icon").css("display", "none");
			arr[0] = 1;
		}
	})
	$("#pic").focus(function() {
		$("#yzm").css("border", "1px solid #f60");
		$("#yzm_tip").css("display", "block");
		$("#yzm_tip .tips_icon").css("background-position", "-35px -57px");
		$("#yzm_tip span").css({ "color": "#ccc", "font-size": "12px" });
		$("#yzm_tip span").html("看不清？点击图片换一张");
	})
	$("#pic").blur(function() {
		$("#yzm").css("border", "1px solid #f60");
		if($("#pic").val() != $(".yanzhengma").val().toLowerCase() || $("#pic").val() == "") {
			$("#yzm_tip .tips_icon").css("background-position", "-35px -32px");
			$("#yzm_tip span").css({ "color": "#e4393c", "font-size": "12px" });
			$("#yzm_tip span").html("图片验证码输入错误");
		} else {
			$("#yzm_tip").css("display", "none");
			arr[1] = 1;
		}
	})
	$(".yanzhengma").click(function() {
		codes();
	})

	function codes() {
		var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		var str = "";
		for(var i = 0; i < 5; i++) {
			str += arr[parseInt(Math.random() * arr.length)];
		}
		oCav.val(str);

	}
	codes();
	$(".btn-regist").click(function(e) {
		e.preventDefault();
		var n = 0;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == 1) {
				n++;
			}
		}
		if(n == 2) {
			var user = $("#mb").val();
			var users = $.cookie("register") ?　 $.cookie("register")　: "";
			var userobj = convertStrToObj(users);
			if(user in userobj){
				alert("用户名已存在,请重新输入");
			}else{
				userobj = {
					user :　user,
				}
			}
			userStr = convertObjToStr(userobj);
			$.cookie("register", userStr ,{expires : 7,path:"/"});
  		    window.location.href = "register2.html";
		} else {
			alert("请检查信息是否正确");
		}

	})
})
function convertStrToObj(str){
	if(!str){
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
	for(var i = 0; i < users.length; i ++){
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
function convertObjToStr(obj){
	////假设不为空："test1,123:test2,abc:test3,888:李涛,123"
	var str = "";
	for(var usn in obj){
		var pwd = obj[usn];
		if(str){
			//看是否是第一组用户名和密码，如果不是，先在前面添加一个：
			str += ":";
		}
		str += usn + ',' + pwd;
	}
	return str;
}
