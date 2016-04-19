(function(str){
	var result = {};
	var table_data = {};
	var list = [];
	var start = new Date();
	var end = new Date();
	
	switch (str) {
	case "today":
		var _hours = end.getHours();
		for(var i=0;i<20;i++){
			if(i <= _hours){
				start.setHours(_hours-i);
				start.setMinutes(Math.round(Math.random() * 59));
				var vo = {};
				var _timeStart = formatTimeStr(start);
				vo.time = _timeStart;
				var _i = Math.round(Math.random() * 3)%3;
				vo.person_name =(_i==0)?"商务小陈":(_i==1)?"客服小丽":"掌柜小侯";
				vo.query_port = "NINGBO-ABERDEEN";
				vo.ip = "192.168.1.1";
				vo.org_name = "大掌柜";
				vo.area = "浙江宁波";
				list.push(vo);
				start.setHours(i+1);
			}
		}
		break;
	
	default:
		for(var i=0;i<20;i++){
				start.setHours(20-i);
				start.setMinutes(Math.round(Math.random() * 59));
				var vo = {};
				var _timeStart = formatTimeStr(start);
				vo.time = _timeStart;
				var _i = Math.round(Math.random() * 3)%3;
				vo.person_name =(_i==0)?"商务小陈":(_i==1)?"客服小丽":"掌柜小侯";
				vo.query_port = "NINGBO-ABERDEEN";
				vo.ip = "192.168.1.1";
				vo.org_name = "大掌柜";
				vo.area = "浙江宁波";
				list.push(vo);
				start.setHours(i+1);
		}
		break;
	}
	
	table_data.list = list;
	result.dataMap = table_data;
	
	return result;
});
