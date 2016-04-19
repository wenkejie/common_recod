/**
 * IE6-7-8兼容placeholder
 * 需手动调用$('input').HandlePlaceholder();
 * @authors 罗建
 * @date    2014-04-17 20:57:40
 * @version v1.0.2
 * @modify 罗建2014-07-02 17:25:40
 * 修改记录：
 * <pre>
 * 1、HandlePlaceholder 方法中添加了return this; 将jQuery对象给返回出来,为了支持jQuery链式写法。
 * </pre>
 */
;
var _placeholderSupport = function() {
	var t = document.createElement("input");
	t.type = "text";
	return (typeof t.placeholder !== "undefined");
}();
(function($, _undefined) {

	$.fn.HandlePlaceholder = function() {
		if (!_placeholderSupport) {
			var $that = $(this);
			$that.each(function() {
				var curPlaceholder = this.getAttribute("placeholder");
				var val = this.value;
				
				if(curPlaceholder){
					if (!val) {
						this.value = curPlaceholder;
						this.setAttribute("old_color", this.style.color);
						this.style.color = "#c0c0c0";
					}
					
					var $self = $(this);
					$self.off('focus.placeholder').on('focus.placeholder',function(){
						this.style.color = this.getAttribute("old_color");
						if (this.value === curPlaceholder) {
							this.value = "";
						}
					}).off('blur.placeholder').on('blur.placeholder',function(){
						if (this.value === "") {
							this.style.color = "#c0c0c0";
							this.value = curPlaceholder;
						}
					});
				}
			});
		}
		return this;
	};

	$.fn.attrPlaceVal = function() {
		var $that = $(this);
		var curPlaceholder = $that.attr("placeholder");
		var val = $that.val();
		return curPlaceholder == val ? "" : val;
	};

})(jQuery);