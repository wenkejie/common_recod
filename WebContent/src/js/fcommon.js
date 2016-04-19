/**
 * @version 1.0.0
 * @author 史磊 2013-06-29
 * @depends jquery-1.9.1.js
 * @description 共性函数
 */
;
var fcommon = fc = {};
(function($, _undefined) {
	$.extend(fc, {
		ie6 : false,
		ie7 : false,
		ie67 : false,/* ie6 或者 ie7 */
		ie8 : false
	});

	if (document.all) {/* ie */
		fc.ie6 = /MSIE 6./i.test(navigator.userAgent);
		fc.ie7 = /MSIE 7./i.test(navigator.userAgent);
		fc.ie8 = /MSIE 8./i.test(navigator.userAgent);

		fc.ie67 = fc.ie6 || fc.ie7;
	}
})(jQuery);