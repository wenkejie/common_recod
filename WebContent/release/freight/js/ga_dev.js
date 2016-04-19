(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-54429666-1',{'siteSpeedSampleRate':100});ga('require', 'displayfeatures');ga('send','pageview');
/**
 * @param a 请求URL[cnzz,ga]
 * @param b referer_url[cnzz]
 * @param c page_title[ga]
 * @param d
 * @param e
 * @param f
 * @param g
 * @param h
 */
function olymtech_analysis_ajax(a,b,c,d,e,f,g,h){
	//_czc.push(["_trackPageview",content_url,referer_url]);
	//try{
	//	_czc.push(["_trackPageview",a,b]);
	//}catch(error){}
	try{
		ga('send', 'pageview', {
			  'page': a,
			  'title': c
		});
	}catch(error){}
}

/**
 * 事件跟踪
 * @param Category 分类 (必填参数)
 * @param Action 触发事件 (必填参数)
 * @param Label dom名称
 * @param Value 价值（可忽略），主要用户电商计算行为价值
 */
function olymtech_analysis_event(Category,Action,Label,Value){
	try{
		ga('send', 'event', Category, Action, Label, Value);
	}catch(error){}
}