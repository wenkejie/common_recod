function messageshow_error(text) {
	 messageclose(true);
	$('.nui-dialog-cnt').after("<div class='nui-message nui-message-error oneline'>"+text+"<a href='javascript:' onclick='messageclose()' class='ml5'>×</a></div>");
	var $message = $('div.nui-message');
	var w = $message.outerWidth();
	$message.css('margin-left', -w / 2).animate({
		height : 26,
		width:w-20
	}, 150, function() {
		$(this).animate({
			left : "50%"
		}, 300)
	})
}

function messageclose(animate){
	if(animate){
		$('div.nui-message').remove();
	}else{
		$('div.nui-message').animate(
				{ opacity: 0, height: 0}, 500,function () {
					$(this).remove();
				}
			).dequeue();
	}
}

function messageshow_warn(text) {
	messageclose(true);
	$('.nui-dialog-cnt').after("<div class='nui-message nui-message-warning oneline'>"+text+"<a href='javascript:' onclick='messageclose()' class='ml5'>×</a></div>");
	var $message = $('div.nui-message');
	var w = $message.outerWidth();
	$message.css('margin-left', -w / 2).animate({
		height : 26,
		width:w-20
	}, 150, function() {
		$(this).animate({
			left : "50%"
		}, 300)
	})
}

// 全局变量(为了客服人员名称不存在时终止后续保存操作)
var isAbortScript;

/*****
 * 页面消息提示
 * @param text ：要显示的内容
 * @return
 */
function messageshow(text) {
	messageclose(true);
	$('.nui-dialog-cnt').after(
			"<div class='nui-message'>" + text + "</div>");
	var $message = $('div.nui-message'), w = $message.outerWidth();
	$message.css('margin-left', -w / 2).animate({
		height : 26,
		width:w-20
	}, 150, function() {
		$(this).animate({
			left : "50%"
		}, 300).delay(3500).animate({
			opacity : 0,
			height : 0
		}, 500, function() {
			$(this).remove()
		});
	});
}

/****
 * 是否需要做延时(默认300ms),延时时间范围内影响isAbortScript的值
 * 					通过全局变量isAbortScript的值可能需要终止后续脚本正常运行
 * @return
 */
function changeIsAbortScriptVal(delay){
	delay = !delay ? 300 : delay;
	isAbortScript = true;
	setTimeout(function() {
		isAbortScript = false;
	}, delay);
}

jQuery.fn.tabchange=function(item,con) {
	var $tab = $(this);
	$tab.delegate(item,'click',function(){
		var	index = $(this).parent().index();
		$(this).addClass("active").parent().siblings().children().removeClass('active');
		$tab.find(con).addClass("none").eq(index).removeClass("none")
	})
}

jQuery.fn.tipsshow = function(tipsItem,delay,left) {
	// 批量按钮为灰色时,鼠标移动到按钮上的tips显示
	var $btn = $(this);
	var $tips = $(tipsItem);
	var timeout;
	if(!delay){
		delay= 300;
	}
	var tops=25;
	if(!left){
		left=0;
	}else{
		tops=0;
	}
	$btn.mouseenter(function() {
		if(left){
			$tips.children('div').removeClass("top");
		}else{
			$tips.children('div').addClass("top");
		}
		if ($(this).hasClass("nui-btn-tablebar-disable")) {
			var offset = $(this).offset();
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				$tips.css({left:(offset.left+left),top:(offset.top+tops)}).removeClass('none');
			}, delay);
		}
	}).mouseleave(function() {
		if ($(this).hasClass("nui-btn-tablebar-disable")) {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				$tips.addClass('none');
			}, delay/10);
		}
	});
}


// 全选功能
function selectAllCheckBox(selectCheckBox){
	$("input[type='checkbox']").prop("checked",selectCheckBox.checked);
	
	if(selectCheckBox.checked){
		$('div.nui-multi-btn a').removeClass('nui-btn-tablebar-disable');
	}else{
		$('div.nui-multi-btn a').addClass('nui-btn-tablebar-disable');
	}
}
//打开窗口
function openWin(url,title,opt){
	fwindow.create(
	$.extend({
		maxable : false,
		resizeable : false
	},opt,{title : title,url : url}));
}

//打开窗口
function openPageEntityWin(url,title,opt){
	fwindow.create(
	$.extend({
		maxable : true,
		resizeable : false,
		resizeStop : function(event,ui){ui.self.resizeTable(ui.size.height,ui.size.width);}
	},opt,{title : title,url : url}));
}


function winClose(re) {
	if(re){
		fwindow.parent().fu_refresh();
	}
	fwindow.destory();
}
/**
 * 自定义列头
 * @param page_name
 * @param model_id
 * @param title
 */
function openPortlet(page_name,model_id,title){
	var url = "/datamining/portletCustomization.ctrl?$action=portletCustomizationView&model_id="+ model_id+"&page_name=" +page_name;
	openWin(url, title, {
		width : 580,
		height : 410,
		beforeUnload : function(event, ui) {
			fu_refresh();
		}
	});
}



/**
 * 页面翻页 要求实现$curPageNumber 的change的方法
 * 如：
 * $(function(){
	$curPageNumber = $("input[name='curPageNumber']");
	$curPageNumber.change(function(){
		fu_query();
	})
});
 * 
 * 
 */
var $curPageNumber;



function fu_goPage(num){
	if(num){
		$curPageNumber.val(num);
		$curPageNumber.change();
	}
}


function fu_goPrevPage(){
	var num = $curPageNumber.val()*1-1;
	if(num>0){
		$curPageNumber.val(num);
		$curPageNumber.change();
	}
}

function fu_goNextPage(){
	var num = $curPageNumber.val()*1+1;
	if(num){
		$curPageNumber.val(num);
		$curPageNumber.change();
	}
}


function tableHeight(height) {
	height = height - 16;
	height-= $('div.table-drag-controls').position().top;
	height = height - $("div.table-foot").outerHeight();
	return  height;
}

$(function(){
	// 禁止输入框输入英文双引号["]
	$("body").delegate("input:text","keyup",function(event){
		var self = $(this);
		switch (event.keyCode) {
		case 222://  "(英文双引号)
			self.val(self.val().replace(/\"/g,""));
        	break;
        default:
            break;
		}
	}).delegate("input:text","blur",function(event){
		var self = $(this);
		self.val(self.val().replace(/\"/g,""));
	});
});

/**
 * 搜索条件改变时触发的事件使"搜索"按钮的背景变化
 * search_onblur
 */
 function search_onblur() {
 	 var changedValue = $("#searchBox").find("input").serialize();
 	 if(changedValue == originalValue){
 	 	//搜索条件无改变
 	 	$("#query_btn").removeClass("nui-btn-primary");
 	 	$("#query_btn").addClass("nui-btn");
 	 }else{
 	 	$("#query_btn").addClass("nui-btn-primary");
 	 	$("#query_btn").removeClass("nui-btn");
 	 }
 }