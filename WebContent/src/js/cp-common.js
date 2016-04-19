/**
 *
 * 左提示框tip,Enter键事件绑定搜索按钮
 * @authors 罗建
 * @date    2014-04-17 20:57:40
 * @version v1.1.2
 * @modify 罗建2014-07-02 17:25:40
 * 修改记录：
 * <pre>
 * 1、方法中添加了return this; 将jQuery对象给返回出来,为了支持jQuery链式写法。
 * </pre>
 */
;
(function($, _undefined) {
	$.fn.extend({
		// 左tip
		lTip: function(delay) {

			var $tag = $(this);
			var timeout;
			delay = delay ? delay : 200;

			$tag.off('mouseenter.lTip').on("mouseenter.lTip", function() {
				clearTimeout(timeout);
				var $that = $(this);
				var $tip = $($that.attr('tips'));

				if (!$tip.length) {
					return;
				}

				timeout = setTimeout(function() {
					if (!$tip.data('lTipInit')) {
						var cOffset = $that.position();
						$tip.css({
							'left': cOffset.left + 20,
							'top': cOffset.top - 8
						}).data('lTipInit', true);
					}
					$tip.removeClass('none');
				}, delay);
			}).off('mouseleave.lTip').on("mouseleave.lTip", function() {
				var $that = $(this);
				var $tip = $($that.attr('tips'));
				if (!$tip.length) {
					return;
				}
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					$tip.addClass('none');
				}, delay / 10);
			});
			return this;
		},

		// Enter键事件绑定搜索按钮
		enterKeydown: function(target) {
			var $source = $(this);
			$source.off("keydown.Enter").on("keydown.Enter", function(event) {
				var key;
				if (document.all) {
					key = event.keyCode;
				} else {
					key = event.which;
				}

				// 实现回键跳转
				if (key == 13 || key == 9) {
					$(target).click();
					return false;
				}
			});
			return this;
		}
	});
})(jQuery);