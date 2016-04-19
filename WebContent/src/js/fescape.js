/**
 * @version 1.0.0
 * @author 施杰锋
 * @description js对HTML特殊字符的转义
 */


var keys = Object.keys || function(obj) {
    obj = Object(obj);
    var arr = [];
    for (var a in obj) arr.push(a);
    return arr;
};
var invert = function(obj) {
    obj = Object(obj);
    var result = {};
    for (var a in obj) result[obj[a]] = a;
    return result;
};

// IE 浏览器暂时不支持单引号的实体名称(&apos;)，IE 浏览器暂时只支持单引号的实体编号(&#39;)
var entityMap = {
    escapeHTML: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    }
};

entityMap.unescapeHTML = invert(entityMap.escapeHTML);
var entityReg = {
    escapeHTML: RegExp('[' + keys(entityMap.escapeHTML).join('') + ']', 'g'),
    unescapeHTML: RegExp('(' + keys(entityMap.unescapeHTML).join('|') + ')', 'g')
};

// 将HTML转义为实体
function escapeHTML(html) {
    if (typeof html !== 'string') return '';
    return html.replace(entityReg.escapeHTML, function(match) {
        return entityMap.escapeHTML[match];
    });
}
// 将实体转回为HTML
function unescapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(entityReg.unescapeHTML, function(match) {
        return entityMap.unescapeHTML[match];
    });
}
/**
 * js中需要转义的特殊符号，单引号和双引号
 */
var entityJSMap = {
	escapeJS: {
	  "'": '#acute#;',
	  '"': '#quot#;',
	  '<': '#lt#',
	  '>': '#gt#',
	  '/': '#ft#'
	}
};
entityJSMap.unescapeJS = invert(entityJSMap.escapeJS);
var entityJSReg = {
    escapeJS: RegExp('[' + keys(entityJSMap.escapeJS).join('') + ']', 'g'),
    unescapeJS: RegExp('(' + keys(entityJSMap.unescapeJS).join('|') + ')', 'g')
};

// 将js转义为实体
function escapeJS(val) {
    if (typeof val !== 'string') return '';
    return val.replace(entityJSReg.escapeJS, function(match) {
        return entityJSMap.escapeJS[match];
    });
}
// 将实体转回为js
function unescapeJS(str) {
    if (typeof str !== 'string') return '';
    return str.replace(entityJSReg.unescapeJS, function(match) {
        return entityJSMap.unescapeJS[match];
    });
}