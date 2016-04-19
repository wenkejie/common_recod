/**
 * @version 1.0.0
 * @author 史磊 2013-05-09
 * @depends jquery-1.9.1.js jquery.ui.core.js jquery.ui.widget.js
 *          jquery.ui.position.js
 * @description 高级查询
 * 
 * @option max = 4 最大可添加的项数
 * @option width = 200 控件总宽
 * @option delay = 300 高级查询鼠标进入和移出都延迟一小段时间触发。保证鼠标快速划过时不会触发。虽然开放了参数，通常不需要修改
 * @option items 选项[{text:'',title:'',name:'',binding:function(input){...}}]
 *         不支持动态改变
 * @option itemsSize =6 查询条件最多显示的项数，超过后显示滚动条 不支持动态改变
 * 
 * @event add = function(event,ui){...} 添加项后触发
 * @event delete = function(event,ui){...} 删除项后
 * @event changeItem = function(event,ui){...} 改变选择项后触发
 * 
 * @method add(itemName,itemValue,index);添加行
 * @method remove(index); 删除行，不传则删除全部
 * @method select(index,itemName,itemValue) ; 选中指定行的项，并且赋予默认值。
 * 
 */
;
(function($, _undefined) {

	function Core(widget) {
		var that = this;
		this.itemMap = {};

		this.addedWrap;/* 显示更多查询条件的div框，默认是隐藏的 */
		this.addedWrapShowTimout;/* 用于实现选项显示的延时控制 */
		this.isAddedWrapOpen = false;/* 更多查询条件是否打开 */

		this.numWrap;/* 显示当前选项个数的div框，默认是隐藏的，大于1时显示 */
		this.addButton;/* 添加行的按钮，项数达到max后变灰 */
		this.itemNameWidth;/* 查询条件名下拉框的宽度 */
		this.count = 0;/* 项数 */

		this.init = function() {
			/* 将items放入map中提高后续功能根据name得到item数据的效率 */
			$(widget.options.items).each(function(i, item) {
				that.itemMap[item.name] = item;
			});

			widget.element.addClass("fui-adv-search-con").empty().append("<div class='fui-condition-input-added none'></div><div class='search-num none'></div>");
			/* 常用变量赋值 */
			this.addedWrap = widget.element.children("div.fui-condition-input-added");
			this.numWrap = widget.element.children("div.search-num");
			this.addButton = $("<a class='adv-search-add' href='javascript:'></a>");
			this.addRow();
			this.addButton.appendTo(widget.element.children("div.fui-condition-input"));

			this.width(widget.options.width);

			/* 事件绑定 */
			widget.element.bind("mouseenter.fsearch", function(event) {
				that.addedWrapShowTimout = setTimeout(function() {
					that.addedWrapOpen();
				}, widget.options.delay);
			}).bind("mouseleave.fsearch", function(event) {
				clearTimeout(that.addedWrapShowTimout);
			}).bind("click.fsearch", function(event) {
				/* 防止触发 document的 click 事件，而关闭了更多查询条件 */
				return false;
			}).delegate("div.fui-condition-input", {
				"click.fsearch" : function() {
					widget.element.addClass("zindex-up");
					$(this).addClass("zindex-up");
				},
				"mouseleave.fsearch" : function() {
					widget.element.removeClass("zindex-up");
					$(this).removeClass("zindex-up");
					/* 截断时间冒泡 防止触发 widget.element 的mouseleave事件 */
					return false;
				}
			}).delegate("div.condition", {
				"click.fsearch" : function() {
					var div = $(this).children("div.fui-drop-down-con").show();

					/* 调整滚动条的位置 */
					var li = $(this).find("li.active");
					var index = $(this).find("li").index(li);
					if (div.height() + div.scrollTop() < index * 22 + 5 || div.scrollTop() > index * 22 + 22 + 5) {
						div.scrollTop(index * 22 + 11 + 5 - div.height() / 2);
					}
				}
			}).delegate("div.condition", "mouseleave.fsearch", function() {
				that.hideItemSelect($(this));
			}).delegate("li", {
				"click.fsearch" : function() {
					that.select($(this), $(this).attr("itemname"));

					/* 隐藏下拉选项 */
					that.hideItemSelect($(this).parent().parent().parent());

					/* 截断时间冒泡 防止触发 div.condition 的click事件 */
					return false;
				}
			}).delegate("a.adv-search-del", "click.fsearch", function() {
				that.remove($(this));
			}).delegate("a.adv-search-add", "click.fsearch", function() {
				that.addRow();
			});

			return this;
		};

		this.hideItemSelect = function(conditionDiv) {
			conditionDiv.children("div.fui-drop-down-con").hide();
		};

		this.addedWrapOpen = function() {
			if (!this.isAddedWrapOpen) {
				this.isAddedWrapOpen = true;

				this.addedWrap.show();
				this.numDisplay();

				$(document).one("click", function() {
					that.addedWrapClose();
				});
			}
		};
		this.addedWrapClose = function() {
			if (this.isAddedWrapOpen) {
				this.isAddedWrapOpen = false;

				this.addedWrap.hide();
				this.numDisplay();
			}
		};

		this.width = function(width) {
			widget.element.width(width);
		};

		/* 在指定位置添加一行 */
		this.addRow = function(itemName, itemValue, index) {
			if (this.count >= widget.options.max) {
				return null;
			}

			var wrap = $("<div class='fui-condition-input clearfix'></div>");
			if (this.count == 0) {
				widget.element.prepend(wrap);
			} else {
				this.addedWrap.append(wrap);
			}
			var html = "<div class='condition'><span class='condition-selected'></span><div class='fui-drop-down-con none zindex-up'><ul class='fui-select-list'>";
			$(widget.options.items).each(function(i, item) {
				html += "<li itemname='" + item.name + "'>" + item.text + "</li>";
			});
			html += "</ul></div></div><a class='adv-search-del' title='删除条件' href='javascript:'></a>";
			wrap.prepend(html);

			/* 控制是否出现滚动条 */
			if (widget.options.items.length > widget.options.itemsSize) {
				wrap.find("div.fui-drop-down-con").height(22 * widget.options.itemsSize + 10);
				wrap.find("div.fui-drop-down-con li").css("padding-right", "32px");
			}

			/* 保证下拉选项的宽度不小于下拉控件 */
			if (!this.itemNameWidth) {
				this.itemNameWidth = Math.max(wrap.find("div.condition").outerWidth() - 1, wrap.find("div.condition div.fui-drop-down-con").width());
			}
			wrap.find("div.condition div.fui-drop-down-con").width(this.itemNameWidth);

			this.count++;
			this.numWrap.html(this.count);
			this.addButtonToggle();
			var ipt = this.select(index, itemName, itemValue);
			widget._trigger("add", null, {
				wrap : wrap
			});
			return ipt;
		};
		this.addButtonToggle = function() {
			if (this.count >= widget.options.max) {
				this.addButton.addClass("adv-search-add-disable");
			} else {
				this.addButton.removeClass("adv-search-add-disable");
			}
		};
		/* 为指定行选择查询项，并赋值 */
		this.select = function(index, itemName, itemValue) {
			/* 没有明确指定顺序的，默认为最后一个 */
			if (index != 0) {
				index = index || this.count - 1;
			}
			var wrap;
			if (typeof index == "number") {
				wrap = widget.element.find("div.fui-condition-input:eq(" + Math.min(index, this.count - 1) + ")");
			} else {
				/* 非数字时，直接传查询行或者行内的一个元素 */
				if (index.is("div.fui-condition-input")) {
					wrap = index;
				} else {
					wrap = index.closest("div.fui-condition-input");
				}
			}

			var span = wrap.find("span.condition-selected");
			span.removeAttr("title");

			/* 当选择了一个查询项后，只保留选项，删除按钮，添加按钮。其他元素均删除 。 */
			span.parent().siblings(":not(a.adv-search-del,a.adv-search-add)").remove();
			/* 第二次remove是防止其中的内容用到了ui控件，出现的一些异常情况。例如fselect在remove的时候会把div里的input移出来，结果造成删除不彻底的情况 */
			span.parent().siblings(":not(a.adv-search-del,a.adv-search-add)").remove();

			var item = that.itemMap[itemName];
			var input, name;
			if (item) {
				name = item.name;
				span.html(item.text);
				if (item.title) {
					span.attr("title", item.title);
				}
				input = $("<input class='adv-search-input' type='text' name='" + name + "'/>").insertAfter(span.parent());
				input.val(itemValue);
				if ($.isFunction(item.binding)) {
					item.binding.call(widget.element, input);
				}
			} else {
				input = $("<input class='adv-search-input' type='text'/>");
				span.html("选择条件").parent().after(input);
			}

			/* 选项与原来的值发生变化时触发 */
			var original = wrap.find("div.condition li.active").attr("itemname");
			if (original != name) {
				/* 选中项 */
				wrap.find("div.condition li.active").removeClass("active");
				wrap.find("div.condition li[itemname=" + name + "]").addClass("active");

				widget._trigger("changeItem", null, {
					originalItemName : original,
					itemName : name,
					itemElement : input
				});
			}
			return input;
		};

		/* 在指定位置删除一行,如果index没传则删除全部。特殊控制如下：如果删除第一行则需要从下面补上一行。如果只剩下一行，只做行内容的清空 。 */
		this.remove = function(index) {
			if (index != _undefined) {
				var row, name;
				if (typeof index == "number") {
					row = widget.element.find("div.fui-condition-input:eq(" + Math.min(index, this.count - 1) + ")");
				} else {
					/* 非数字时，直接传查询行或者行内的一个元素 */
					if (index.is("div.fui-condition-input")) {
						row = index;
					} else {
						row = index.closest("div.fui-condition-input");
					}
				}
				name = row.children("input.adv-search-input").attr("name");
				/* 如果不是第一行则直接删除 */
				if (row.parent().is("div.fui-condition-input-added")) {
					row.remove();
				} else {
					/* 删除后从fui-condition-input-added中将第一个移上来 */
					row.after(this.addedWrap.children(":first")).remove();
				}
				this.count--;
				this.numWrap.html(this.count);
				this.addButtonToggle();

				widget._trigger("remove", null, {
					itemName : name
				});
				/* 全部删光的情况下自定加入一个 */
				if (widget.element.children("div.fui-condition-input").size() == 0) {
					this.addRow();
					this.numWrap.hide();
				}
				this.addButton.appendTo(widget.element.children("div.fui-condition-input"));
			} else {
				/* index没传则删除全部 */
				for ( var i = this.count - 1; i >= 0; i--) {
					this.remove(i);
				}
			}
		};

		/* 数量大于1且未展开的情况下需要显示数量，其他情况则隐藏 */
		this.numDisplay = function() {
			if (this.count > 1 && !this.isAddedWrapOpen) {
				this.numWrap.show();
			} else {
				this.numWrap.hide();
			}
		};

		this.destory = function() {
			this.addedWrap.remove();
			this.numWrap.remove();
			widget.element.unbind("mouseenter.fsearch mouseleave.fsearch click.fsearch").undelegate("div.fui-condition-input", "click.fsearch mouseleave.fsearch").undelegate(
					"div.condition", "click.fsearch").undelegate("div.condition", "mouseleave.fsearch").undelegate("li", "click.fsearch").undelegate("a.adv-search-del",
					"click.fsearch").undelegate("a.adv-search-add", "click.fsearch");
		};
	}

	$.widget("f.fsearch", {
		options : {
			_core : null,
			delay : 300,
			max : 4,
			width : 200,
			items : [],
			itemsSize : 6
		},
		_create : function() {
			var that = this;
			var options = that.options;

			options._core = new Core(that).init();
		},
		_destroy : function() {
			this.options._core.destory();
			this.options._core = null;
		},
		_setOptions : function(options) {
			var that = this;
			$.each(options, function(key, value) {
				that._setOption(key, value);
			});
		},
		_setOption : function(key, value) {
			this._super(key, value);
			switch (key) {
			case "width":
				this.options._core.width(value);
				break;
			case "max":
				this.options._core.addButtonToggle();
				break;
			}
		},
		add : function(itemName, itemValue, index) {
			this.options._core.addRow(itemName, itemValue, index);
			this.options._core.numDisplay();
		},
		remove : function(index) {
			this.options._core.remove(index);
		},
		select : function(index, itemName, itemValue) {
			this.options._core.select(index, itemName, itemValue);
		}
	});

})(jQuery);