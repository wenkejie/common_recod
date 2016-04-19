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
			if (data.toString().indexOf("该账号在其他地方登录") > -1 || (jqXHR.readyState == 4 && jqXHR.status == 200 && jqXHR.statusText == 'Unknown')) {
				top.location.href = "/cpmembership/commonLog.ctrl?dcas_error_code=218";
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
		if (request.readyState == 0 && request.status == 0 && request.statusText != 'abort') {
			location.reload();
		}
	});
})(jQuery);