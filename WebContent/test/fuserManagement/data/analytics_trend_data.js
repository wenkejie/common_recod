(function(str){
	var data,
	start,
	pointStart,
	_pql_result_data,
	pointInterval;
	start = new Date();
	data = [];
	function creat_data(str){
		var _pql_result_data=[];
		
		switch(str){
		case "today":
			var _hours = start.getHours();
			pointStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(),0,59);
			pointInterval = 1 * 3600 * 1000;
			for(var i=0;i<24;i++){
				if(i <= _hours){
					var _obj = {y: i + Math.round(Math.random() * i)};
					_pql_result_data.push(_obj);
				}else{
					_pql_result_data.push(null);
				}
			}
			break;
		case "yestoday":
			pointStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()-1,0,59);
			pointInterval = 1 * 3600 * 1000;
			for(var i=0;i<24;i++){
				var _obj = {y: i + Math.round(Math.random() * i)};
				_pql_result_data.push(_obj);
			}
			break;
		case "last7":
			pointStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()-6);
			pointInterval = 24 * 3600 * 1000;
			for(var i=0;i<7;i++){
				var _obj = {y: 24 + Math.round(Math.random() * 24)};
				_pql_result_data.push(_obj);
			}
			break;
		case "last30":
			pointStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()-29);
			pointInterval = 24 * 3600 * 1000;
			for(var i=0;i<30;i++){
				var _obj = {y: 24 + Math.round(Math.random() * 24)};
				_pql_result_data.push(_obj);
			}
			break;
		default:
			pointStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(),0,59);
			pointInterval = 1 * 3600 * 1000;
			var _hours = start.getHours();
			for(var i=0;i<24;i++){
				if(i <= _hours){
					var _obj = {y: 1 + Math.round(Math.random() * 1)};
					_pql_result_data.push(_obj);
				}else{
					_pql_result_data.push(null);
				}
			}
			break;
		}
		
		var _obj = {
				data:_pql_result_data,
			    pointStart: pointStart,
	            pointInterval: pointInterval     // 1小时 
		};
		
		return _obj;
	}
	
	var nameObj = ["查询次数","用户（帐号）","新用户（帐号）"];
	
	for(var i=0;i<3;i++){
		var _obj = creat_data(str);
		_obj.name = nameObj[i];
		data.push(_obj);
	}
	
	//if(i==0){
	var _data0 = data[0].data;
	for(var j=0,ele;(ele=_data0[j])!=null;j++){
		_data0[j].y = data[1].data[j].y + data[2].data[j].y;
	}
	//}
	
	
	return data;
})
