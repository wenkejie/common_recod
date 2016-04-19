

$(function () {

	// $("div.form-list").click(function() {
	// 	console.log($(this));
	// 	$(this).find('ul.input-form-list').show();
	// });
	
	var $hg = document.documentElement.clientHeight;
	var $bhg = document.body.clientHeight;
	// var $bhg = $("div.body-content").height();
	// console.log($hg);
	// console.log($bhg);
	if ($bhg < $hg) {
		var $h = $hg - 252;
		console.log($h);
		$("div.body-content").height($h);
	};

	// console.log($("div.body-content").height());
	

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



			var $win = $("div.float-win"),
			$window = $(window),
			topPadding = 250;
			$window.scroll(function() {
				$win.stop().animate({
					top: $window.scrollTop() + topPadding
				});
			});
		})


		$(document).click(function() {
			$('div.form-list').find('ul.input-form-list').hide();
			$('div.form-list-thr').find('ul.input-form-list').hide();	
		});

})

