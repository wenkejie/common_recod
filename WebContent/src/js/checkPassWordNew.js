
//注意 该js验证密码强弱的规则发生改变时，侯飞波
//com.olymtech.cp.membership.util.CheckPassword该类验证密码强弱的方法也需改变，
//其中除去以上字符为错误 如：空格 验证不一致 是为了兼容老会员中的密码
(function(){
	var REG_PWD = {
			DIGITAL : 	/[0-9]/,//判断是否含有小写字符
			LOWERCASE_LETTERS : /[a-z]/,  //判断是否含有大写字符
			UPPERCASE_LETTERS : /[A-Z]/, //判断是否含有大写字符
			CHARACTER : /[,。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';=\"]/,//判断是否含有特殊字符*/
			OTHER_REEOR : /[^0-9a-zA-Z,。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';=\"]/  //除去以上字符为错误
	};
	function checkRegex(password,regex){
		if (password.match(regex)){
			 return true;
		}else{
			 return false;
		}
	}
	// checkStrong函数
	// 返回密码的强度级别
	function checkStrong(sPW,minLen) {
		if (sPW.length < minLen){
			return 0; // 密码太短
		}
		if(checkRegex(sPW,REG_PWD.OTHER_REEOR)){
			return 0; // 密码除数字字母特殊字符外符号
		}
		Modes = 0;
		if(checkRegex(sPW,REG_PWD.DIGITAL)){
			Modes++; // 密码有数字
		}
		if(checkRegex(sPW,REG_PWD.LOWERCASE_LETTERS)){
			Modes++; // 密码有小写字母
		}
		if(checkRegex(sPW,REG_PWD.UPPERCASE_LETTERS)){
			Modes++; // 密码有大写字母
		}
		if(checkRegex(sPW,REG_PWD.CHARACTER)){
			Modes++; // 密码有特殊字符
		}
		return Modes;
	}
	$.fn.checkPwd = function(){
		var $that = $(this);
		$that.off('keyup.pwd blur.pwd').on('keyup.pwd blur.pwd',function(){
			var v = $.trim($that.val());
			$that.val(v);//去掉前后空格
			var len = v.length;
			var strong = checkStrong(v,6);
			switch (strong) {
			case 1:
				$('#j-power-l,#j-power-m,#j-power-h').removeClass("green");
				$('#j-power-l,#j-power-m').removeClass("yellow");
				$('#j-power-l').addClass("red");
				break;
			case 2:
				$('#j-power-l,#j-power-m,#j-power-h').removeClass("green");
				$('#j-power-l,#j-power-m').addClass("yellow");
				break;
			case 3:
				$('#j-power-l,#j-power-m,#j-power-h').addClass("green");
				break;
			case 4:
				$('#j-power-l,#j-power-m,#j-power-h').addClass("green");
				break;
			default:
				$('#j-power-l,#j-power-m,#j-power-h').removeClass("green");
				$('#j-power-l,#j-power-m').removeClass("yellow");
				$('#j-password-power #j-power-l').addClass("red");
				break;
			
			}
			return this;
		});
	}
})(jQuery)
