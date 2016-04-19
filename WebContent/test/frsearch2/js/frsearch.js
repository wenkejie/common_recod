	function autoScaling() {
		var pscale = $('body').width() / $('body').height();
		// console.log(pscale);
		var imgscale = $('#j-background').width() / $('#j-background').height();
		// console.log(imgscale);
		if (imgscale > pscale ) {
			$('#j-background').css('width', '100%');

		}else{
			$('#j-background').css('height', '100%');
		};
	}

	$(function () {
		autoScaling();
		var $mbtn = $('a.menu-drop-btn');
		var $menu = $('div.menu-drop-fixed');//头部的下拉结构
		
		$mbtn.click(function(event) {
			$menu.removeClass('none');
		})

		$('#j-country').hover(function() {
			$(this).children().removeClass('iconEngland').addClass('iconChina');
		}, function() {
			$(this).children().removeClass('iconChina').addClass('iconEngland');
		});

		$('#j-input').keydown(function(){
			// console.log($(this).parents($('frs-input-grid')).children('ul.input-dropdown'));
			$(this).parents($('frs-input-grid')).children('ul.input-dropdown').removeClass('none');
		});

		//语言变化结构的js,by:Evan
		$('a.j-Dropdown').click(function() {
			$('div.slide-down').removeClass('none');
			return false;
		});

		$('a.slide-down-link').click(function() {
			$('i.icon-right').addClass('none');
			$(this).children('i.icon-right').removeClass('none');
			$(this).parents('div.slide-down').addClass('none');
		});

		$(document).click(function() {
			$('div.slide-down').addClass('none');
		});

	})