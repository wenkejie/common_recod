//2014-5-24 史磊： 定时判断 filter中的dt   是否发生变化
//2014-06-30  陈楠： 增加停止功能
/*	
核心逻辑：
var sid = getCookie("_a");
checker = setInterval(function() {
	var csid = getCookie("_a");
	if (csid != sid) {
		clearInterval(checker);
		window.location.reload();
	}
}, 1000);

用法：
dtChecker.stop();
*/
//2014-5-24 end
(function() {
	var rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;

	function trim(text) {
		return (text || "").replace(rtrim, "");
	}

	function getCookie(name) {
		var cookieValue = null;
		if (typeof name != 'undefined' && name != null && name != "") {
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for ( var i = 0; i < cookies.length; i++) {
					var cookie = trim(cookies[i]);
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
		}
		return cookieValue;
	}
	
	var sid = getCookie("tgt");
	var checker;
	
	var dtChecker = window.dtChecker = {};
	
	/**
	 * 开始自动检测cookie中的dt变化，若dt发生变化则刷新页面
	 * 执行频率为每秒执行
	 */
	dtChecker.start = function(){
		checker = setInterval(function() {
			var csid = getCookie("tgt");
			//console.log("----------------------------"+csid);
			if (csid != sid) {
				clearInterval(checker);
				window.location.reload();
			}
		}, 1000);
	};
	
	/**
	 * 停止Dt变化的检测（执行登录时调用，为了防止登录过程中将页面刷掉，从而导致登陆成功后页面仍然在登录页面）
	 */
	dtChecker.stop = function(){
		clearInterval(checker);
	};
	
	dtChecker.start();
})();