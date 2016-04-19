/**
 * jquery.monthpicker
 * @author 罗建 2013-05-03
 * @date    2015-12-24 14:55:49
 * @version 1.0.0
 * @depends jquery-1.9.1.js jquery.ui.core.js jquery.ui.widget.js
 *          jquery.ui.mouse.js jquery.ui.draggable.js jquery.ui.resizable.js
 *          jquery.ui.position.js
 * @description 月份控件
 * 
 * @option 暂无介绍
 * 
 * @event 暂无介绍
 * 
 * @method 暂无介绍
 * 
 */
;
(function($) {
	$.fn.monthpicker = function(options) {
		var defaults = {
			Year: new Date().getFullYear(), //显示年
			SelectMonth: null, //选择日期
			SelectYear: null,
			zIndex:1200,
			maxYear:2100,
			format: "yyyy-MM",
			onSelect: function(m, year, month) {
				m.val(new Date(year, month - 1, 1).Format(options.format));
			}
		}
		var options = $.extend(defaults, options);

		PreYear = function(m) {
			options.Year = options.Year - 1;
			Draw(m);
		}
		NextYear = function(m) {
			if (options.Year < options.maxYear) {
				options.Year = options.Year + 1;
				Draw(m);
			}
			//        	if(options.Year === options.maxYear){
			//        		增加ui-state-disabled样式，暂时不加了
			//        	}
		}
		IsSame = function(d1, d2) {
			return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth());
		}
		Date.prototype.Format = function(fmt) { //author: meizz 
			var o = {
				"M+": this.getMonth() + 1, //月份 
				"d+": this.getDate(), //日 
				"h+": this.getHours(), //小时 
				"m+": this.getMinutes(), //分 
				"s+": this.getSeconds(), //秒 
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
				"S": this.getMilliseconds() //毫秒 
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		Draw = function(m) {
			$("#j-ui-monthpicker-div").remove();
			var datepicker_div = $('<div id="j-ui-monthpicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="z-index:'+options.zIndex+'"></div>');
			var header = $('<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"></div>');
			var pre = $('<a title="&lt;上年" class="ui-datepicker-prev ui-corner-all cur-p"><span class="ui-icon ui-icon-circle-triangle-w">&lt;上年</span></a>');
			var next = $('<a title="下年&gt;" class="ui-datepicker-next ui-corner-all cur-p"><span class="ui-icon ui-icon-circle-triangle-e">下年&gt;</span></a>')
			var year = '<div class="ui-datepicker-title"><span class="ui-datepicker-year">' + options.Year + '</span>年&nbsp;</div>';
			header.append(pre).append(next).append(year);
			pre.click(function() {
				PreYear(m);
			});
			next.click(function() {
				NextYear(m);
			});
			var sarr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
			var iarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			var table = $('<table class="ui-datepicker-calendar"></table>');
			while (sarr.length) {
				var row = $("<tr></tr>");
				for (var i = 1; i <= 3; i++) {
					if (sarr.length) {
						var cell = $("<td></td>");
						var a = $('<a class="ui-state-default cur-p"></a>');
						var d = sarr.shift();
						var ia = iarr.shift();
						if (d) {
							a.html(d);
							a.attr("title", ia);
							var on = new Date(options.Year, ia - 1, 1);
							//判断是否今月
							//IsSame(on, new Date()) && a.addClass("ui-state-highlight");
							//判断是否选择日期
							options.SelectYear && options.SelectMonth && IsSame(on, new Date(options.SelectYear, options.SelectMonth - 1, 1)) && a.addClass("ui-state-active");
						}
						a.click(function() {
							var month = $(this).attr("title");
							options.SelectMonth = parseInt(month);
							options.SelectYear = options.Year;
							options.onSelect(m, options.SelectYear, options.SelectMonth);
							datepicker_div.remove();
						});
						cell.append(a);
						row.append(cell);
					}
				}
				table.append(row);
			}
			var of = m.offset();
			var left = of.left;
			var top = of.top + m.outerHeight() + 2;
			datepicker_div.append(header).append(table);
			datepicker_div.show();
			datepicker_div.css("top", top);
			datepicker_div.css("left", left);
			datepicker_div.css("position", "absolute");
			$("body").append(datepicker_div);
		}

		this.each(function() {
			var dom = this;
			var $This = $(this);
			$This.addClass("jg-monthpicker");
			$(this).focus(function() {
				Draw($This);
				$("#j-ui-monthpicker-div").show();

				var $doc = $(document);
				var docClk = function(e) {
					var _target = e.target;
					if (dom !== _target && _target.id !== 'j-ui-monthpicker-div' &&
						!$(_target).parents('#j-ui-monthpicker-div').length) {
						$("#j-ui-monthpicker-div").remove();
						$doc.off('click.month', docClk);
					}
				}
				$doc.off('click.month', docClk).on('click.month', docClk);
			});
		});

		return this;
	};
})(jQuery);