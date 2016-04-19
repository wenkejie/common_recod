
$(function () {
	var isIe6 = /MSIE 6./i.test(navigator.userAgent);//ie6条件判断
	var $jump = $('div.cui-jump-top');//回顶按钮
	var $sideContact   = $("#j-sideContact"),
	$window    = $(window),
	topPadding = 300;
	var $shadowHeight = $('div.cui-dialog-shadow').height();
	var $dialogArea = $('div.cui-dialog-area').height();
	var $lastForm = $('div.cui-panel-form:last');//最后一个表单
	// $window.scroll(function() {
	// 	$sideContact.stop().animate({
	// 		top: $window.scrollTop() + topPadding
	// 	});

	// });
	if (isIe6) {
		$shadowHeight = $(window).height();
		$dialogArea = $(window).height();
	};
	$(window).scroll( function() {
		var $Height = $('div.cui-header').innerHeight() + $('div.cui-wrap').innerHeight() + 20;//头部和主体的总高度
		var $winHeight = $(window).height();//窗口可视区域高度
		var $nHeight = $Height - $winHeight;
		var $scrollTop = $(window).scrollTop();

		// 侧边栏的滚动
		if (isIe6) {
			$sideContact.stop().animate({
				top: $window.scrollTop() + topPadding
			});
		};

		// 底部浮动效果
		if ($scrollTop >= $nHeight) {
			$('div.cui-wrap-footer').removeClass('fixed');
		}else{
			$('div.cui-wrap-footer').addClass('fixed');
		};
	});

	// 回顶操作
	$jump.click(function() {
		$(window).scrollTop(0);

	});

	$lastForm.children('div.cui-panel-footer').removeClass('none');
	

})