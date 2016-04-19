// 订单页面
$(function(){
	$('a.search-more').click(function(){
		var $search_primary = $(this).siblings('.search-area-wrap').children('.search-area-primary');
		var $search_adv = $(this).siblings('.search-area-wrap').children('.search-area-adv');
		if($search_adv.is(":hidden")){
			$search_primary.hide();
			$search_adv.show();
			$(this).html('收缩'+'<i class="iconfont vam ml5">'+'&#xe61c;'+'</i>');
		}else{
			$search_primary.show();
			$search_adv.hide();
			$(this).html('高级搜索'+'<i class="iconfont vam ml5">'+'&#xe61d;'+'</i>');
		}
	})
	// 投标页底部按钮固定
	$(window).scroll(function (){
		var $fix_box = $('div.bottom-operation-box');
		if ($(document).height() - $(document).scrollTop() - $(window).height() <= 108) {
			$fix_box.removeClass('bottom-operation-box-fixed');
		}else{
			$fix_box.addClass('bottom-operation-box-fixed');
		};
		return false;
	})	
	// 下拉列表
	$('body').delegate('div.nui-select', 'click', function() {
		var that = $(this);
		var $drapDown = $(this).find('div.nui-drop-down');
		var other_select = $(this).parents('tr').siblings().find('div.nui-select');
		var $other_drapDown = $(this).parents('tr').siblings().find('div.nui-drop-down');
		$('div.nui-select').removeClass('zindex-up').find('div.nui-drop-down').hide();//所有下拉重置

		if($drapDown.is(":hidden")){
			$drapDown.show();
			that.addClass('zindex-up');
			$other_drapDown.hide();
			other_select.removeClass('zindex-up');
		} else{
			$drapDown.hide();
			that.removeClass('zindex-up');
		}
		$(this).delegate('li.nui-select-list-li', 'click', function() {
			var val = $(this).text();
			$drapDown.hide();
			that.find('input').val(val);
			that.removeClass('zindex-up');
			return false;
		});
		return false;
	});
	$('document,body').click(function(){
		$('div.nui-select').removeClass('zindex-up').find('div.nui-drop-down').hide();
	})
	// 招标详情页附加费下拉
	$('body').delegate('.surcharge-link','click',function(){
		var $surcharge_drapdowm = $(this).siblings('.surcharge-dropdown');
		var $surcharge_drapdowm_other = $(this).parents('tr').siblings().find('.surcharge-dropdown');
		if($surcharge_drapdowm.is(":hidden")){
			$surcharge_drapdowm.show();
			$surcharge_drapdowm_other.hide();
		}else{
			$surcharge_drapdowm.hide();
		}
	})
	$('body').delegate('.surcharge-dropdown','click',function(){
		$(this).hide();
	})
	 // 初始化Web Uploader
    uploader = WebUploader.create({

        // 自动上传。
        auto: false,

        // swf文件路径
        swf: './' + 'webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'http://webuploader.duapp.com/server/fileupload.php',
        fileNumLimit : 1,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        // pick: '#filePicker',
        pick: {
            id: '#picker',
            multiple: false
        },
        
	});
})
