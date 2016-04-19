// ======================================
// ============== 在线ebooking ==========
// ============== by,evan ===============
// ======================================

$(function() {

	var tag = $('.data-tags-cell');// tags组件
	var surchargeControl = $('.j-surcharge-control');//附加费结构控制
	var inputSlide = $('.j-slide-down');//输入框下拉控制

	var selItem = $('a.eui-dropdown-link');


	var surchargeShow = function() {
		surchargeControl.addClass('zindex-up');
		surchargeControl.addClass('surcharge-show');
		$('.surcharge-slidedown-icon').html('&#xe601;');
	}

	var surchargeHide =  function() {
		surchargeControl.removeClass('zindex-up');
		surchargeControl.removeClass('surcharge-show');
		$('.surcharge-slidedown-icon').html('&#xe602;');
	}

	tag.click(function() {
		tag.removeClass('data-tags-current');
		$(this).addClass('data-tags-current');
	});

	surchargeControl.click(function() {
		if (!$(this).hasClass('surcharge-show')) {
			surchargeShow();
		}else{
			surchargeHide();
		};
	});

	inputSlide.focus(function() {
		$('ul.eui-dropdown').addClass('none');
		$(this).parents('div.eui-input').children('ul.eui-dropdown').removeClass('none');
	});

	selItem.click(function() {
		var txt = $(this).text();
		var inputVlue = $(this).parents('div.eui-input').children('div.eui-input-content').children('input.eui-input-text');
		$(this).parents('ul.eui-dropdown').addClass('none');
		inputVlue.val(txt);


	});

})