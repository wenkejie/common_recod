/**
 * @version 1.0.0
 * @author 史磊 2013-05-22
 * @depends jquery-1.9.1.js
 * @description 帮助文档所需的js汇总
 */
;
(function($, _undefined) {

	/**
	 * @param this
	 *            绑定delegate的对象
	 * @param element
	 *            触发事件的元素
	 * @param load
	 *            点击菜单后加载内容的对象
	 * @param fun
	 *            回调函数
	 * 
	 */
	$.fn.extend( {
		menuFunBind : function(element, load, fun) {
			var wrap = $(this);
			wrap.delegate(element, "click", function() {
				wrap.find(element + ".active").removeClass("active");
				var self = $(this);
				self.addClass("active");
				load.load(self.attr("url") + "?_=" + new Date().getTime(), fun);
			});
		}
	});

	$(function() {
		/* 头菜单功能 */
		$("td.head-bar").menuFunBind("label", $("td.menu-bar"));
		/* 左侧菜单功能 */
		$("td.menu-bar").menuFunBind("li", $("td.content"));

		/* 默认选中第一个菜单 */
		$("td.head-bar").children(":first").click();
	});
})(jQuery);