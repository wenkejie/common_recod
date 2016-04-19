var doc = document,
	inputs = doc.getElementsByTagName('input'),

	// 检测 placeholder 支持
	supportPlaceholder = 'placeholder' in doc.createElement('input'),

	/*
	 * 创建 placeholder
	 * @param {ELEMENT} input 传入的 input 对象
	 * @return {VOID}
	 * @author: sofish Lin http://sofish.de
	 */
	placeholder = function(input) {
		var text = input.getAttribute('placeholder'),
			defaultValue = input.defaultValue;

		// 制作一个假 placeholder
		// 需要 css 配合，在 JS 中设置 style 并不太好
		input.value = text;

		// 聚焦去掉假 placeholder
		input.onfocus = function() {
			if (input.value === defaultValue || input.value === text) {
				// this.value = '';
				$(this).parents('.eui-order-input').removeClass('nui-show-placeholder');
			}
		}

		// 当失焦值为空时，补回 placeholder 的值
		input.onblur = function() {
			if (input.value === '') {
				// this.value = text;
				$(this).parents('.eui-order-input').addClass('nui-show-placeholder');
			}
		}
	};

if (!supportPlaceholder) {
	for (var i = 0, len = inputs.length; i < len; i++) {
		var input = inputs[i],
			text = input.getAttribute('placeholder');

		// 当 input[type=text] 并且 placeholder 值不为空是执行
		if (input.type === 'text' && text) {
			placeholder(input);
		}
	}
}


$(function () {
			var tips = $('p.eui-orader-tips');
			input = $('.nui-input');
			inputP = $('.eui-order-input');
			// var showTips = function () {
			// 	tips.removeClass('none');
			// };//空数据提交显示提示信息

			// $('.j-order').click(function() {
			// 	showTips();
			// });

			/**
			 * 输入框聚焦
			 */

			$('.nui-placeholder').click(function() {
				var inpD = $(this).parents('.eui-order-input');
				var inp = $(this).prev();
				inp.focus();	
				
			});

			input.keydown( function() {
				// alert(0);
				var inpD = $(this).parents('.eui-order-input');
			  	if($(this).value != ''){
					inpD.removeClass('nui-show-placeholder');
				}else{
					inpD.addClass('nui-show-placeholder');
				}
			});

			/**
			 * 持续检查输入框状态
			 */
			function fCheckInputAlways(){
				var me = this;
				window.oIntervalCheckInputAlways = setInterval(function(){
					if(input.value != ''){
						inputP.removeClass('nui-show-placeholder');
					}else{
						inputP.addClass('nui-show-placeholder');
					}
				},500);
			}

			// fCheckInputAlways();


		})