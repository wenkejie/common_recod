/**
 * @version 1.0.0
 * @author 史磊 2013-05-03
 * @depends jquery-1.7.1.min.js
 * @description 仅在本工程中使用，主要提供通用的菜单功能和通用的js，css动态加载
 */
;
(function($, _undefined) {
	$.extend( {
		includePath : '',
		include : function(file) {
			var files = typeof file == "string" ? [ file ] : file;
			for ( var i = 0; i < files.length; i++) {
				var name = files[i].replace(/^\s|\s$/g, "");
				var att = name.split('.');
				var ext = att[att.length - 1].toLowerCase();
				var isCSS = ext == "css";
				var tag = isCSS ? "link" : "script";
				var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
				var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
				if ($(tag + "[" + link + "]").length == 0)
					document.write("<" + tag + attr + link + "></" + tag + ">");
			}
		}
	});
	var main = "http://cpcommon.600jit.com/fcommon/";

	/* 动态加载css js 等功能 */
	$.include( [ main + 'release/jqueryui/jquery-ui-1.10.2.freight.css', 
	             main + 'release/freight/css/common.css', 
	             
	             main + 'release/jqueryui/jquery-ui-1.10.2.freight.min.js',
	             main + 'src/js/fcommon.js',
	             main + 'src/js/fwindow.js',
	             main + 'src/js/fsearch.js',
	             main + 'src/js/fselect.js', 
	             main + 'src/js/frichselect.js', 
	             main + 'src/js/fiefix.js'
	            ])

	/* 动态加载顶部菜单功能 */
	$(function() {
		var menu = [ "<a href='" + main + "'>首页</a>", 
		             "<a href='" + main + "test/fwindow/main.html'>弹出窗口</a>", "(<a href='" + main + "test/fwindow/windows.html'>html</a>)",
		             "<a href='" + main + "test/fsearch/fsearch.html'>高级查询</a>", "(<a href='" + main + "test/fsearch/search.html'>html</a>)",
		             "<a href='" + main + "test/fselect/fselect.html'>下拉框</a>", "(<a href='" + main + "test/fsearch/search.html'>html</a>)",
		             , "(<a href='" + main + "test/ftab/tab.html'>tab html</a>)"
		, "(<a href='" + main + "test/ftips/tips.html'>tips html</a>)"];

		$("body").prepend(menu.join(" ")) ;
	});
})(jQuery);