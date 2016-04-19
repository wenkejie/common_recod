// ====================================================
// ===================== 规则设置界面 ==================
// ================== by,evan =========================
// ====================================================

$(function() {
	var $tag = $('div.unicom-tags-cell');
	$tag.hover(function() {
		$(this).addClass('unicom-tags-hover')
	}, function() {
		$(this).removeClass('unicom-tags-hover')
	});

	// $('.fui-adv-tab-list-cell').click(function() {
	// 	$(this).addClass('active');
	// 	$('.fui-adv-tab-list-cell').removeClass('active');
	// });

	jQuery.fn.tabchange = function(item, con) {
		var $tab = $(this);
		$tab.delegate(item, 'click', function() {
			var index = $(this).parent().index();
			$(this).addClass("active").parent().siblings().children().removeClass('active');
			$tab.find(con).addClass("none").eq(index).removeClass("none")
		})
	}

	var $advtab = $('div.fui-adv-tab');
	$('div.fui-tab').tabchange("a.fui-tab-list-cell:not('.disable')",'div.fui-tab-cnt');
	$advtab.tabchange('.fui-adv-tab-list-cell','div.fui-adv-tab-cnt');
	
})