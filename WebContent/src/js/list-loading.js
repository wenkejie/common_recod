
/**
 * 
 *大数据操作：蒙板及进度条
 * 调用方法:
 * 		var listLoading = new operateDiv();
 * 		listLoading.init();
 * 对外提供方法:
 * 		listLoading.showDiv();
 * 		listLoading.hideDiv();
 * 
 * @author 戴凯
 * @date 2014-5-28
 * @version
 * @modify by 曹金彦
 * @modify date 2014-7-28
 * @desc 进度条显示时间超过3s，提示语为“您操作的数据过多，可能需要等待更多的时间”；超过30s，提示语为“我在努力工作中，请不要刷新或关闭”
 */

var operateDiv = function(){
	var inited = false;
	var overlay = null;
	var loading = null;
	var set3sTime = null;
	var set30sTime = null;
	
	this.showDiv = function(){
		if(!inited){
			this.init();
			inited = true;
		}
		$("#j-loading-info").text("数据加载中，请稍候...");
		overlay.show();
		loading.show();
		
		set3sTime = setTimeout(function(){
			$("#j-loading-info").text("您操作的数据过多，可能需要等待更多的时间");
		},3000);
		set30sTime = setTimeout(function(){
			$("#j-loading-info").text("我在努力工作中，请不要刷新或关闭");
		},30000);
	};	
	this.hideDiv = function(isCloseAll){
		if(overlay){
			overlay.hide();
		}
		if(loading){
			loading.hide();
		}
		if(set3sTime){
			clearTimeout(set3sTime);
		}
		if(set30sTime){
			clearTimeout(set30sTime);
		}
	};	
	this.init = function(){
		
		overlay = $("<div id='j-overlay' class='fui-overlay-opa-0' style='opacity: 0.4; z-index: 9010;filter:alpha(opacity=40); display:none'>"
				+"</div>");
		
		loading = $("<div id='j-loading-overlay' class='loading-openwin' style='display:none;z-index:9010;'>"			
				+"<div class='loading-picture'></div>"
				+"<p class='loading-info' id='j-loading-info'>数据加载中，请稍候...</p>"
				+"</div>");	
		
		
		top.$("body").append(overlay);
		top.$("body").append(loading);	
	
	};

};