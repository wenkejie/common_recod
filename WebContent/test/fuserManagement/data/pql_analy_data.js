(function(str){
	var _pql_result_data = [],
		start = new Date();
	switch(str){
	case "today":
		var _hours = start.getHours();
		for(var i=0;i<24;i++){
			if(i <= _hours){
				var _obj = {y: 1 + Math.round(Math.random() * 5)};
				_pql_result_data.push(_obj);
			}else{
				_pql_result_data.push(null);
			}
		}
		break;
	case "yestoday":
		for(var i=0;i<24;i++){
			var _obj = {y: 100 + Math.round(Math.random() * 100)};
			_pql_result_data.push(_obj);
		}
		break;
	case "last7":
		for(var i=0;i<7;i++){
			var _obj = {y: 100 + Math.round(Math.random() * 100)};
			_pql_result_data.push(_obj);
		}
		break;
	case "last30":
		for(var i=0;i<30;i++){
			var _obj = {y: 100 + Math.round(Math.random() * 100)};
			_pql_result_data.push(_obj);
		}
		break;
	default:
		var _hours = start.getHours();
		for(var i=0;i<24;i++){
			if(i <= _hours){
				var _obj = {y: 100 + Math.round(Math.random() * 100)};
				_pql_result_data.push(_obj);
			}else{
				_pql_result_data.push(null);
			}
		}
		break;
	}
	
	return _pql_result_data;
});
