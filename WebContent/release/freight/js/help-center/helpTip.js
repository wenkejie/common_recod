/**
 * 帮助中心>>问号tip(暂时供运价调用)
 * 调用方法:
 * 		var helpTip = new cmsHelpTip();
 * 		helpTip.init();
 * 对外提供方法:
 * 		helpTip.push('f_base_info');
 * 		helpTip.pop();
 * 
 * @authors jl
 * @date    2014-03-17 21:55:08
 * @version v1.0.0
 */
var cmsHelpTip = function (){
	var typeCodeArr = [];
	var _current = this;
	this.push = function (typeCode){
		if(typeCodeArr.length >= 5){
			typeCodeArr.shift();
		}
		typeCodeArr.push(typeCode);
	};

	this.pop = function (){
		typeCodeArr.pop();
	};
	this.emptyArray=function(){
		typeCodeArr=[];
	}
	
	//tip初始化,创建html放在页面上，对相应的问号绑定相应点击事件，鼠标事件
	//初始化时 根据参数判断tips(不懂请点我)是否默认显示
	this.init = function (params){
		typeCodeArr = [];
		var $tip = $('<div id=\"help-tip\"><a id="a_cms" title="帮助中心" target="_blank"  href="javascript:" class="to-help '+(params==""?"none":"")+'"></a></div>');
		$('.to-place').prepend($tip);
		var $helpOut = $("div.to-help-out");
		$helpOut.before($tip);
		
		$('#help-tip,#help_div').hover(function(){
			var href="/cms/publicHelpHome.ctrl";
			if(typeCodeArr.length){
				href='/cms/publicHelpFaq.ctrl?$action=faqCategoryView&typeCode=' + typeCodeArr[typeCodeArr.length-1]
			}
			$("#a_cms").attr("href",href);
			//$("#a_cms").click();
			
		},function(){});
		//@modify jyc,2014-3-27,
		$("a.to-help").hover(function(){
			$(this).addClass('to-help-active');
		},function(){
			$(this).removeClass('to-help-active');
		});
		//if(params=="none"){
			/*$('#help-tip,#help_div').bind("mouseover",function(){
				//$('a.insert').parent().removeClass('none');
				$('a.to-help').addClass('to-help-active');
			}).bind('mouseout',function(){
				$('a.insert').parent().addClass('none');
				$('a.to-help').removeClass('to-help-active');
			})*/
		//}
		
	};
	//测试用
	this.get = function (){
		return typeCodeArr;
	};
}
