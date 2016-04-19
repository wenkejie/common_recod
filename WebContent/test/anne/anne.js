;
$(function () {

	var $sTop = $(window).scrollTop();
	var $ofsTop = $('div.wrap-sidebar').offset().top;
	// console.log($sTop);
	console.log($ofsTop);
	if ($sTop > $ofsTop) {
		$('div.wrap-sidebar').addClass('affix');
	};
	$('a.sidebar-nav-link').click(function() {
		$('a.sidebar-nav-link').removeClass('active');
		$(this).addClass('active').parent().children('ol.sidebar-nav-sub').removeClass('none');
	});

})