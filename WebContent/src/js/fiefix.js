/**
 * @version 1.0.0
 * @author 史磊 2013-05-29
 * @depends jquery-1.9.1.js
 * @description 各个空间在低版本ie中的兼容功能
 */
;
(function($, _undefined) {
	var ie6 = fc.ie6;
	var ie7 = fc.ie7;
	var ie8 = fc.ie8;

	//fc.ie67 = true;
	//ie6 = true;
	
	/* bgiframe */
	if (ie6) {
		(function(a) {
			a.fn.bgiframe = (ie6 ? function(d) {
				d = a.extend( {
					top : "auto",
					left : "auto",
					width : "auto",
					height : "auto",
					opacity : true,
					src : "javascript:false;"
				}, d);
				var c = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + d.src + '"style="display:block;position:absolute;z-index:-1;'
						+ (d.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:"
						+ (d.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : b(d.top)) + ";left:"
						+ (d.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : b(d.left)) + ";width:"
						+ (d.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : b(d.width)) + ";height:"
						+ (d.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : b(d.height)) + ';"/>';
				return this.each(function() {
					if (a(this).children("iframe.bgiframe").length === 0) {
						this.insertBefore(document.createElement(c), this.firstChild)
					}
				})
			} : function() {
				return this
			});
			a.fn.bgIframe = a.fn.bgiframe;
			function b(c) {
				return c && c.constructor === Number ? c + "px" : c
			}
		})($);
	}

	/**
	 * fwindow
	 * 
	 * @自适应尺寸的宽度需要自动计算 ie6
	 */
	if (fc.ie67) {
		var _fwindow = $.fn.fwindow;

		$.fn.fwindow = function(opt) {
			$.extend(opt, {
				_width : ie6 ? function(event, ui) {
					/* 只需要针对没有定义宽度的窗口做自适应宽度修正即可 */
					if (!ui.width) {
						var w = $(this).children(":eq(1)").width();
						$(this).width(w);
					}
				} : null,
				animate : false
			});
			var w = _fwindow.apply(this, arguments);
			if (ie6) {
				var overLay = $("div.fui-overlay-opa-0");
				var _overLayHeight = document.body.scrollHeight;
				//调整当页面内容未占满整个浏览器窗口高度时，遮罩未将页面底部遮住
				if(_overLayHeight < document.documentElement.clientHeight){
					_overLayHeight = document.documentElement.clientHeight;
				}
				overLay.height(_overLayHeight);
				if(overLay.children("div").length === 0){
					overLay.append("<div style='width:100%;height:100%;'></div>").bgiframe();	
				}
			}
			return w;
		};
	}

	/**
	 * fselect 在ie6中选项没有hover效果。 如果与原生的select公用是需要 bgiframe
	 */
	if (ie6) {

		var _fselect = $.fn.fselect;
		$.fn.fselect = function(opt) {
			$.extend(opt, {
				create : function(event, ui) {
					$(this).parent().delegate("li", {
						"mouseenter.fselect" : function() {
							$(this).addClass("hover");
						},
						"mouseleave.fselect" : function() {
							$(this).removeClass("hover");
						}
					}).find("div.fui-drop-down-con");// .bgiframe();
				}
			});

			return _fselect.apply(this, arguments);
		};
	}

	/**
	 * fsearch
	 * 
	 * @选项没有hover效果。 ie6
	 * @fui-condition-input-added 需要定义宽度 ie6
	 * @fui-drop-down-con ie6,ie7 需要定义宽度
	 * 
	 */
	if (ie6 || ie7) {
		var _fsearch = $.fn.fsearch;
		var fixOpt = {};

		if (ie6) {
			fixOpt.create = function(event, ui) {
				/* hover效果 */
				$(this).delegate("div.condition li", {
					"mouseenter.fsearch" : function() {
						$(this).addClass("hover");
					},
					"mouseleave.fsearch" : function() {
						$(this).removeClass("hover");
					}
				});
			};

		}
		/* fui-drop-down-con的宽度固定100 */
		fixOpt.add = function(event, ui) {
			ui.wrap.find("div.condition div.fui-drop-down-con").width(100);
		};

		$.fn.fsearch = function(opt) {
			$.extend(opt, fixOpt);
			return _fsearch.apply(this, arguments);
		};
	}
})(jQuery);
