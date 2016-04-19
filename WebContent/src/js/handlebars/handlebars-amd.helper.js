/**
 * Handlebars.helper.js
 * @authors 罗建
 * @date    2015-12-25 13:26:20
 * @version v.1.0.0
 */
define(['handlebars'],
	function(Handlebars) {
		/**
		 * [ {{#match value 0}}sss{{/match}} ]
		 * @param  {[type]} v        [description]
		 * @param  {[type]} num      [description]
		 * @param  {[type]} options) {			if       (v.length [description]
		 * @return {[type]}          [description]
		 */
		Handlebars.registerHelper("match", function(v, num, options) {
			if (v.length == num) {
				//满足添加继续执行
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});

		// //空处理
		// Handlebars.registerHelper("returnisnull", function(data) {
		// 	if (data == "null") {
		// 		return "";
		// 	} else {
		// 		return data;
		// 	}
		// });

		/**
		 * 
		 *  {{#compare people.name '==' 'peter'}}
     			他的名字是peter
     		{{else}}
     			他的名字不是peter
 			{{/compare}}
		 * @param  {[type]} left     [description]
		 * @param  {[type]} operator [description]
		 * @param  {[type]} right    [description]
		 * @param  {Object} options) {			if       (arguments.length <             3) {				throw new      Error('Handlerbars Helper "compare" needs 2 parameters');			}			var operators [description]
		 * @param  {[type]} '        [description]
		 * @param  {String} '!       [description]
		 * @param  {[type]} '!       [description]
		 * @param  {[type]} '<':     function(l,   r)                {					return l  <           r;				} [description]
		 * @param  {[type]} '>':     function(l,   r)                {					return l  >           r;				} [description]
		 * @param  {String} '<       [description]
		 * @return {[type]}          [description]
		 */
		Handlebars.registerHelper('compare', function(left, operator, right, options) {
			if (arguments.length < 3) {
				throw new Error('Handlerbars Helper "compare" needs 2 parameters');
			}
			var operators = {
				'==': function(l, r) {
					return l == r;
				},
				'===': function(l, r) {
					return l === r;
				},
				'!=': function(l, r) {
					return l != r;
				},
				'!==': function(l, r) {
					return l !== r;
				},
				'<': function(l, r) {
					return l < r;
				},
				'>': function(l, r) {
					return l > r;
				},
				'<=': function(l, r) {
					return l <= r;
				},
				'>=': function(l, r) {
					return l >= r;
				},
				'typeof': function(l, r) {
					return typeof l == r;
				}
			};

			if (!operators[operator]) {
				throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
			}

			var result = operators[operator](left, right);

			if (result) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});

		/** 
		 * 对日期进行格式化， 
		 * @param date 要格式化的日期 
		 * @param format 进行格式化的模式字符串
		 *     支持的模式字母有： 
		 *     y:年, 
		 *     M:年中的月份(1-12), 
		 *     d:月份中的天(1-31), 
		 *     h:小时(0-23), 
		 *     m:分(0-59), 
		 *     s:秒(0-59), 
		 *     S:毫秒(0-999),
		 *     q:季度(1-4)
		 * @return String
		 * @author yanis.wang
		 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
		 */
		Handlebars.registerHelper('dateFormat', function(date, format) {
			if (!date) {
				return "";
			}
			date = new Date(date.replace(/-/g, "/"));
			var map = {
				"M": date.getMonth() + 1, //月份 
				"d": date.getDate(), //日 
				"h": date.getHours(), //小时 
				"m": date.getMinutes(), //分 
				"s": date.getSeconds(), //秒 
				"q": Math.floor((date.getMonth() + 3) / 3), //季度 
				"S": date.getMilliseconds() //毫秒 
			};
			format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
				var v = map[t];
				if (v !== undefined) {
					if (all.length > 1) {
						v = '0' + v;
						v = v.substr(v.length - 2);
					}
					return v;
				} else if (t === 'y') {
					return (date.getFullYear() + '').substr(4 - all.length);
				}
				return all;
			});
			return format;
		});

		/*
		主要思想是使用eval执行想要的逻辑。以拼接字符的模式来进行逻辑判断理论上可以如同EL表达式一样处理页面上的大部分逻辑。
		如：{{#expression a '==' b '&&' c '>' 0}}
		*/
		Handlebars.registerHelper('expression', function() {
			var exps = [];
			try {
				//最后一个参数作为展示内容，也就是平时的options。不作为逻辑表达式部分
				var arg_len = arguments.length;
				var len = arg_len - 1;
				for (var j = 0; j < len; j++) {
					exps.push(arguments[j]);
				}
				var result = eval(exps.join(' '));
				if (result) {
					return arguments[len].fn(this);
				} else {
					return arguments[len].inverse(this);
				}
			} catch (e) {
				throw new Error('Handlerbars Helper "expression" can not deal with wrong expression:' + exps.join(' ') + ".");
			}
		});
		
		return Handlebars;
	});