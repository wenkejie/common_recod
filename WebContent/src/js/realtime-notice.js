/***
*实时通知
*add by 曹金彦,201407A
**/
$(function(){
	
	//实时通知周期请求对象
	var realtimeNoticeObj=null;
	//实时通知显示弹框的对象
	var showNoticeOjb = null;
	
	//实时通知请求后台的时间间隔
	var realtimeNoticeIntervalTime = 1000 * 60 * 5;
	//实时通知显示弹框的时间间隔
	var showNoticeIntervalTime;
	
	var notice;
	
	var $msgObj=null;//弹出框对象
	
	ajaxGetNotice();
	
	//周期性请求
	realtimeNoticeObj = setInterval(function(){
		ajaxGetNotice();
	}, realtimeNoticeIntervalTime);
	
	
	//异步请求
	function ajaxGetNotice(){
		$.ajax({
			url:"/cms/publicHelpNotification.ctrl?$action=getPublicLastestRealTimeNotice",
			async:true,
			cache:false,
			dataType:"json",
			success:function(data){
				//console.log(data);
				//{"dataMap":{"deltaT":60843114,"flag":"false"}} 
				//标志
				var flag=data.dataMap.flag;
				//时间差
				var deltaT=data.dataMap.deltaT;
				
				showNoticeIntervalTime=deltaT;

				if(flag == "true"){
					notice = data.dataMap.noticeVO;
					
					delayShowNotice();
				}
			}
		});
	}
	
	//延时消息弹框
	function delayShowNotice() {
		if(showNoticeOjb){
			clearTimeout(showNoticeOjb);
		}
		
		showNoticeOjb = setTimeout(function(){
			if(notice){
				var msg = notice.content;
				var title = notice.title;
				//显示通知信息
				showNotice(title,msg);
			}
		}, showNoticeIntervalTime);
	}
	
	
	//显示消息提示框
	function showNotice(title,msg){
		$msgObj = $("#j-nui-msg");
		if($msgObj==null || $msgObj == undefined || $msgObj.length==0){
			createNotice();
			$msgObj = $("#j-nui-msg");
		}
		
		var $title = $("#j-msg-body-title"),$msg = $("#j-msg-body-summary");
		var m = msg;
		$msg.removeAttr("title");
		if(msg.length>50){
			m=msg.substring(0,50)+"...";
			$msg.attr("title",msg);
		}
		
		$title.removeAttr("title");
		if(title.length>15){
			$title.attr("title",title);
		}
		$title.empty().text(title);
		$msg.empty().text(m);
		
			
		$msgObj.addClass("none");
		$msgObj.removeClass("none");
		
		var fTop = $msgObj.offset().top;
		$(window).scroll( function() {
			var top = $(window).scrollTop() + fTop;
			var isIe6 = /MSIE 6./i.test(navigator.userAgent);
			if (isIe6) {
				$msgObj.animate({
					top: top
				},100);	
			};
		});
		
	}
	function createNotice(){
		/**
		 * <div class="nui-msg none" id="j-nui-msg">
				<div class="nui-msg-head">
					<h3 class="msg-head-info">消息公告</h3>
					<a class="msg-close" href="javascript:" id="j-msg-close">×</a>
				</div>
				<div class="nui-msg-body">
					<h3 class="msg-body-title msg-body-title-war toe" id="j-msg-body-title">6月30日 22:00 更新公告</h3>
					<div class="msg-body-summary" id="j-msg-body-summary">
						本次更新共计2小时，预计24点更新完毕，网站可以正常使用。
					</div>
				</div>	
			</div>
		 */
		var $content = $("<div class=\"nui-msg none\" id=\"j-nui-msg\">"+
		"<div class=\"nui-msg-head\">" +
			"<h3 class=\"msg-head-info\">消息公告</h3>" +
			"<a class=\"msg-close\" href=\"javascript:\" id=\"j-msg-close\">×</a>" +
		"</div>"+
		"<div class=\"nui-msg-body\">"+
			"<h3 class=\"msg-body-title msg-body-title-war toe\" id=\"j-msg-body-title\"></h3>"+
			"<div class=\"msg-body-summary\" id=\"j-msg-body-summary\"></div>"+
		"</div>	</div>");
		
		$("body").append($content);
				
	}
	//关闭提示框
	$("body").delegate("#j-msg-close","click",function(){
		$msgObj.addClass("none");
	});
});