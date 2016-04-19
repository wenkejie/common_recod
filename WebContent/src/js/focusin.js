/**
 * focusin.js 对输入框绑定点击的hover样式,兼容IE6,补丁yjt201407b
 *
 * @authors 罗建
 * @date    2014-07-09 17:21:19
 * @version v1.0.01
 */
$(function() {
	$('div.j-focusin').click(function() {
		$('div.j-focusin').removeClass('form-input-focusin');
		$(this).addClass('form-input-focusin');
		$(this).children('input.inputer').focus();
		$(this).children('textarea.textareaer').focus();
	})

	var isIe6 = document.all && /MSIE 6./i.test(navigator.userAgent);
	if (isIe6) {
		$('div.j-focusin').mouseenter(function() {
			$(this).addClass('form-input-hover');
		}).mouseleave(function() {
			$(this).removeClass('form-input-hover');
		});
	};
})