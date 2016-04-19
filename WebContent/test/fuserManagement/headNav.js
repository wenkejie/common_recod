	;
	(function($) {
		$.fn.delayhover = function(item, fnOver, fnOut) {

			var time = 200;
			var delaytime = "";
			var hasfn = "";

			return this.delegate(item, 'mouseenter', function(e) {
					var that = this;
					hasfn = false;
					delayitem = setTimeout(function() {
						fnOver.call(that, e);
						hasfn = true;
					}, time);
				}
				// fnOver
				// delayitem = setTimeout(fnOver,time)

			).delegate(item, 'mouseleave',
				function(e) {
					var that = this;
					clearTimeout(delayitem);
					if (hasfn) {
						fnOut.call(that, e)
					}
				}
			)
		}
	})(jQuery);
	(function($) {
		$.fn.myhover = function(item, fnOver, fnOut) {
			// console.log($(this))
			return $(this).delegate(item, 'mouseenter', fnOver).delegate(item, 'mouseleave', fnOut || fnOver)
		}
	})(jQuery);


	function showRetrunMessage(msg){
		var $message = $('<div>',{'class':'nui-return-message','text':msg});
					// $message.css({top:(top + 100)})
					$message.appendTo('body').fadeIn().delay(800).fadeOut(function(){$message.remove();});
				}

			(function($) {
			$.fn.scrollfix = function() {
				var offset = $(this).offset();
				var that   = $(this);
				var h      = that.outerHeight();

				that.height(h);
				// console.log($('#header').clone())
				$(window).scroll(function() {
					if ($(window).scrollTop() > offset.top) {
						if(!$('#j-fixed').length){
							// var html = that.html();
							that.children().wrapAll('<div id="j-fixed" class="scroll-fixed"></div>');
						}
						if (!$('#j-fixed').hasClass('scroll-fixed')) {
							$('#j-fixed').addClass('scroll-fixed');
						};

					} else {
						$('#j-fixed').removeClass('scroll-fixed');
					}
				})
			}
		})(jQuery);

$(function () {

$('#header').scrollfix();

	var $mainNav = $('div.main-nav');
	var $mainSubNav = $('div.main-sub-nav');

	// if (!!!$mainSubNav.length) {
	// 	$mainNav.addClass('main-nav-shadow');
	// };
		

	var url = window.location.href;
	var urlLast = url.split("/");
	var urlName = urlLast[urlLast.length - 1]
	var types = {
		"list.shtml":4,
		// "multilevelprice.shtml":5,
		"analytics.shtml":4,
		"ruleset.shtml":4
		// "ruleset.shtml":6,
	}
	// var navIndex = types[urlName];
	// console.log(navIndex)
	// $('a.main-nav-link:eq(' + navIndex + ')').addClass('main-nav-link-active');
	types[urlName] && $('a.main-nav-link:eq(4)').addClass('main-nav-link-active');
	// $('a.main-nav-link:eq(' + navIndex + ')').parent().children('div.main-nav-cell-arrow').removeClass('none');
	// if (navIndex != 4) {
	// 	$mainSubNav.addClass("none");
	// 	$mainNav.addClass('main-nav-shadow');
	// }

	$('div.main-nav').delayhover(
		"li.main-nav-cell",
		function(){
			var $dropdown = $(this).find('.main-nav-drop-down');

			if($dropdown.css("margin-left") == "0px"){
				$dropdown.css("margin-left",- ($dropdown.outerWidth() - $(this).width())/2)
			} 

			$dropdown.addClass('block').animate({
				top:60,
				opacity:1
			},50)
		},
		function(){
			$(this).find('.main-nav-drop-down').removeClass('block').css({
				opacity:0,top:55
			})
		})

	$('body').delegate('input,textarea,select', 'focus', function() {
		if (this.nodeName == "SELECT") {
			$(this).addClass('nui-form-cell-focus')
		}else{

		$(this).parents('div.nui-form-cell').addClass('nui-form-cell-focus')
		}
		
	})
	.delegate('input,textarea,select', 'blur', function() {
		if (this.nodeName == "SELECT") {
			$(this).removeClass('nui-form-cell-focus')
		}else{

		$(this).parents('div.nui-form-cell').removeClass('nui-form-cell-focus')
		}
		
	});

	// if(urlName == "list.shtml"){
	// 	$('div.nav-sub').find('a:first').addClass('active');
	// }else{
	// 	$('div.nav-sub').find('a:last').addClass('active');
	// }

	var num = {
		"list.shtml":0,
		// "multilevelprice.shtml":5,
		"analytics.shtml":1,
		// "multilevelprice.shtml":2,
		"ruleset.shtml":2
	};
	var numc = num[urlName];
	// console.log('a:eq('+numc+')');
	$('div.nav-sub').find('a:eq('+numc+')').addClass('active');//头部自导航active动态效果，by：Evan


				

	// $('ul.nav').myhover(
	// 				'li.nav-cell',
	// 				function() {
	// 					// $(this).addClass('nav-cell-hover');
	// 					// if (!$(this).is(".nav-cell-active")) {
	// 						// $(this).find('div').stop(true, true).show().animate({
	// 						// 	top: 54,
	// 						// 	opacity: 1
	// 						// }, 150)
	// 					// }
	// 				},
	// 				function() {
	// 					$(this).removeClass('nav-cell-hover').find('div').stop(true, true)
	// 						.animate({
	// 							top: 44,
	// 							opacity: 0
	// 						}, 150, function() {
	// 							$(this).hide()
	// 						})
	// 				}
	// 		)


	$("input").focus(function() {
		$("div.nui-form-cell").removeClass('nui-form-cell-focus');
		$(this).parents("div.nui-form-cell").addClass('nui-form-cell-focus');
	});



	$('ul.top-menu').delayhover(
		"li.has-dropdown",
		function(){
			$(this).addClass("top-menu-cell-active");
			// $(this).find('div.nui-drop-down').removeClass("hide")
		},
		function(){
			$(this).removeClass("top-menu-cell-active");
			// $(this).find('div.nui-drop-down').addClass("hide")
		}
		)

	$('a.insert').click(function() {
		$(this).parent().addClass('none');
		$('a.to-help').removeClass('none');
	});


	// $('div.to-place').delayhover(
	// 	"a.to-help",
	// 	function(){
	// 		$('div.to-help-out').removeClass('none');
	// 		// $(this).addClass('none');
	// 	},
	// 	function(){
	// 		$('div.to-help-out').addClass('none');
	// 	}
	// 	)

	$('a.to-help').hover(function() {
		$(this).addClass('to-help-active');
	}, function() {
		$(this).removeClass('to-help-active');
	});

	$('a.to-top').hover(function() {
		$(this).addClass('to-top-active');
	}, function() {
		$(this).removeClass('to-top-active');
	});

	$('#j-place-move').parent().draggable();
	$('#j-place-close').click(function() {
		var offset = $('ul.top-menu').offset();
		console.log(offset);
		$(this).parent().parent().animate(
		{
			top: offset.top, left: offset.left
		}, 500,function  () {
			$(this).addClass('none')
		})
	});


})