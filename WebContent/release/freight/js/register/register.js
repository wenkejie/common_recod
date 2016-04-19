

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



//下拉按钮显示
	$("div.fui-form-up-port").delegate("div.form-list", "click", function(){
		$(this).find('ul.input-form-list').show();
		// console.log($(this).next());
		// $(this).next().children().show();//提示框
		return false;		
		})



	$("div.form-list-thr").click(function() {
		// console.log($(this));
			$(this).find('ul.input-form-list').show();
		// console.log($(this).next());
		// $(this).next().children().show();//提示框
		return false;		
		})


  	$("div.form-list-thr").hover(function() {
  		$(this).addClass('border-mouserover');
  	}, function() {
  		$(this).removeClass('border-mouserover');
  	});



  	$("div.form-list").hover(function() {
  		// console.log("ccc");
  		$(this).addClass('border-mouserover');
  	}, function() {
  		$(this).removeClass('border-mouserover');
  	});

	

// 输入框效果
	// $(":input").hover(function() {
	// 	$(this).parent().addClass('border-mouserover');
	
	// }, function() {
	// 	$(this).parent().removeClass('border-mouserover');
	// });


	$("div.fui-form-up-port").delegate('input', 'mouseover', function() {
		$(this).parent().addClass('border-mouserover');
	
	})
	 $("div.fui-form-up-port").delegate('input', 'mouseleave', function() {
		$(this).parent().removeClass('border-mouserover');
	
	})//修改了输入框hover写法，by：Evan





	$("div.fui-form-up-port").delegate('input', 'focusin', function() {
	// $(":input").focusin(function() {

// console.log($(this));
//		$(this).parent().find('div.tips-com').show();//提示框
//		$(this).parent().parent().find('div.tips-com').show();
		// $(this).data('key', $(this).val());

		// 	$(this).val("");
		
		// console.log($(this).val());
		$(this).parent().addClass('input-form-change-focusin');

	})

	$("div.fui-form-up-port").delegate('input', 'blur', function() {
	// .blur(function() {
		// $(this).parent().find('div.tips-com').hide();//提示框隐藏
		// $(this).parent().parent().find('div.tips-com').hide();
		// if ($(this).val()) {

		// };
		// console.log($(this).data('key'));
		$v = $.trim($(this).val());
		if ($v == "") {
			$(this).val($(this).data('key'));	
		}else{

		};
		
		$(this).parent().removeClass('input-form-change-focusin');
	})//输入获焦点和失焦点写法有改动，by：Evan








	// $(":input").keyup( function() {
	// 	// console.log($(this).parent().children('ul.input-form-list-sec'));
 //  		$(this).parent().children('ul.input-form-list-sec').show();
 //  		$s = $.trim($(this).val());
 //  		if ($s == "") {
 //  			$(this).parent().children('ul.input-form-list-sec').hide();
 //  		};

	// });



	$(":input").keyup( function() {


		var $t = $(this).parent().children('ul.input-form-list-sec')
		// var $t = $(this).parent().children('ul.input-form-list-sec').html("");

		var $s = $.trim($(this).val());
		// $t.show();
		var $txt = ["大掌柜国际物流有限公司","宁波九龙国际物流有限公司",
		"宁波外代新华有限公司","宁波节流物流有限公司","宁波华茂股份有限公司",
		"宁波中基股份有限公司","宁波奥利奥货代有限公司"];
		var $html = "";
		var $i = 0;
		// console.log($s.indexOf("宁波"));
		if ($s == "") {
			$("div.tips-war").hide();
			$t.hide();
			}else{

					$.each($txt,function(i, val) {


						if (val.indexOf($s) >= 0) {
							
							// console.log($txt.indexOf($s) >= 0);
							// $t.children().children('a.list-font').text(val);
								$html +='<li><a class="list-font" href="javascript:">'+$txt[i]+'</a></li>';
								// console.log($html);

								// console.log(i+"||"+$txt.length-1)
								// if(i == $txt.length-1){
								// 	// alert(1)
								// 	// console.log($html);
								// 	$t.append($html).show();
								// 	return false;
								// }
								$i++;
							}
							$t.html("");
							$t.append($html).show();
						
					});

					if ($i == 0) {

						$("div.tips-war").show();
						$t.hide();
					};

			};
	  		// if ($s == 0) {
	  		// 	$(this).parent().children('ul.input-form-list-sec').hide();
	  		// };

	  		
	});



	$("input.input-emile").keyup( function() {
		// console.log("----");
  		$(this).parent().find('ul.input-form-list-fir').show();
  		$s = $.trim($(this).val());

  		if ($s == 0) {
  			$(this).parent().find('ul.input-form-list-fir').hide();
  		}else{
  			// $v = $(this).val()+$("a.list-fir").text();
  			$("a.list-fir").text($s+"@126.com");
  			$("a.list-sec").text($s+"@163.com");
  			$("a.list-thr").text($s+"@qq.com");
  			$("a.list-fou").text($s+"@hotmail.com");
  			$("a.list-fif").text($s+"@gamile.com");
  			$("a.list-six").text($s+"@126.com");

  		};

  	});




	$("ul.input-form-list").delegate("li", "click", function(){
		// console.log("bbb");
		$(this).parent().parent().find('em').text($(this).text());//父级的前一个兄弟的文本被当前点击控件的文本替换
		$(this).parent().hide();
		// $(this).parent().parent().next().hide();
		// $(this).parent().parent().find(':input').text($(this).text());
		return false;//阻止冒泡
	})//下拉选项点击


  	$("ul.input-form-list-sec").delegate("li", "click", function(){
		// console.log($(this).parent().prev().prev());
		$(this).parent().prev().prev().val($(this).text());
		$(this).parent().prev().prev().prev().val($(this).text());//父级的前一个兄弟的文本被当前点击控件的文本替换
		$(this).parent().hide();
		// $(this).parent().parent().next().hide();
		// $(this).parent().parent().find(':input').text($(this).text());
		return false;//阻止冒泡
	})//下拉选项点击


	$("ul.input-form-list-fir").delegate("li", "click", function(){
		// console.log($(this).parent().prev().prev());
		$(this).parent().prev().prev().val($(this).text());
		$(this).parent().prev().prev().prev().val($(this).text());//父级的前一个兄弟的文本被当前点击控件的文本替换
		$(this).parent().hide();
		// $(this).parent().parent().next().hide();
		// $(this).parent().parent().find(':input').text($(this).text());
		return false;//阻止冒泡
	})//下拉选项点击


		$("div.input-form").mouseleave(function(){
		$(this).parent().find('ul.input-form-list-sec').hide(100);
		// $(this).next().children().show();//提示框		
		})//下拉显示

		$("div.add-input-form").mouseleave(function(){
		$(this).parent().find('ul.input-form-list-sec').hide(100);
		// $(this).next().children().show();//提示框		
		})//下拉显示



		// $("ul.input-form-list-sec").delegate("li", "click", function(){
		// $(this).
		// // console.log($(this).next());
		// // $(this).next().children().show();//提示框
		// 	return false;		
		// })

		

		$("a.add-form-list").click(function() {
			// console.log($(this));
			$("div.add-form").slideDown(200)
		});

		$("#jOpenWin").click(function() {

			// var top = ($(window).height() - $('div.open-win').height())/2;
			var top = 250;  
   			var $bh = $('body').height()
   			
			var scrollTop = $(document).scrollTop();   
  	

			if (/MSIE 6./i.test(navigator.userAgent)) {
				$('div.open-win').css( {
					'top' : top+scrollTop, 

				});
				
			}else{
				$('div.open-win').css( {
					'top' : top, 

				});
			};
			// $('div.open-win').css( {
			// 	 'top' : top+scrollTop, 
	
			//  } );  
			$("div.open-win").removeClass('none');
			$("div.open-shadow").removeClass('none');
			$("div.open-shadow").height($bh);

		});

		$("a.open-win-btn").click(function() {
			$("div.open-win").addClass('none');
			$("div.open-shadow").addClass('none');
		});
		$("#jCloseWin").click(function() {
			$("div.open-win").addClass('none');
			$("div.open-shadow").addClass('none');
		});


		$(document).click(function() {
			$('div.form-list').find('ul.input-form-list').hide();
			$('div.form-list-thr').find('ul.input-form-list').hide();	
		});

})

