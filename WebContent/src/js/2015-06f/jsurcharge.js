/**
 * jsurcharge.js 对附加费功能模块新增的js内容
 *
 * @authors 罗建
 * @date    2014-07-09 17:21:19
 * @version v1.0.01
 */
$(function() {

	// tab项的切换信息
	var $tabMenu = $('li.nui-tab-menu-cell');
	var $tabCnt = $('div.nui-tab-cnt');
	$tabMenu.click(function() {
		var index = $(this).index();
		$tabMenu.removeClass("nui-tab-menu-active");
		$(this).addClass('nui-tab-menu-active');
		$tabCnt.hide().eq(index).show();
	});

	// 表格内部的hover效果实现，兼容ie6
	var isIe6 = document.all && /MSIE 6./i.test(navigator.userAgent);
	var trLine = $('tr');
	if (isIe6) {
		trLine.mouseenter(function() {
			$(this).addClass('tr-hover');
		}).mouseleave(function() {
			$(this).removeClass('tr-hover');
		});
	};

	// 下拉的hover效果内部的hover效果实现，兼容ie6
	var isIe6 = document.all && /MSIE 6./i.test(navigator.userAgent);
	var mline = $('.nui-mould-line');
	if (isIe6) {
		mline.mouseenter(function() {
			$(this).addClass('nui-mould-line-hover');
		}).mouseleave(function() {
			$(this).removeClass('nui-mould-line-hover');
		});
	};

	// 下拉选择结构的展示js，纯展示，真实已控件为准
	var listCell = $(".nui-select-list-li");
	$(".nui-select").click(function() {
		$(this).children().children('.nui-drop-down').addClass('dpb');
		$(this).addClass('zindex-up'); /*ie6兼容，防止出现穿透现象*/
		// $("div.nui-drop-down").addClass('dpb');
		return false;
	});
	listCell.click(function() {
		$("div.nui-drop-down").removeClass('dpb');
		$(".nui-select").removeClass('zindex-up');
		return false;
	});

	// 复选框事件
	// checkbox控制按钮的高亮
	$(":checkbox").click(function() {
		if (this.checked) {
			$("#newBuld").removeClass('nui-btn-disable');
		} else {
			$("#newBuld").addClass('nui-btn-disable');
		}
	});

	
	// 全选、取消全选的事件

	$('#jselAll').click(function() {
		var $checkbox = $("input[name='items']");

		if (this.checked) {
			$checkbox.prop({
				"checked": true
			});
		} else {
			$checkbox.prop({
				"checked": false
			});
		}
	});

	// 删除确认弹窗生成的控制
	$('body').delegate('.j-del', 'click', function() {
		var that = $(this);
		var htmlWin;
		htmlWin = fwindow.create({
			title: "删除附加费模板",
			content: "<div class=\"fui-dialog-cnt\" style=\"\"> <div class=\"confirm-cnt confirm-warning tal\" > <div class=\"confirm-icon\"></div> <p class=\"nui-surcharge-line\">你确定要删除此条</p> <p class=\"nui-surcharge-line\"><span class=\"surcharge-mould-name\">\"宁波港\"</span>附加费模板？</p> </div> </div> <div class=\"fui-dialog-btm-bar\"> <a id=\"btn-yes\" class=\"fui-btn-dialog\" href=\"javascript:\"> <span>确定</span> </a> <a id=\"btn-no\" class=\"fui-btn-dialog\" href=\"javascript:\"> <span>取消</span> </a> </div>", width: 340,
			height: 150
		});

		$(htmlWin).find("#btn-yes").click(function() {
			htmlWin.fwindow("close");
			trDelete(that.parents("tr"));
			showRetrunMessage("成功删除")
			return true;
		});
		$(htmlWin).find("#btn-no").click(function() {
			htmlWin.fwindow("close");
			return true;
		});
	})

	// 删除确认弹窗生成的控制
	$('body').delegate('.j-new-bulid', 'click', function() {
		var that = $(this);
		var htmlWin;
		htmlWin = fwindow.create({
			title: "新建附加费模板",
			content: "<div class=\"fui-dialog-cnt\"> <div class=\"nui-newb-box\"> <p class=\"nui-newb-info\"> <i>&#x3573;</i> 你以勾选<span class=\"surcharge-num\">10</span>条附加费添加至新的附加费模板 </p> <div class=\"nui-newb-content\"> <label class=\"nui-newb-label\" for=\"\"> 创建模板名称： </label> <div class=\"nui-form-cell nui-form-cell-newb\"> <input type=\"text\" class=\"nui-input\" id=\"\" /> </div> </div> </div> </div> <div class=\"fui-dialog-btm-bar\"> <a id=\"btn-yes\" class=\"fui-btn-dialog-primary\" href=\"javascript:\"> <span>新建</span> </a> <a id=\"btn-no\" class=\"fui-btn-dialog\" href=\"javascript:\"> <span>取消</span> </a> </div>", width: 380, height: 260
		});

		$(htmlWin).find("#btn-yes").click(function() {
			htmlWin.fwindow("close");
			htmlWin.shoping();
			// trDelete(that.parents("tr"));
			// showRetrunMessage("成功删除")
			return true;
		});
		$(htmlWin).find("#btn-no").click(function() {
			htmlWin.fwindow("close");
			return true;
		});
	})

	// $(function() {
	// 		isIE6= /MSIE 6./i.test(navigator.userAgent);
	// 		// //复选框事件
	// 		// //全选、取消全选的事件
	// 		// function selectAll(){
	// 		// 	if ($("#SelectAll").attr("checked")) {
	// 		// 		$(":checkbox").attr("checked", true);
	// 		// 	} else {
	// 		// 		$(":checkbox").attr("checked", false);
	// 		// 	}

	// 		// }
	// 		// //子复选框的事件
	// 		// function setSelectAll(){
	// 		// 	//当没有选中某个子复选框时，SelectAll取消选中
	// 		// 	if (!$("#subcheck").checked) {
	// 		// 		$("#SelectAll").attr("checked", false);
	// 		// 	}
	// 		// 	var chsub = $("input[type='checkbox'][id='subcheck']").length; //获取subcheck的个数
	// 		// 	var checkedsub = $("input[type='checkbox'][id='subcheck']:checked").length; //获取选中的subcheck的个数
	// 		// 	if (checkedsub == chsub) {
	// 		// 		$("#SelectAll").attr("checked", true);
	// 		// 	}
	// 		// }	

	// function serchReturn () {
	// 	var serachVal = $('#searchSurcharge').val();
	// 	if (serachVal !== "") {
	// 		$(".search-return").removeClass('none');
	// 	}else{
	// 		$(".search-return").addClass('none');
	// 	};
	// }

	$('#searchSurcharge').keyup( function() {
		var serachVal = $('#searchSurcharge').val();
  		if (serachVal !== "") {
			$(".search-return").removeClass('none');
		}else{
			$(".search-return").addClass('none');
		};
	});

	// serchReturn ();

	
})