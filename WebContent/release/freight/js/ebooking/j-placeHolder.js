$(function() {
	var tips = $('p.eui-orader-tips');
	var input = $('.nui-input');
	var inputP = $('.eui-order-input');

	$('.nui-placeholder').click(function() {
		var inp = $(this).prev();
		inp.focus();
	});

	input.keyup(function() {
		var inpD = $(this).parents('.eui-order-input');
		if ($(this).val() != '') {
			inpD.removeClass('nui-show-placeholder');
		} else {
			inpD.addClass('nui-show-placeholder');
		}
	});

})