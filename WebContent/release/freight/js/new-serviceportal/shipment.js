/**
 * @depends jquery-1.9.1.js
 * @description 船期查询页js
 */
$(function () {
	//$('.spinner').spinner({value:0,max : 5});

		// 下拉列表
		// $('.search-input-item').keydown(function(){
		// 	if($(this).next().hasClass('none')){	
		// 		$(this).next().removeClass('none');
		// 		$(this).parent().addClass('zindex-up');
		// 		$(this).parent().siblings().children('.j-list').addClass('none');
		// 		$(this).parent().siblings().removeClass('zindex-up');
		// 	}
		// })
	$('.search-input-item').click(function(){
		 this.select();
		 return false;//阻止事件document click 事件冒泡
	})
		// 承运人下拉列表
		$('.j-vessel-input').click(function(){
			if($(this).next().hasClass('none')){	
				$(this).next().removeClass('none');
				$(this).parent().addClass('zindex-up');
				$(this).parent().siblings().children('.j-list').addClass('none');
				$(this).parent().siblings().removeClass('zindex-up');
			}
			return false;//阻止事件document click 事件冒泡
		})
		//起始地目的地列表赋值
		$('.shipment-place-list').delegate('li','click',function(){
			var _val = $(this).text();
			// console.log($(this).parent().parent().children('input.search-input-item'));
			$(this).parent().parent().children('input.search-input-item').val(_val);
			$(this).parent().addClass('none');
			//选择港口后，实现查询
			querydate();
			return false;//阻止事件document click 事件冒泡
		})
		// =====================
		var arr = ["ALIANCA","ANL","APL","CMA","CNC","CSCL","COSCO","DELMAS","EMIRATES","EVERGREEN","HANJIN","HAMBURG SUD","HMM","HAPAG-LLOYD","K.LINE","MCC","MOL","MSC","MSK","NORASIA","NYK","PIL","SAFMARINE","UASC","WANHAI","YANGMING","ZIM"];
		// 全选
		$('.j-vessel-all').click(function(){
			arr = [];//清空数组
			$(this).addClass("vessel-btn-active").siblings().removeClass("vessel-btn-active");;
			$('.carrier-list li').addClass("carrier-list-item-active");
			$(this).parent().parent().parent().children('input').val("已选择27家承运人");
			$(".carrier-list li").each(function(){
				var $name_new = $(this).text();
				arr.push($name_new);
			})
			setcompanyval();//为船公司input赋值
			return false;//阻止事件document click 事件冒泡
		})
		// 全不选
		$('.j-vessel-none').click(function(){
			arr = [];//清空数组
			var $name = arr.toString();
			$(this).addClass("vessel-btn-active").siblings().removeClass("vessel-btn-active");
			$('.carrier-list li').removeClass("carrier-list-item-active");
			$(this).parent().parent().parent().children('input.search-input-item').val($name);
			setcompanyval();//为船公司input赋值
			return false;//阻止事件document click 事件冒泡
		})
		// 反选
		$('.j-vessel-reverse').click(function(){
			$(this).addClass("vessel-btn-active").siblings().removeClass("vessel-btn-active");
			arr = [];//清空数组
			$(".carrier-list li").each(function(){
				
				if($(this).hasClass('carrier-list-item-active')){
					$(this).removeClass("carrier-list-item-active")
				}else{
					$(this).addClass("carrier-list-item-active");
					var $name_new = $(this).text();
					arr.push($name_new);

					// var thisval = $(this).text();
					// _val += thisval+','; 
				}
			})
			var $name = arr.toString();
			// $(this).parent().parent().parent().children('input').val(_val);
			if(arr.length<=10){
				$(this).parent().parent().parent().children('input.search-input-item').val($name);
			}else{
				$(this).parent().parent().parent().children('input.search-input-item').val("已选择"+arr.length+"家承运人");
			}
			setcompanyval();//为船公司input赋值
			return false;//阻止事件document click 事件冒泡
		})
		//为船公司input赋值
		function setcompanyval(){
			var $name = arr.toString();
			$("input[name=company]").val($name);
		}
		// 关闭承运人菜单
		$('.vessel-btn').click(function(){
			$('.vessel-list-container').addClass('none');
			//关闭承运人菜单时，实现查询
			querydate();
			return false;//阻止事件document click 事件冒泡
		})
		// 选项样式改变、赋值
		$('.carrier-list').delegate('li','click',function(){
			// var $name_old = $(this).parent().parent().parent().children('input.search-input-item').val();
			var $name_new = $(this).text();
			// var $name_now = $name_old+$name_new+',';
			if($(this).hasClass("carrier-list-item-active")){
				$(this).removeClass("carrier-list-item-active");
				var len = arr.length;
				for(i=0;i<len;i++){
					if(arr[i] == $name_new){
						// console.log('11111');
						arr.splice(i, 1);
						break;
					}
				}

				var $name = arr.toString();
				if(arr.length<=10){
					$(this).parent().parent().parent().children('input.search-input-item').val($name);
				}else{
					$(this).parent().parent().parent().children('input.search-input-item').val("已选择"+arr.length+"家承运人");
				}	
			}else{
				$(this).addClass("carrier-list-item-active");
				arr.push($name_new);
				var $name = arr.toString();
				// $(this).parent().parent().parent().children('input.search-input-item').val($name_now);
				if(arr.length<=10){
					$(this).parent().parent().parent().children('input.search-input-item').val($name);
				}else{
					$(this).parent().parent().parent().children('input.search-input-item').val("已选择"+arr.length+"家承运人");
				}	
			}
			setcompanyval();//为船公司input赋值
			return false;//阻止事件document click 事件冒泡
		})
		// ========= end ================
		// 中转信息
		$('.gui-table-content').delegate('.detail-btn','click',function(){
			var $slide = $(this).parent().next()
			if($slide.hasClass('none')){
				$(this).children('i').html("&#xe603;");
				$slide.removeClass('none');
			}else{
				$(this).children('i').html("&#xe600;");
				$slide.addClass('none');
			}
			var $length = $slide.children('td').children('div').length;
			switch ($length){
				case 5:
 					$slide.children('td').addClass('gui-detail-five').removeClass('gui-detail-default,gui-detail-four,gui-detail-thr');
 					break;
				case 4:
 					$slide.children('td').addClass('gui-detail-four').removeClass('gui-detail-default,gui-detail-five,gui-detail-thr');
  					break;
				case 3:
					$slide.children('td').addClass('gui-detail-thr').removeClass('gui-detail-default,gui-detail-four,gui-detail-five');
  					break;
			}
		})
		/*// 起始地、目的地列表加入选项
		var citys = ["Caofeidian,China","Chiwan,Guangdong,China","Dalian,Liaoning,China","Foshan,China","Huanghua,China","Jiangyin,China"];
		$(function(){
			var ul = $("input.search-input-item").next('.shipment-place-list');
			for(i=0;i<citys.length;i++){
				var arr_val = citys[i];
				ul.append("<li>"+ arr_val+"</li>");
			}
		})*/	

		// 筛选控件操作
		/*$('.after_each_event').hideseek({
	    // hidden_mode: true,
	    //highlight: true,
	    //ignore_accents: true,
	    nodata: '没找到对应内容'
	  	}).on("_after", function() {
		      var  $thisLise = $(this).parent().children('ul.j-list');
		      var $list = $('ul.j-list');
		      changeUiHtml($(this));
		      if ($(this).val() == "") {
		        $thisLise.addClass('none');
		        $(this).parent().removeClass('zindex-up');
		      }else{
		        $list.addClass('none');
		        $thisLise.removeClass('none');
		        $(this).parent().addClass('zindex-up');
		      };
	  	});*/
		$('.after_each_event').keyup(function() {
		      var  $thisLise = $(this).parent().children('ul.j-list');
		      var $list = $('ul.j-list');
		      changeUiHtml($(this));
		      if ($(this).val() == "") {
		        $thisLise.addClass('none');
		        $(this).parent().removeClass('zindex-up');
		      }else{
		        $list.addClass('none');
		        $thisLise.removeClass('none');
		        $(this).parent().addClass('zindex-up');
		      };
		});
	
		
		//为起始港目的港动态赋值
		function changeUiHtml(obj){
			var inputval = $(obj).val().toUpperCase();
			var inputname = $(obj).attr("name");
			var listr = "";
			var portarry = [];
			if(inputname=="startport"){
				for(i=0;i<orginalcitys.length;i++){
					if(orginalcitys[i]){
						var cityobj = orginalcitys[i].toString();
						var arr_val = cityobj.toUpperCase();
						if(arr_val.indexOf(inputval)>-1 && portarry.length<20){
							portarry.push(orginalcitys[i])
						}
					}
				}
				$.each(portarry,function(n,obj){
					listr += "<li>"+ obj+"</li>";
				})
				$("#stportul").html(listr);
			}else if(inputname=="endport"){
				for(i=0;i<citysFlight.length;i++){
					if(citysFlight[i]){
						var cityobj = citysFlight[i].toString();
						var arr_val = cityobj.toUpperCase();
						if(arr_val.indexOf(inputval)>-1 && portarry.length<20){//每次只加载20个
							portarry.push(citysFlight[i])
						}
					}
				}
				$.each(portarry,function(n,obj){
					listr += "<li>"+ obj+"</li>";
				})
				$("#endportul").html(listr);
			}
		}
	  	
})
		// ========= end ==============