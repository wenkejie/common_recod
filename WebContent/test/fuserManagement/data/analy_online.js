(function(str){
	var data,
		start,
		pointStart,
		pointInterval;
	start = new Date();
	var	pointStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(),start.getHours(),start.getMinutes()-14);
	var	pointInterval = 1 * 60 * 1000;
	
	data = [
	        {
	            data: [0,9,11,21,31,45,67,85,99,123,86,76,68,80,66],
			    name : "查询次数" ,
			    //dashStyle: 'dash',
			    pointStart: pointStart,
	            pointInterval: pointInterval     	// 1min    
	        	},{
		            data: [1,3,5,7,15,35,57,75,66,83,66,56,44,35,44],
				    name : "用户（帐号）" ,
				    //dashStyle: 'dash',
				    pointStart: pointStart,
		            pointInterval: pointInterval    // 1min    
	        	},{
		        		data: [0,0,1,6,9,11,14,23,35,46,37,35,44,66,56],
					    name : "新用户（帐号）" ,
					    //dashStyle: 'dash',
					    pointStart: pointStart,
			            pointInterval: pointInterval // 1min    
		        }
	];
	
	return data;
});
