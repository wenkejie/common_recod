// ====================================================
// ================== 运价互联，管理界面 ===============
// ================== by,evan =========================
// ====================================================


$(function() {

	var $filterBTn = $('a.unicom-filter-btn');//新增下拉的过滤按钮
	var $checkPact = $('label.j-checkPact');//新增下拉的过滤按钮
	var $tabMenu = $('div.new-tab-menu-cell');
	var $tabCnt = $('div.new-tab-cnt');
	var isIe6 = /MSIE 6./i.test(navigator.userAgent);
	var isie7 = /MSIE 7./i.test(navigator.userAgent);
	var $bdwidth = $('body').width();
	
	// var $delLink = $('a.unicom-detail-link');

	if (isie7) {
		$('div.unicom-header').width($bdwidth);
	};

	var tipShow = function(a) {
		if (isie7) {
			a.parent().parent().parent().addClass('zindex-up');
		};
		$('div.nui-waterfall-item').removeClass('zindex-up');
		a.parents('div.nui-waterfall-item').addClass('zindex-up');
		a.parent().children('div.nui-tips-setup').removeClass('none');
	}

	var tipHide = function(a) {
		if (isie7) {
			a.parent().parent().parent().removeClass('zindex-up');
		};
		a.parents('div.nui-waterfall-item').removeClass('zindex-up');
		a.parent().children('div.nui-tips-setup').addClass('none');
	}

	$("div.waterfall-item-footer").on('click', 'a.waterfall-item-btn', function() {
		$('div.nui-tips-setup').addClass('none');
		$(this).addClass('waterfall-item-btn-active');
		tipShow($(this));
	});

	// $tabMenu.each(function(){

	// });
	$.each($tabMenu, function(indexS) {
		$(this).click(function() {
			var index = indexS;
			$tabMenu.removeClass("new-tab-menu-active");
			$(this).addClass('new-tab-menu-active');
			$tabCnt.addClass('none').eq(index).removeClass('none');
			// alert(index);
		});
	});

	$('a.j-addPartner').click(function() {
		$(this).parent().children('div.unicom-add-dropdown').removeClass('none');
		// if (isIe6) {
		// 	$(this).parent().addClass('zindex-up');
		// }
	});

	$filterBTn.click(function() {
		$filterBTn.removeClass('unicom-filter-active');
		$(this).addClass('unicom-filter-active');
	});
	
	// $checkPact.click(function() {
	// 	var $checkValue = $(this).children('checkPa');
	// 	alert($checkValue);
	// });
	
	$('div.j-count').hover(function() {
		$(this).parent().parent().addClass('zindex-up');
		$(this).children('div.nui-tips-freight-num').removeClass('none');
	}, function() {
		$(this).parent().parent().removeClass('zindex-up');
		$(this).children('div.nui-tips-freight-num').addClass('none');
	});

	$('table.result-table').on('click', 'a.unicom-detail-link', function() {
		var $nextExtend = $(this).parents('tbody.result-table-wrap').children('tr.result-table-extend');
		if ($(this).hasClass('show')) {
			$(this).removeClass('show');
			$(this).children('i').html('&#xe609;');
			$nextExtend.addClass('none');
		}else{
			$nextExtend.removeClass('none');
			$(this).addClass('show');
			$(this).children('i').html('&#xe608;');
		};
	});

	var $searchTab = $('li.search-tab-cell');
	// var $searchCnt = $('div.unicom-search-content');
	var $searchCnt = $('div.search-tab-cnt');
	var $searchSld = $('div.unicom-search-slidedown');

	$searchTab.click(function() {
		var index = $(this).index();
		$searchTab.removeClass('search-tab-current');
		$(this).addClass('search-tab-current');
		$searchCnt.hide().eq(index).show();
		$searchSld.addClass('none');
		$('div.j-slidedown').removeClass('psr');
	});



	$('div.j-slidedown').click(function() {
		$(this).addClass('psr').addClass('zindex-up');
		$(this).children('div.unicom-search-slidedown').removeClass('none');
		
	});
	// $('div.j-more').click(function() {
	// 	var index = $(this).index();
	// 	// console.log(index);
	// 	$(this).parent().parent().addClass('psr');
	// 	$(this).parent().parent().children('div.search-slidedown-container').children('div.unicom-search-slidedown').addClass('none').eq(index).removeClass('none');
	// })

	//数组写入
	var areas = ["东欧","西欧","北美","南美","东南亚","东欧","西欧","北美","南美","东南亚","东欧","西欧","北美","南美","东南亚","东欧","西欧","北美"];
	var routes = ["宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼","宁波-悉尼"];
	var cps = ["APL","ANL","CNC","APL","ANL","CNC","APL","ANL","CNC","APL","ANL","CNC","APL","ANL","CNC","APL","ANL","CNC"]; 
	var cpnames = ["奥林科技有限公司","奥林科技有限公司","奥林科技有限公司","奥林科技有限公司","奥林科技有限公司","奥林科技有限公司","奥林科技有限公司"];

	$('div.search-input-area').click(function(){
		var ul = $(this).parent().parent().children('div.unicom-search-slidedown').children('ul');
		ul.empty();
		if($(this).hasClass('j-area')){
			ul.addClass('jj-area').removeClass('jj-route').removeClass('jj-cp').removeClass('jj-cpname');
			for(i=0;i<areas.length;i++){
				var arr_val = areas[i];
				ul.append("<li class='route-list-cell'>"+"<a class='route-list-link' href='javascript:'>"+ arr_val+ "</a>" +"</li>");
			}
		}else if($(this).hasClass('j-cpname')){
			ul.addClass('jj-cpname').removeClass('jj-route').removeClass('jj-area').removeClass('jj-cp');
			for(i=0;i<cpnames.length;i++){
				var arr_val = cpnames[i];
				ul.append("<li class='route-list-cell'>"+"<a class='route-list-link' href='javascript:'>"+ arr_val+ "</a>" +"</li>");
			}
		}else if($(this).hasClass('j-route')){
			ul.addClass('jj-route').removeClass('jj-area').removeClass('jj-cp').removeClass('jj-cpname');
			for(i=0;i<routes.length;i++){
				var arr_val = routes[i];
				ul.append("<li class='route-list-cell'>"+"<a class='route-list-link' href='javascript:'>"+ arr_val+ "</a>" +"</li>");
			}
		}else{
			ul.addClass('jj-cp').removeClass('jj-area').removeClass('jj-route').removeClass('jj-cpname');
			for(i=0;i<cps.length;i++){
				var arr_val = cps[i];
				ul.append("<li class='route-list-cell'>"+"<a class='route-list-link' href='javascript:'>"+ arr_val+ "</a>" +"</li>");
			}
		}
	})
	$('ul.route-list').delegate('a.route-list-link', 'click', function() {
		var _val = $(this).text();
		var ul = $(this).parent().parent();
		var searcharea = $(this).parent().parent().parent().parent().children('div.unicom-search-area');
		if(ul.hasClass('jj-area')){
			searcharea.children('div.j-area').children('input').val(_val);
		}else if(ul.hasClass('jj-cpname')){
			searcharea.children('div.j-cpname').children('input').val(_val);
		}else if(ul.hasClass('jj-route')){
			searcharea.children('div.j-route').children('input').val(_val);
		}else{
			searcharea.children('div.j-cp').children('input').val(_val);
		}
	})

	$('table.unicom-search-list').delegate('i.icon-more-tips', 'click', function() {
		var offset = $(this).offset();
		$('div.nui-tips').css({
			'left': offset.left-121,
			'top': offset.top+24
		});
		$('div.nui-tips').removeClass('none');
		return false;
	});

	$('table.search-list-supervise')
	.on('mouseenter', 'ul.slide-down-menu', function() {
		$(this).addClass('slide-down-menu-hover').find('li').addClass('block').end().find('s').addClass('hide');
	})
	.on('mouseleave', 'ul.slide-down-menu', function() {
		$(this).removeClass('slide-down-menu-hover').find('li').removeClass('block').end().find('s').removeClass('hide');
	})
	.on('mouseenter', 'div.filter-drop-area', function() {
		$(this).children('a.filter-drop').addClass('filter-drop-hover');
		$(this).children('.nui-drop-list-filter').removeClass('none');
	})
	.on('mouseleave', 'div.filter-drop-area', function() {
		$(this).children('a.filter-drop').removeClass('filter-drop-hover');
		$(this).children('.nui-drop-list-filter').addClass('none');
	})
	.on('click', 'a.j-filter-status', function() {
		var $status = $(this).text();
		$('a.filter-drop').children('span').text($status);
		$('a.filter-drop').removeClass('filter-drop-hover');
		$(this).parents('.nui-drop-list').addClass('none');
	}).on('click', 'a.j-filter-all', function() {
		$('a.filter-drop').children('span').text("互联状态");
	});

	$('div.fliter-tags').on('click', 'a.nui-btn', function() {
		$('a.nui-btn').removeClass('nui-btn-primary');
		$(this).addClass('nui-btn-primary')
		/* Act on the event */
	});

	$('div.unicom-header').on('click', 'div.j-hy-sd', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').children('a.tab-dropdown-link').removeClass('active');
			$(this).children('ul.history-list').addClass('none');
			$(this).children('a.tab-dropdown-link').children('i').html('&#xe61d;');
		}else{
			$(this).addClass('active').children('a.tab-dropdown-link').addClass('active');
			$(this).children('ul.history-list').removeClass('none');
			$(this).children('a.tab-dropdown-link').children('i').html('&#xe61c;');
		};
		
	});

	$('a.j-history-return').mouseenter(function() {
		$(this).html('再次添加');
	}).mouseleave(function() {
		$(this).html('<i>&#x35a6;</i>');
	});

	$('div.wrap').on('mouseenter', '.j-talking-hover', function() {
		var talkg = $(this).children('ul.talking-corner-group');
		var witemc = $(this).parents('div.waterfall-item-cnt');
		var witem = $(this).parents('div.nui-waterfall-item');
		var unicomc = $(this).parent('div.unicom-header-cnt');

		talkg.removeClass('none');
		witemc.addClass('zindex-up');
		witem.addClass('zindex-up');
		unicomc.addClass('zindex-up');
		$(this).parent().addClass('zindex-up');
	}).on('mouseleave', '.j-talking-hover', function() {
		var talkg = $(this).children('ul.talking-corner-group');
		var witemc = $(this).parents('div.waterfall-item-cnt');
		var witem = $(this).parents('div.nui-waterfall-item');
		var unicomc = $(this).parent('div.unicom-header-cnt');

		talkg.addClass('none');
		witemc.removeClass('zindex-up');
		witem.removeClass('zindex-up');
		unicomc.removeClass('zindex-up');
		$(this).parent().removeClass('zindex-up');
	});

})