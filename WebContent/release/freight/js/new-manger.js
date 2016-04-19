$(function() {
	var $tabMenu = $('a.nui-line-tab-link');
	var $tabCnt = $('div.nui-tab-content');
	var $rightControl = $('a.box-right-operate');
	var $dialog = $('div.nui-dialog-area');

	var $slideDialog = $('div.side-dialog');

	var $infoCnt = $('div.user-info-content');
	var $editA = $('a.j-edit');
	// var $inValue = $infoCnt.children('span').text();
	var $editCnt = $("<div class='edit-area'><div class='nui-form-cell mr5 w150'><input class='nui-input' value=''></div><a class='nui-btn nui-btn-primary j-updata mr5' href='javascript:'>确定</a><a class='nui-btn j-cancel' href='javascript:'>取消</a></div>");
	var $editCntTex = $("<div class='edit-area'><div class='nui-form-cell nui-form-cell-textarea w300'><textarea class='nui-textarea h70'></textarea></div><div class='pt10'><a class='nui-btn nui-btn-primary j-updata' href='javascript:'>确定</a> <a class='nui-btn j-cancel' href='javascript:'>取消</a></div></div>");
	var editIn = function(a) {
		var $thisP = a.parent();
		var $info = $thisP.children('span').text();

		if (!$thisP.parents('div.user-form-line').find('div.user-info-content').hasClass('text-area')) {
			$thisP.parent().append($editCnt);
			$thisP.parent().find('.nui-input').val($info);
		}else{
			$thisP.parent().append($editCntTex);
			$thisP.parent().find('.nui-textarea').val($info);
		};
		// $thisP.parent().append($editCnt);
		// $thisP.parent().find('.nui-input').val($info);
		$thisP.addClass('none');
		// console.log(a.parents('div.user-info-content'));
	}

	var editOut = function(a) {
		var $thisP = a.parents('div.edit-area');
		$thisP.parent().children($infoCnt).removeClass('none');
		$thisP.remove();
		a.parents('div.user-info-content').find('a.user-info-add').removeClass('none');
		// console.log(a.parents('div.user-info-content'));
	}

	// var editUp = function(a) {
	// 	var $thisP = a.parent();
	// 	var $vInfo = $thisP.parent().find('.nui-input').val();
	// 	var $tInfo = $thisP.parent().find('.nui-textarea').val();

	// 	if (!a.parents($infoCnt).hasClass('text-area')) {
	// 		$thisP.parent().children($infoCnt).children('span').text($vInfo);
	// 	}else{
	// 		$thisP.parent().children($infoCnt).children('span').text($tInfo);
	// 	};

	// 	// $thisP.parent().children($infoCnt).children('span').text($vInfo);
	// 	$thisP.parent().children($infoCnt).removeClass('none');
	// 	$thisP.remove();
	// 	console.log($thisP.parent().children($infoCnt).children('span'));
	// }

	var editUp = function(a) {
		var $thisP = a.parents('div.user-form-line');
		var $vInfo = $thisP.find('.nui-input').val();
		var $tInfo = $thisP.find('.nui-textarea').val();

		if (!$thisP.find('div.user-info-content').hasClass('text-area')) {
			$thisP.find('span.user-info-cell').text($vInfo);
		}else{
			$thisP.find('span.user-info-cell').text($tInfo);
		};

		// $thisP.parent().children($infoCnt).children('span').text($vInfo);
		$thisP.children($infoCnt).removeClass('none');
		$thisP.find('div.edit-area').remove();
		console.log($tInfo);
	}

	var slideDialog = $('div.side-dialog');


	var rightClose = function() {
		$('div.details-box-right').addClass('box-right-hide');
	}

	var rightOpen = function() {
		$('div.details-box-right').removeClass('box-right-hide');
	}

	var dialogClose = function() {
		$dialog.addClass('none');
	}

	var dialogOpen = function() {
		$dialog.removeClass('none');
	}

	// 侧边栏控制
	var sDialogShow = function() {
		$slideDialog.fadeIn(300);
	}

	var sDialogHide = function() {
		$slideDialog.fadeOut(300);
	}


	$tabMenu.click(function() {
		var index = $(this).parent().index();
		$tabMenu.removeClass("active");
		$(this).addClass('active');
		$tabCnt.hide().eq(index).show();
	});


	$rightControl.click(function() {
		var $thisParent = $(this).parent('div.details-box-right');
		if ($thisParent.hasClass('box-right-hide')) {
			// $thisParent.removeClass('box-right-hide');
			rightOpen();
			$(this).children('i').html('&#xe611;');
		} else {
			// $thisParent.addClass('box-right-hide');
			rightClose();
			$(this).children('i').html('&#xe612;');
		};

	});

	$('.j-serve-add').click(function() {
		// $dialog.removeClass('none');
		dialogOpen();
	});

	$('.j-dialog-close').click(function() {
		// $dialog.addClass('none');
		dialogClose();
	});
	$('a.j-manage').click(function() {
		var $manageSlide = $(this).parent().children('ul.team-manage-content');
		if ($manageSlide.hasClass('none')) {
			$manageSlide.removeClass('none');
		} else {
			$manageSlide.addClass('none');
		};

	});

	$infoCnt.hover(function() {
		$(this).children('a.user-info-edit').removeClass('none');
	}, function() {
		$(this).children('a.user-info-edit').addClass('none');
	});

	// 编辑操作
	$('.user-form-grid').on('click', 'a.j-edit', function() {
		editIn($(this));
		/* Act on the event */
	}).on('click', 'a.j-updata', function() {
		editUp($(this));
	}).on('click', 'a.j-cancel', function() {
		editOut($(this));
	}).on('click', 'a.j-addInfo', function() {
		
	}).on('click', 'a.j-addMore', function() {
		if (!$(this).hasClass('show')) {
			$(this).parents('div.user-form-grid').find('div.form-more-info').removeClass('none');
			$(this).text('收起更多信息').addClass('show');
		}else{
			$(this).parents('div.user-form-grid').find('div.form-more-info').addClass('none');
			$(this).text('填写更多信息').removeClass('show');
		};
		
	}).on('click', 'a.user-info-add', function() {
		$(this).parent().append('<span class="user-info-cell"></span>').append('<a class="user-info-edit none"href="javascript:"><i>&#xe614;</i>编辑</a>');
		editIn($(this));
		$(this).addClass('none');
	}).on('click', 'a.j-selct-tags', function(event) {
		$(this).parent().addClass('none');
		$('div.user-tags-selcet').removeClass('none');
		/* Act on the event */
	});;

	$('table.result-table').on('click', 'a.j-slideControl', function() {
		// if ($slideDialog.hasClass('hide')) {
		// 	sDialogShow();
		// 	$slideDialog.removeClass('hide').addClass('show');
		// }else{
		// 	sDialogHide();
		// 	$slideDialog.removeClass('show').addClass('hide');
		// };
		sDialogShow();
	});

	$('table.nui-table').on('click', 'a.j-slideControl', function() {
		sDialogShow();
	});

	$('a.side-dialog-closed').click(function() {
		sDialogHide();
	});
	

	$('.nui-sign').on('.nui-sign-cell', 'click', function() {
		$(this).parent().children('nui-sign-cell').removeClass('active');
		$(this).addClass('active');
	})


	$('table.nui-table-merger').on('mouseenter', 'td.last-td', function() {
		$(this).addClass('last-td-hover');
	}).on('mouseleave', 'td.last-td', function() {
		$(this).removeClass('last-td-hover');

	}).on('click', 'td.last-td', function(event) {
		var $theRadio = $(this).parent().children('td.first-td').children('input.j-radio');
		$('td.last-td').removeClass('last-td-current');
		$(this).addClass('last-td-current');	
		$('input.j-radio').removeAttr('checked');
		$theRadio.prop('checked', 'ture');
		
	});


	// 表头排序结构
	$('table.result-table').on('click', 'a.sequence-btn', function() {
		$('a.sequence-btn').removeClass('sequence-btn-up').removeClass('sequence-btn-down');
		$(this).addClass('sequence-btn-up');
	});

	$('table.result-table').on('click', 'a.sequence-btn-up', function() {
		$(this).removeClass('sequence-btn-up').addClass('sequence-btn-down');
	});

	$('table.result-table').on('click', 'a.sequence-btn-down', function() {
		$(this).removeClass('sequence-btn-down').addClass('sequence-btn-up');
	});

	// 查询记录显示隐藏
	$('.record-info-more').click(function(){
		var more = $(this).siblings('p').children('span.j-slide');
		if(more.hasClass('none')){
			more.removeClass('none');
			$(this).html('收缩'+'<i>'+ '&#x3437;' +'<i>');
		}else{
			more.addClass('none');
			$(this).html('展开'+'<i>'+ '&#x3451;' +'<i>');
		}	
	})

})