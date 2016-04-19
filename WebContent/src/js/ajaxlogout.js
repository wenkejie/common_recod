/**
 * @version 1.0.0
 * @author shilei 2013-06-21
 * @depends jquery-1.9.1.js
 * @description
 * 
 * 
 */
;
(function($) {
	var _ajax = $.ajax;
	$.ajax = function(url, options) {
		// If url is an object, simulate pre-1.5 signature
		if (typeof url === "object") {
			options = url;
			url = undefined;
		}
		options = options || {};
		var _success = options.success;
		options.success = function(data, textStatus, jqXHR) {
			if ((data != null && data.toString().indexOf("该账号在其他地方登录") > -1) || (jqXHR.readyState == 4 && jqXHR.status == 200 && jqXHR.statusText == 'Unknown')) {
				//top.location.href = "http://cas.600jit.com/ssocenter/login?_=123&service=http://" + top.location.host;
				top.location.href = "/cpmembership/commonLog.ctrl?dcas_error_code=218&_="+new Date().getTime();
				return;
			}
			return _success ? _success(data, textStatus, jqXHR) : null;
		};
		if (url) {
			return _ajax(url, options);
		} else {
			return _ajax(options);
		}
	};

	$(document).ajaxError(function(event, request, settings) {
		var status = request.status;
		if(status == 420){
			if(request.responseText == null){
				return;
			}
			var response = JSON.parse(request.responseText); 
			var validateUrl = response.dcasStateValiURL;
    		var backurl = response.backurl;
			//backurl += (backurl.indexOf('?')>0?'&':'?' + "target=" + Base64.encodeUrlsafe(location.href));
			
        	validateUrl += (validateUrl.indexOf('?')>0?'&':'?') + "backurl="+base64.encodeUrlsafe(backurl);
        	var languages = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage).toLowerCase();	
        	validateUrl += "&language=" + languages;
			
        	if(window.top==window.self){//不存在父页面
        		location.href = validateUrl; 
        	}else{
        		top.location.href = validateUrl;
        	}
        	
			return;
		}else if (request.readyState == 0 && request.status == 0 && request.statusText != 'abort') {
			location.reload();
			// top.location.href =
			// "http://cas.600jit.com/ssocenter/login?service=http://" +
			// top.location.host;
		}
	});
})(jQuery);