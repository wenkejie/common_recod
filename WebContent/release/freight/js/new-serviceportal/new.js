/**
 * @author 闻科杰 2013-07-16
 * @depends jquery-1.9.1.js
 * @description 新外部查询js，右侧浮窗部分js实现，置顶，及fixed兼容ie6
 */


$(function () {

	var fTop = $('div.gui-msg').offset();
	var isIe6 = /MSIE 6./i.test(navigator.userAgent);
	var $sidebar = $('.gui-toolbar'),
		$window = $(window),
		$Tips = $('div.gui-tips'),
		$companyTips = $('div.gui-tips-company'),
		$warehouseTips = $('div.gui-tips-warehouse');

	// var AllHet = $window.height();
	$('.j-return-top').click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000)
		// if (isIe6) {
		// 	$('div.gui-toolbar').css('top', 0);
		// };

	})

	$(window).scroll(scrolls)
	scrolls()

	function scrolls() {
		var blackTop = $('.j-return-top')
		var sTop = $(window).scrollTop();

		if (sTop <= 600) {
			blackTop.fadeOut(300).css('display', 'none')
		} else {
			blackTop.fadeIn(300).css('display', 'block')

		}

	}


// fixed兼容ie6,js模拟实现
	if (isIe6) {
		var topPadding = 276;
		$window.scroll(function() {
			$sidebar.stop().animate({
				top: $window.scrollTop() + topPadding
			});

		});
	};

	$('table.gui-table').delegate('a.j-company-info', 'click', function() {
		var $theIcon = $(this).children('i');
		var offset = $theIcon.offset();
		// console.log(offset);
		if (!$(this).hasClass('show-info-current')) {
			$companyTips.css({
			'left': offset.left -269,
			'top': offset.top + 21
			});
			$(this).addClass('show-info-current');
			$theIcon.html('&#xe601;');
			$Tips.addClass('none');
			$companyTips.removeClass('none');
			return false;
		}else{
			$companyTips.css({
			'left': 'auto',
			'top': 'auto'
			});
			$(this).removeClass('show-info-current');
			$theIcon.html('&#xe602;');
			$companyTips.addClass('none');
			return false;
		};
		
	});

	$('table.gui-table').delegate('a.j-warehouse-info', 'click', function() {
		var $theIcon = $(this).children('i');
		var offset = $theIcon.offset();
		// console.log(offset);
		if (!$(this).hasClass('show-info-current')) {
			$warehouseTips.css({
				'left': offset.left -83,
				'top': offset.top + 21
			});
			$(this).addClass('show-info-current');
			$theIcon.html('&#xe601;');
			$Tips.addClass('none');
			$warehouseTips.removeClass('none');
			return false;
		}else{
			$warehouseTips.css({
			'left': 'auto',
			'top': 'auto'
			});
			$(this).removeClass('show-info-current');
			$theIcon.html('&#xe602;');
			$warehouseTips.addClass('none');
			return false;
		};
		
	});

	// $('table.gui-table').delegate('a.j-warehouse-info', 'click', function() {
	// 	var offset = $(this).children('i').offset();
	// 	// console.log(offset);
	// 	$warehouseTips.css({
	// 		'left': offset.left -83,
	// 		'top': offset.top + 21
	// 	});
	// 	$Tips.addClass('none');
	// 	$warehouseTips.removeClass('none');
	// 	return false;
	// });

	var selectShow = function (a) {
		var $topNum = a.offset().top;
		var $topDel = a.parents('div.gui-panel').offset().top;
		// a.addClass('route-select-current');
		$('div.harbour-select').removeClass('none');
		$('div.harbour-select').css({
			'top': $topNum - $topDel + 29
		});
	}

	var selectHide = function () {
		$('a.route-select-current').removeClass('route-select-current');
		$('div.harbour-select').addClass('none');
	}

	$('div.route-select').on('click', 'a.route-select-link', function() {
		selectShow($(this));
		
		$('a.route-select-current').removeClass('route-select-current');
		$(this).addClass('route-select-current');
	});

	$('a.harbour-select-close').click(function() {
		selectHide();
		// return false;
	});


	var $tabMenu = $('li.tab-menu-cell');
	// var $tabCnt = $('div.eui-tab-cnt');
	// $tabMenu.click(function() {
	// 	var index = $(this).index();
	// 	$tabMenu.removeClass("tab-menu-active");
	// 	$(this).addClass('tab-menu-active');
	// 	$tabCnt.hide().eq(index).show();
	// });

	// $tabMenu.click(function() {
	// 	var index = $(this).index();
	// 	$tabMenu.removeClass("tab-menu-active");
	// 	$(this).addClass('tab-menu-active');
	// 	$tabCnt.hide().eq(index).show();
	// });

	$('div.gui-tab').on('click', 'li.tab-menu-cell', function() {
		var index = $(this).index();
		var $tabMenu = $(this).parent().children('li.tab-menu-cell');
		var $tabCnt = $(this).parents('div.gui-tab').children('div.gui-tab-cnt');
		$tabMenu.removeClass("tab-menu-active");
		if ($(this).hasClass('j-tab-select')) {
			$(this).children('div.tab-menu-drop').removeClass('none');
			$(this).addClass('tab-menu-active');
		}else{
			$(this).addClass('tab-menu-active');
		};
		$tabCnt.hide().eq(index).show();
	});

	$('a.j-serve-link').click(function() {
		$(this).parent().children('div.server-area').removeClass('none');
	});

	// $('a.sequence-btn').click(function() {
	// 	$('a.sequence-btn').removeClass('sequence-btn-up');
	// 	$('a.sequence-btn').removeClass('sequence-btn-down');
	// 	$(this).addClass('sequence-btn-up');
	// });
	$('tr.gui-table-header').on('click', 'a.sequence-btn', function() {
		$('a.sequence-btn').removeClass('sequence-btn-up').removeClass('sequence-btn-down');
		$(this).addClass('sequence-btn-up');
	});

	$('tr.gui-table-header').on('click', 'a.sequence-btn-up', function() {
		$(this).removeClass('sequence-btn-up').addClass('sequence-btn-down');
	});

	$('tr.gui-table-header').on('click', 'a.sequence-btn-down', function() {
		$(this).removeClass('sequence-btn-down').addClass('sequence-btn-up');
	});


	// 底层消息窗口的位置ie6兼容实现
	$(window).scroll( function() {
		var top = $(window).scrollTop() + fTop;
		// var isIe6 = /MSIE 6./i.test(navigator.userAgent);
		if (isIe6) {
			$('div.gui-msg').animate({
				top: top
			},100);	
		};
	})


	// 新功能提示
	var bulletinShow = function () {
		$('div.ui-bulletin').removeClass('none');
	}

	var bulletinHide = function () {
		$('div.ui-bulletin').addClass('none');
	}
	 
	$('a.new-bulletin-link').click(function() {
		bulletinShow();
	});

	$('a.ui-bulletin-close').click(function() {
		bulletinHide();
	});

	
	$('a.gui-toolbar-cell').hover(function() {
		$(this).addClass('toolbar-cell-hover');
	}, function() {
		$(this).removeClass('toolbar-cell-hover');
	});


	$('.j-fly').click(function(){
		var flyElm = $(this).clone().css('opacity','0.7');
		flyElm.css({
			'z-index': 9000,
			'display': 'block',
			'position': 'absolute',
			'top': $(this).offset().top +'px',
			'left': $(this).offset().left +'px',
			'width': $(this).width() +'px',
			'height': $(this).height() +'px'
		});
		$('body').append(flyElm);
		flyElm.animate({
			top:$('.ui-top-username').offset().top,
			left:$('.ui-top-username').offset().left,
			width:50,
			height:50,
			opacity:0,
		},'slow');
	});



	$('.ui-top-user').mouseenter(function() {
		$(this).addClass('top-user-active');
	});

	$('.ui-top-user').mouseleave(function() {
		$(this).removeClass('top-user-active');
	});


})