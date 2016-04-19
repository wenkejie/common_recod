/**
 * @version 1.0.0
 * @author 罗建 2013-09-13
 * @depends jquery-1.9.1.js 
 * @description 弹出确认框
 * 
 * @option height : 150                                          弹出确认框的高度
 * @option width : 400                                           弹出确认框的宽度
 * @option resizeable : false
 * @option maxable : false
 * @option title : "提示"
 * @option content : ""
 * @option okFun:function(){}									 按钮的回调方法
 */
;(function($){
	$.confirm = { opts:null,
		create:function (options) {
			var defaults = {
					height : 150,
					width : 400,
					resizeable : false,
					maxable : false,
					title : "确认框",
					content : ""
			}
			this.opts = $.extend({},defaults,options);
		},
		show:function(){
			var options = $.confirm.opts;
			var htmlWin =  top.fwindow.create(
				/*{
				title : options.title,
				content : options.content,
				resizeable : options.resizeable,
				maxable : options.maxable,
				height : options.height,
				width : options.width,
				}*/
					$.confirm.opts
				);
			htmlWin.fwindow("widget").find(".fui-btn-dialog-primary").click(function(){
				$.confirm.opts.okFun && $.confirm.opts.okFun.apply(this,[true]);
				htmlWin.fwindow("close");
				return false;
			});
			htmlWin.fwindow("widget").find(".fui-btn-dialog").click(function(){
				$.confirm.opts.okFun && $.confirm.opts.okFun.apply(this,[false]);
				htmlWin.fwindow("close");
				return false;
			});
		}
	};
})(jQuery);
