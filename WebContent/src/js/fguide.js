/**
 * @version 1.0.0
 * @author 李光耀 2013-05-23
 * @depends jquery-1.9.1.js 
 * @description 功能引导
 * 
 * @option contentClass                                          说明内容框的样式名
 * @option item                                                  被引导对象用于获取坐标值
 * @option contentClass:'guide-content'                          可以不设，为内容框的样式名
 * @option item:[$('#js-step2'),$('#js-step21'),$('#js-step22')] 被引导的对象，用来计算定坐标
 * @option conOffset:[{'left':-100,'top':70},{'left':-100,'top':70}] 内容框相对与聚焦框的偏移坐标
 * @option conStepClass:['guide-content-2','guide-content-21']	  每一步指定一个内容框的样式
 * @option range:[0,0,3],                                         指定每一步是否需要比引导对象大一点--可以不设，默认为0
 * @option clearPotion:[$('.fui-dialog-cnt')],                    兼容ie6，ie7父级有position的话无法被超越
 * @option clearScroll:$('body')                                  防止移动过程中产生滚动条
 * @option width:[0,-140,0],                                      计算后的长度再减去这里的width
 * @option isDisplayCheckedFun:function(){}						  勾选了“不在显示”，关闭引导页时,执行此方法
 * $.guide.isDisplay()                                            返回false,true,true代表已经勾选
 */
;(function($){ 
$.guide = {
	opts:null,
	guideItem:function (options) {
		var defaults = {
			contentClass:'guide-content',//说明内容框的样式名
			item:[$('#stepOne'),$('#stepTwo')],//被引导对象用于获取坐标值
			conOffset:null,//设置内容框的相对偏移坐标
			conStepClass:null,//设置每一步的内容框样式
			clearPotion:null,//设置被引导元素的带有position属性的父级元素名，选填
			clearScroll:null,
			width:0,
			range:0,//比被引导对象扩大多少像素--可以不设，默认为0
			i:0,//标识引导对象的下标
			isDisplayCheckedFun: function(){},// 勾选了“不在显示”，关闭引导页时,执行此方法
			fwindowTop: ($(window.parent).height() - fwindow.widget().fwindow("option","height") - 30)/2,//30为fui-dialog-title的高度
	    	fwindowLeft: ($(window.parent).width() - fwindow.widget().fwindow("option","width"))/2
		}
		this.opts = $.extend(defaults,options);
	},
	crateMask:function(options){
		var dialog = fwindow.widget();
		// var dialogOffset = dialog.offset();

		var defaults = { 
				where:$(window.parent.document.body),//创建遮障的位置，弹出框就在父级body
	    		left:this.opts.fwindowLeft,
	    		top:this.opts.fwindowTop
	    		// width: document.body.clientWidth,  
	   			// height: document.body.clientHeight
  			}; 
  		// var w =  window.parent.document.body.clientWidth,
  		// 	h =  window.parent.document.body.clientHeight; 
  		var opts = $.extend(defaults, options); 

// alert(fwindow.widget().fwindow("option","height"))
  		var hasOverlay = opts.where.find("div.fui-overlay-guide");
			hasOverlay.length && hasOverlay.remove().end().find('.'+this.opts.contentClass).remove();

  		var ele  = ['top'/*,'right','bottom','left'*/];//遮障的方向
  		var html = "";
  		for (var i = 0; i < ele.length; i++) {
  				var css = {
  					         'top':'height:30px;top:'+(opts.top)+'px;left:'+(opts.left)+'px;width:'+(dialog.fwindow("option","width"))+'px'
  					      // 'bottom':'top:'+(opts.top + opts.height)+'px;height:'+ (h - opts.top - opts.height)+'px',
  					      //  'right':'top:'+ opts.top+'px;left:'+(opts.left + opts.width)+'px;height:'+opts.height+'px;width:'+(w - opts.left - opts.width)+'px',
  					      //   'left':'top:'+opts.top+'px;width:'+opts.left+'px;height:'+opts.height+'px',
  				}
				html +='<div class="fui-overlay fui-overlay-guide fui-overlay-'+ele[i]+'" style="'+css[ele[i]]+'"></div>'
			};
		
		opts.where.append(html);
		$('body').append('<div class="fui-overlay"></div>');//弹出窗内部加遮障
		$('.fui-overlay').css('opacity', '.4');
		// alert(1)
		return $.guide;
	},
	showStep:function(){
		var opts = this.opts;
		var range = opts.range[opts.i] || 0;

			// 获取内容框的偏移量
		var left = opts.conOffset[0].left,
			top  = opts.conOffset[0].top;
		
		var obj = opts.item[opts.i]
		// console.log(opts.i)
			//对象提升zindex
			obj.addClass('guide-zindex');

			//兼容ie6，ie7父级元素有position属性的话无法提升zindex
			$(opts.clearPotion).each(function(){$(this).css("position","static")});
			//
			$(opts.clearScroll).each(function(){$(this).css({"overflow":"hidden",'position':"relative"})});

		var w = obj.outerWidth(),
			h = obj.outerHeight(),
			offset = obj.offset();
			// alert(opts.obj.offset().left)
		// var html = ;	
		var winOffset = {left:this.opts.fwindowLeft,top:this.opts.fwindowTop};//获取窗口的坐标
		var list = "";
		var parentWindow = $(window.parent.document.body);
			for (var i = 0; i < opts.item.length; i++) {
				var listclass = !i ? 'active' : "";
				list += '<li><a href="javascript:" class="'+ listclass +'">'+i+'</a></li>'
				};
			
			var _width = opts.width[opts.i] || 0;

					
			$('body').append('<div class="fui-guide-grid" style="width:'+(w+range*2+_width)+'px;height:'+(h+range*2)+'px;left:'+(offset.left-2-range)+'px;top:'+(offset.top-2-range)+'px"></div>');

			parentWindow.append('<div class="'+opts.contentClass+' '+opts.conStepClass[opts.i]+'" style="left:'+(winOffset.left + offset.left + left)+'px;top:'+(winOffset.top + offset.top + top)+'px"><ul class="guide-list">'+list+'<li><input type="checkbox" id="js-isDisplay" class="checkbox ml10" /><label for="js-isDisplay">不再显示</label></li></ul><a class="guide-next" href="javascript:"></a><a  class="guide-close" href="javascript:"></a></div>');
			
			var $guideBox = $('div.fui-guide-grid');
			parentWindow.find('.guide-list').delegate('a', 'click', function() {
				var i = $(this).parent().index();
				var n = parentWindow.children('.'+opts.contentClass).find('.active').parent().index();
				// console.log(n)
				if(i != n){
					$(this).addClass('active').parent().siblings().children().removeClass('active');
					$.guide.stepNum(i,$guideBox,parentWindow);
				}
			})
			// .delegate('a.guide-next','click.guidenext',function () {
			// 	$.guide.isChecked() ? $.guide.guideClose($guideBox,parentWindow) : $.guide.stepNum(1,$guideBox,parentWindow);
				
			// })
			parentWindow.find('a.guide-next').click(function(){
				$.guide.isChecked() ? $.guide.guideClose() : $.guide.stepNum(1,$guideBox,parentWindow);
			})
			// .delegate('a.guide-close', 'click.guideclose', function() {
			// 	this.isDisplay = $.guide.isChecked();
			// 	$.guide.guideClose($guideBox,parentWindow);
			// });
			parentWindow.find('a.guide-close').click(function(){
				$.guide.guideClose();
			});
			
	},
	// guideCon:[$('div.guide-content'),$('div.fui-guide-grid')],
	stepNum:function(i,box,win){
		var opts = this.opts;
		var $box = box,
			$win = win;
		var dialog = fwindow.widget(),
			dialogOffset = dialog.offset();
		var range = opts.range[i] || 0;
			//移除zindex提升的样式
			$(opts.item).each(function(){$(this).removeClass('guide-zindex')})
			// console.log(dialog)
			// opts.item[i || 0].removeClass('guide-zindex');
		var guideContent = win.find('.'+this.opts.contentClass);
		var obj = opts.item[i];
		var objOffset = obj.offset();
			//白框动画
		var _width = opts.width[i] || 0;
		box.stop().animate({left: (objOffset.left-2 -range), top: (objOffset.top-2-range),width:100,height:40}, 200,function () {
			box.animate({width:(obj.outerWidth()+range*2+_width),height:(obj.outerHeight()+range*2)}, 300,function () {
			obj.addClass('guide-zindex');
		});

		guideContent.stop().animate({top:dialogOffset.top + objOffset.top + opts.conOffset[i].top , left:dialogOffset.left + objOffset.left + opts.conOffset[i].left}, 300,function(){

				win.undelegate(".guidenext");
				guideContent.attr('class',opts.contentClass+' '+opts.conStepClass[i])
				var next = guideContent.children('.guide-next');
				var list = guideContent.children('.guide-list');

				list.find('a').removeClass('active').eq(i).addClass('active')//控制圆点的当前状态


				i++;
				// console.log(i)
				// 需要先清除原先绑定事件再添加新的，避免重复执行
				 next.unbind().click(function(){
				 	i != opts.item.length && !$.guide.isChecked() ? $.guide.stepNum(i,$box,$win) : $.guide.guideClose()
				 
				 }) 
			})
		})
		// i++;

		// console.log($.guide.guideCon[0])
		// console.log(item)
	},
	guideClose:function(box,win){
		this.isDisplay = $.guide.isChecked();
		// win.find(".fui-overlay-guide").remove().end().find('.guide-content').remove();
		// box.remove();
		$(window.parent.document.body).find(".fui-overlay-guide").remove().end().find('.guide-content').remove();
		$('div.fui-guide-grid').remove();
		$('div.fui-overlay').remove();
		$(this.opts.item).each(function(){$(this).removeClass('guide-zindex')});
		$(this.opts.clearPotion).each(function(){$(this).removeAttr("style")});
		$(this.opts.clearScroll).removeAttr("style");
		// 勾选了“不在显示”，关闭引导页时,执行此方法
		this.isDisplay && this.opts.isDisplayCheckedFun();
	},
	isChecked:function(){
		var win = $(window.parent.document);
		var isChecked = win.find('#js-isDisplay')[0].checked
			return isChecked;
	},
	// 客服人员变动时,引导页位置调整
	// conOffset_left：内容框相对与聚焦框的偏移坐标style.left
	// guide_content_left：引导页位置style.left
	guideMove:function(conOffset_left,guide_content_left){
		// index：引导页内容框顺序
		var index = this.opts.item.length == 2 ? 1 : 0;
		this.opts.conOffset[index].left= conOffset_left;
		var parentWindow = $(window.parent.document.body);
		parentWindow.find('div.guide-content')[0].style.left = guide_content_left + "px";
	},
	isDisplay:false
	
}
})(jQuery);