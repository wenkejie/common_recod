

$(function () {
	var $hg = document.documentElement.clientHeight;
	var $bhg = document.body.clientHeight;

	if ($bhg < $hg) {
		var $h = $hg - 252;
		$("div.wrap-content").height($h);
	};


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



//下拉按钮显示
	$("div.form-line").delegate("div.form-select-btn", "click", function(){
		$(this).find('ul.slide-down-menu').removeClass('none');
		$("div.form-line").removeClass('zindex-up');
		$(this).parent().addClass('zindex-up');
		return false;		
		})

	$("div.form-select-btn").delegate("a.slide-down-link", "click", function(){
		$(this).parents('div.form-select-btn').find('span').text($(this).text());
		$(this).parent().parent().addClass('none');
		return false;//阻止冒泡
	})//下拉选项点击

		$("#jOpenWin").click(function() {

			var top = 250;  
   			var $bh = $(document).height();
			var scrollTop = $(document).scrollTop();   
  	

			if (/MSIE 6./i.test(navigator.userAgent)) {
				$('div.open-win').css( {
					'top' : top+scrollTop

				});
				$("div.open-shadow").height($bh);
			}else{
				$('div.open-win').css( {
					'top' : top

				});
			};

			$("div.open-win").removeClass('none');
			$("div.open-shadow").removeClass('none');
			

		});

		$("a.open-win-btn").click(function() {
			$("div.open-win").addClass('none');
			$("div.open-shadow").addClass('none');
		});
		$("#jCloseWin").click(function() {
			$("div.open-win").addClass('none');
			$("div.open-shadow").addClass('none');
		});


		// $(document).click(function() {
		// 	$('div.form-list').find('ul.input-form-list').hide();
		// 	$('div.form-list-thr').find('ul.input-form-list').hide();	
		// });

		$('div.j-focusin').click(function() {
			$('div.j-focusin').removeClass('form-input-focusin');
			$(this).addClass('form-input-focusin');
			$(this).children('input.inputer').focus();
			$(this).children('textarea.textareaer').focus();
		})


		var isIe6 = /MSIE 6./i.test(navigator.userAgent);
		if (isIe6) {
			$('div.j-focusin').mouseenter(function() {
				$(this).addClass('form-input-hover');
			}).mouseleave(function() {
				$(this).removeClass('form-input-hover');
			});

			$("#jPhoneV").click(function() {
				$(this).addClass('none');
				$('div.count-down-box').removeClass('none');
			});

		};

		


})

