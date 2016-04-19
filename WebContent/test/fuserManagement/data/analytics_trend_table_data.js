(function(str){
	var result = {};
	var table_data = {};
	var list = [];
	var start = new Date();
	var end = new Date();
	
	
//	function formatTimeStr(date){
//		var _hours = date.getHours();
//		var _minutes = date.getMinutes();
//		_hours = _hours < 10? ("0"+_hours) : _hours;
//		_minutes = _minutes < 10? ("0"+_minutes) : _minutes;
//		return _hours + ":" + _minutes;
//	}
//
//	function formatDateStr(date){
//		var _month = date.getMonth() + 1;
//		var _date = date.getDate()
//		_month = _month < 10? ("0"+_month) : _month;
//		_date = _date < 10? ("0"+_date) : _date;
//		return date.getFullYear() + "-" + _month + "-" + _date;
//	}
//
//	function retWeekday(d){
//		var weekday = [];
//		weekday[0]="星期日";
//		weekday[1]="星期一";
//		weekday[2]="星期二";
//		weekday[3]="星期三";
//		weekday[4]="星期四";
//		weekday[5]="星期五";
//		weekday[6]="星期六";
//		var _day = d.getDay();
//		return (_day == 6 || _day == 0) ? weekday[_day] : "";
//	}
	
	switch (str) {
	case "today":
		start.setHours(0);
		start.setMinutes(0);
		var _hours = end.getHours();
		for(var i=0;i<24;i++){
			if(i <= _hours){
				//start.setHours(i);
				var vo = {};
				start.setMinutes(0);
				var _timeStart = formatTimeStr(start);
				start.setMinutes(59);
				var _timeEnd = formatTimeStr(start);
				vo.time = _timeStart + "-" + _timeEnd;
				vo.query_count = i%15 + Math.round(Math.random() * (i%15) * 3);
				vo.user_count = i%15 + Math.round(Math.random() * (i%15) * 2);
				vo.ip = i%15 + Math.round(Math.random() * (i%15) * 1);
				vo.org_count = i%15 + Math.round(Math.random() * (i%15));
				vo.new_user_count = i%15 + Math.round(Math.random() * (i%15));
				vo.access_count = i%15 + Math.round(Math.random() * (i%15));
				list.push(vo);
				start.setHours(i+1);
			}
		}
		break;
	case "yestoday":
		start.setHours(0);
		start.setMinutes(0);
		start.setDate(start.getDate()-1);
		//var _hours = end.getHours();
		for(var i=0;i<24;i++){
				//start.setHours(i);
				var vo = {};
				start.setMinutes(0);
				var _timeStart = formatTimeStr(start);
				start.setMinutes(59);
				var _timeEnd = formatTimeStr(start);
				vo.time = _timeStart + "-" + _timeEnd;
				vo.query_count = i%15 + Math.round(Math.random() * (i%15) * 3);
				vo.user_count = i%15 + Math.round(Math.random() * (i%15) * 2);
				vo.ip = i%15 + Math.round(Math.random() * (i%15) * 1);
				vo.org_count = i%15 + Math.round(Math.random() * (i%15));
				vo.new_user_count = i%15 + Math.round(Math.random() * (i%15));
				vo.access_count = i%15 + Math.round(Math.random() * (i%15));
				list.push(vo);
				start.setHours(i+1);
		}
		break;
	case "last7":
		//start.setHours(0);
		//start.setMinutes(0);
		start.setDate(start.getDate()-6);
		//var _hours = end.getHours();
		for(var i=0;i<7;i++){
				//start.setHours(i);
				var vo = {};
				var _timeStart = formatDateStr(end);
				vo.time = _timeStart + " " + retWeekday(end);
				vo.query_count = 24 + Math.round(Math.random() * 24 * 3);
				vo.user_count = 24 + Math.round(Math.random() * 24 * 2);
				vo.ip = 24 + Math.round(Math.random() * 24 * 1);
				vo.org_count = i%15 + Math.round(Math.random() * 24);
				vo.new_user_count = i%15 + Math.round(Math.random() * 24);
				vo.access_count = 24 + Math.round(Math.random() * 24);
				list.push(vo);
				end.setDate(end.getDate()-1);
		}
		break;
	case "last30":
		//start.setHours(0);
		//start.setMinutes(0);
		start.setDate(start.getDate()-29);
		//var _hours = end.getHours();
		for(var i=0;i<30;i++){
			var vo = {};
			var _timeStart = formatDateStr(end);
			vo.time = _timeStart + " " + retWeekday(end);
			vo.query_count = 24 + Math.round(Math.random() * 24 * 3);
			vo.user_count = 24 + Math.round(Math.random() * 24 * 2);
			vo.ip = 24 + Math.round(Math.random() * 24 * 1);
			vo.org_count = i%15 + Math.round(Math.random() * 24);
			vo.new_user_count = i%15 + Math.round(Math.random() * 24);
			vo.access_count = 24 + Math.round(Math.random() * 24);
			list.push(vo);
			end.setDate(end.getDate()-1);
		}
		break;
	default:
		break;
	}
	
	table_data.list = list;
	result.dataMap = table_data;
	
	return result;
});
