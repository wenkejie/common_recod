

$(function () {


	var fTop = $('div.nui-msg').offset().top;
	$(window).scroll( function() {
		var top = $(window).scrollTop() + fTop;
		var isIe6 = /MSIE 6./i.test(navigator.userAgent);
		if (isIe6) {
			$('div.nui-msg').animate({
				top: top
			},100);	
		};
	})

})