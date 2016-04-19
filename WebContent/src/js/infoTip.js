/**
 * 直接开通>>使用的tip (新样式)
 * @authors 罗建
 * @date    2014-07-01 17:40:12
 * @version yjt201407b v1.0.0
 */
;(function($, _undefined) {
	var error = "<div class=\"info-tips info-tips-error\">" +
				"	<div class=\"direction\">◆ <em> ◆ </em> </div> " +
				"	<div class=\"tips-content tips-content-fixed\">  " +
				"		<s class=\"tips-icon\"></s> <span class=\"tips-cnt\">error</span> " +
				"	</div> " +
				"</div>";

	var info =  "<div class=\"info-tips\">" +
				"	<div class=\"direction\">◆ <em> ◆ </em> </div> " +
				"	<div class=\"tips-content tips-content-fixed\">  " +
				"		<s class=\"tips-icon\"></s> <span class=\"tips-cnt\">info</span> " +
				"	</div> " +
				"</div>";

	var right = "<div class=\"right-icon\"></div>";
	var msgType = {
		"error": error,
		"info": info,
		"right": right
	};

	$.fn.showTip = function(target, msg, type) {
		var $tip = $(target);
		if (!(type in msgType)) {
			type = "right";
		}
		$tip.empty().append(msgType[type]).removeClass('none');
		if (msg) {
			$tip.find('div.tips-content span').html(msg);
		}
		return this;
	};
})(jQuery);