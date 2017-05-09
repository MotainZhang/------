$(function() {
	$("#dx").focus(function() {
		$("#sjh").css("border", "1px solid #f60");
		$("#dx_icon").css("display", "block");
		$("#dx_icon .tips_icon").css("background-position", "-35px -57px");
		$("#dx_icon span").css({ "color": "#ccc", "font-size": "12px" });
		$("#dx_icon span").html("请输入你收到的短信验证码");
	})
	$("#dx").blur(function() {
		if($("#dx").val() == "") {
			$("#dx_icon .tips_icon").css("background-position", "-35px -32px");
			$("#dx_icon span").css({ "color": "#e4393c", "font-size": "12px" });
			$("#dx_icon span").html("短信验证码输入错误！请确认后重新输入，您也可以重新获取验证码！ ");
		}else{
			$("#dx_icon").css("display", "none");
		}

	})
	$("#dian").click(function(){
		var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		var str = "";
		for(var i = 0; i < 5; i++) {
			str += arr[parseInt(Math.random() * arr.length)];
		}
		$("#dx").val(str);	
	})
	$("#dian1").click(function(){
		if(!$("#dx").val()){
			alert("请输入正确的验证码")
		}else{
			location.href = "register3.html";
		}
	})
})