$(function() {
	var arr = [];
	$("#mm").focus(function() {
		$("#secure1").css("border", "1px solid #f60");
		$("#mm_icon").css("display", "block");
		$("#mm_icon .tips_icon").css("background-position", "-35px -57px");
		$("#mm_icon span").css({ "color": "#ccc", "font-size": "12px" });
		$("#mm_icon span").html("请输入6到16位密码包含字母数字下划线");
	})
	$("#mm").blur(function() {
		var re = /^[a-zA-Z]\w{5,17}$/;
		if(re.test($("#mm").val()) == false || 　$("#mm").val()　 == "") {
			$("#mm_icon .tips_icon").css("background-position", "-35px -32px");
			$("#mm_icon span").css({ "color": "#e4393c", "font-size": "12px" });
			$("#mm_icon span").html("密码错误或密码不能为空");
		} else {
			$("#mm_icon").css("display", "none");
			arr[0] = 1;
		}

	})
	$("#mm1").focus(function() {
		$("#secure2").css("border", "1px solid #f60");
		$("#mm1_icon").css("display", "block");
		$("#mm1_icon .tips_icon").css("background-position", "-35px -57px");
		$("#mm1_icon span").css({ "color": "#ccc", "font-size": "12px" });
		$("#mm1_icon span").html("请再次输入密码");
	})
	$("#mm1").blur(function() {
		if($("#mm1").val() != $("#mm").val() || 　$("#mm").val()　 == "") {
			$("#mm1_icon .tips_icon").css("background-position", "-35px -32px");
			$("#mm1_icon span").css({ "color": "#e4393c", "font-size": "12px" });
			$("#mm_icon span").html("两次输入密码不一致");
		} else {
			$("#mm1_icon").css("display", "none");
			arr[1] = 1;
		}

	})
	$("#regist1").click(function() {
			var n = 0;
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == 1) {
					n++;
				}
			}
			if(n == 2) {
				var pwd = $("#mm").val();
				var userStr = $.cookie("register");
				var users = userStr.split(",");
				var user = users[1];
				$.cookie("register1",user + "," +　pwd + ":" +{expires : 7,path:"/"});
				window.location.href = "login.html";
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

