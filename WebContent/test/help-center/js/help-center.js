

$(function () {

	//placeholder IE8；实现placeholder在ie浏览器上的兼容
	var _placeholderSupport = function() {
	    var t = document.createElement("input");
	    t.type = "text";
	    return (typeof t.placeholder !== "undefined");
	}();

	window.onload = function() {
	    var arrInputs = document.getElementsByTagName("input");
	    for (var i = 0; i < arrInputs.length; i++) {
	        var curInput = arrInputs[i];
	        if (!curInput.type || curInput.type == "" || curInput.type == "text")
	            HandlePlaceholder(curInput);
	    }
	};
	 
	function HandlePlaceholder(oTextbox) {
	    if (!_placeholderSupport) {
	        var curPlaceholder = oTextbox.getAttribute("placeholder");
	        if (curPlaceholder && curPlaceholder.length > 0) {
	            oTextbox.value = curPlaceholder;
	            oTextbox.setAttribute("old_color", oTextbox.style.color);
	            oTextbox.style.color = "#c0c0c0";
	            oTextbox.onfocus = function() {
	                this.style.color = this.getAttribute("old_color");
	                if (this.value === curPlaceholder)
	                    this.value = "";
	            };
	            oTextbox.onblur = function() {
	                if (this.value === "") {
	                    this.style.color = "#c0c0c0";
	                    this.value = curPlaceholder;
	                }
	            }
	        }
	    }
	}





})

