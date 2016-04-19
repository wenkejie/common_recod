;(function($) {
		$.fn.delayhover = function(item, fnOver, fnOut) {

			var time = 200;
			var delaytime = "";
			var hasfn = "";

			return this.delegate(item, 'mouseenter', function(e) {
					var that = this;
					hasfn = false;
					delaytime = setTimeout(function() {
						fnOver.call(that, e);
						hasfn = true;
					}, time);
				}
				// fnOver
				// delayitem = setTimeout(fnOver,time)

			).delegate(item, 'mouseleave',
				function(e) {
					var that = this;
					clearTimeout(delaytime);
					if (hasfn) {
						fnOut.call(that, e)
					}
				}
			)
		}
		
		$.fn.myhover = function(item, fnOver, fnOut) {
			return $(this).delegate(item, 'mouseenter', fnOver).delegate(item, 'mouseleave', fnOut || fnOver)
		}
		
		$.fn.scrollfix = function() {
			var offset = $(this).offset();
			var that = $(this);
			$(window).scroll(function() {
				if ($(window).scrollTop() > offset.top) {
					that.addClass('scroll-fixed');
				} else {
					that.removeClass('scroll-fixed')
				}
			})
		}
})(jQuery);


$(function() {
	var $header = $("#header");
	// 滚动条时 header导航始终在页面首部显示
	$header.scrollfix();

	$(window).scroll( function() { 
		if ($(window).scrollTop()==0) {
			$('a.to-top').addClass('none');	
		}else{
			$('a.to-top').removeClass('none');	
		}
	});

	$('a.to-top').click(function() {
		$(window).scrollTop(0);
	});
});

function formatTimeStr(date){
	var _hours = date.getHours();
	var _minutes = date.getMinutes();
	_hours = _hours < 10? ("0"+_hours) : _hours;
	_minutes = _minutes < 10? ("0"+_minutes) : _minutes;
	return _hours + ":" + _minutes;
}

function formatDateStr(date){
	var _month = date.getMonth() + 1;
	var _date = date.getDate()
	_month = _month < 10? ("0"+_month) : _month;
	_date = _date < 10? ("0"+_date) : _date;
	return date.getFullYear() + "-" + _month + "-" + _date;
}

function formatMonthDateStr(date){
	var _month = date.getMonth() + 1;
	var _date = date.getDate()
	_month = _month < 10? ("0"+_month) : _month;
	_date = _date < 10? ("0"+_date) : _date;
	return  _month + "月" + _date + "日";
}

function retWeekday(d){
	var weekday = [];
	weekday[0]="星期日";
	weekday[1]="星期一";
	weekday[2]="星期二";
	weekday[3]="星期三";
	weekday[4]="星期四";
	weekday[5]="星期五";
	weekday[6]="星期六";
	var _day = d.getDay();
	return (_day == 6 || _day == 0) ? weekday[_day] : "";
}
