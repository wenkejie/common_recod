// ========================

$(function() {
	// 目的港下拉
	$('.j-more').click(function(){
		var dest = $(this).parents('tr').next('tr').children('td.dest-info');
		var other_dest = $(this).parents('tr').next('tr').siblings('tr').children('td.dest-info');
		var other_i = $(this).parents('tr').siblings().find('a.j-more').children('i');
		var other_em = $(this).parents('tr').siblings().find('a.j-more').siblings('em');
		if(dest.hasClass('none')){
			dest.removeClass('none');
			other_dest.addClass('none');
			$(this).children('i').html('&#xe61c;');
			other_i.html('&#xe61d;');
			$(this).siblings('em').removeClass('none');
			other_em.addClass('none');
		}else{
			dest.addClass('none');
			$(this).children('i').html('&#xe61d;');
			$(this).siblings('em').addClass('none');
		}
	})
	// 弹出编辑仓位
	$('.nui-table').delegate('.pencil-icon', 'click', function(){
		var scrolltop = $('.table-seatset-area').scrollTop(); 
		var box = $('.ui-popdown-box');
		var seat_num_old = $(this).siblings('span').text();
		var offset = $(this).offset();
		// console.log(scrolltop);
		if ($(this).parent('.seat-cell').hasClass('j-edit')) {
			$(this).parent('.seat-cell').removeClass('j-edit');
			box.addClass('none');
		} else{
			$(this).parent('.seat-cell').addClass('j-edit');
			$(this).parents('tr').siblings().find('.seat-cell').removeClass('j-edit');
			box.removeClass('none');
			box.children('.seat-num').text(seat_num_old);
			box.css({
				'left': offset.left-37,
				'top': offset.top-10+scrolltop
			});
		}
	});
	
	// 编辑仓位
	$('body').delegate('.j-ensure', 'click', function(){
		var seat_input = $(this).siblings('.nui-form-cell').children('input');
		var seat_num = $('.j-edit').children('span');
		seat_num.text(seat_input.val());
		$('.seat-cell').removeClass('j-edit');
		$(this).parents('.ui-popdown-box').addClass('none');
		seat_input.val('');
	}).delegate('.j-cancle', 'click', function(){
		var seat_input = $(this).siblings('.nui-form-cell').children('input');
		$(this).parents('.ui-popdown-box').addClass('none');
		seat_input.val('');
	})
	// 下拉列表
	$('body').delegate('div.nui-select', 'click', function() {
		var that = $(this);
		var $drapDown = $(this).find('div.nui-drop-down');
		var other_select = $(this).parents('tr').siblings().find('div.nui-select');
		var $other_drapDown = $(this).parents('tr').siblings().find('div.nui-drop-down');
		$('div.nui-select').removeClass('zindex-up').find('div.nui-drop-down').hide();//所有下拉重置
		
		var $other_formline = $(this).parent('div.form-line').siblings('div.form-line');//表单编辑时需给父集增加层级
		that.parent('div.form-line').removeClass('zindex-up');
		if($drapDown.is(":hidden")){
			$drapDown.show();
			that.addClass('zindex-up');
			$other_drapDown.hide();
			other_select.removeClass('zindex-up');
			that.parent('div.form-line').addClass('zindex-up');
			$other_formline.removeClass('zindex-up');
		} else{
			$drapDown.hide();
			that.removeClass('zindex-up');
			that.parent('div.form-line').removeClass('zindex-up');
		}
		$(this).delegate('li.nui-select-list-li', 'click', function() {
			var val = $(this).text();
			$drapDown.hide();
			that.find('input').val(val);
			that.removeClass('zindex-up');
			that.parent('div.form-line').removeClass('zindex-up');
			return false
		});
	});
	// 报价类型设置
	$('.j-addtype').click(function(){
		var input =  $(this).parent().siblings().find('.nui-input');
		var prev_tr = $(this).parents('tr').prev('tr');
		prev_tr.after("<tr>"+"<td>"+input.val()+"</td>"+"<td>"+"无应用"+"</td>"+"<td>"+'<a href="javascript:">'+"删除"+"</a>"+"</td>"+"</tr>");
		input.val("");
		return false;
	})

	// 车队报价区域的编辑框,多价格编辑
	$('.nui-table-trailer').delegate('.price-editer', 'click', function(){
		var scrolltop = $('.table-seatset-area').scrollTop(); 
		var box = $('.ui-popdown-box');
		var seat_num_old = $(this).siblings('span').text();
		var offset = $(this).offset();
		// console.log(scrolltop);
		if ($(this).hasClass('j-edit')) {
			$(this).removeClass('j-edit');
			box.addClass('none');
		} else{
			$(this).addClass('j-edit');
			$(this).parents('tr').siblings().find('.seat-cell').removeClass('j-edit');
			box.removeClass('none');
			box.children('.seat-num').text(seat_num_old);
			box.css({
				'left': offset.left - 35,
				'top': offset.top + 20 + scrolltop
			});
		}
	}).delegate('.j-ensure', 'click', function(){
		var seat_input = $(this).siblings('.nui-form-cell').children('input');
		var seat_num = $('.j-edit').parent().children('span');
		seat_num.text(seat_input.val());
		$('.price-editer').removeClass('j-edit');
		$(this).parent('.ui-popdown-box').addClass('none');
		seat_input.val('');
	}).delegate('.j-cancle', 'click', function(){
		var seat_input = $(this).siblings('.nui-form-cell').children('input');
		$(this).parent('.ui-popdown-box').addClass('none');
		seat_input.val('');
	})


	// 加价设置
	$('.add-set-cell').delegate('.add-set', 'click', function(){
		var add_cell = $(this).parent();
		var other_add_cell = $(this).parents('tr').siblings().find('td.add-set-cell');
		if ($(this).hasClass('add-set-active')) {
			$(this).removeClass('add-set-active');
			$(this).siblings().addClass('none');
			add_cell.removeClass('zindex-up');
		} else{
			$(this).addClass('add-set-active');
			other_add_cell.children('.add-set').removeClass('add-set-active');
			$(this).siblings().removeClass('none');
			other_add_cell.children('.add-set-list').addClass('none');
			add_cell.addClass('zindex-up');
			other_add_cell.removeClass('zindex-up');
		};
	})
	$('.add-set-list').delegate('.j-delete', 'click', function(){
		$(this).parents('tr').next().empty();
		$(this).parents('tr').empty();
	})

	// 车队报价维护
	
	$('.j-selct-all').click(function() {
		// console.log($('input.item').checked);
		var $checkbox = $('input.check-item');

		if (this.checked) {
			$checkbox.prop({
				"checked": true
			});

			$('table.nui-table-trailer').children('tbody').prepend('<tr><td class="selectwhole" colspan="12"><span>已勾选本页 25 个选项</span>，<a id="jWhole" href="javascript:">勾选表格中全部955个选项</a></td></tr>');
			// $(this).parent().parent().parent().append('<tr><th colspan="7">dawdawd</th></tr>');
		} else {
			removeChecked();
			$checkbox.prop({
				"checked": false
			});
		}
	});
	// 移除选择条

	function removeChecked() {
		$('td.selectwhole').parent().remove();

	}

})