(function(str){
	var data,
		start,
		pointStart,
		pointInterval;
	start = new Date();
	var	pointStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(),0,59);
	var	pointInterval = 1 * 3600 * 1000;
	
	data = [
	        {
	            data: [0,1,5,12,34,45,67,85,46,123,145,124,90,55,66,77,88,66,55,44,null],
			    name : "查询次数" ,
			    //dashStyle: 'dash',
			    pointStart: pointStart,
	            pointInterval: pointInterval     // 1小时      
	        	},{
		            data: [1,3,5,7,15,35,57,75,66,83,95,104,100,80,57,78,70,55,44,33,null],
				    name : "用户（帐号）" ,
				    //dashStyle: 'dash',
				    pointStart: pointStart,
		            pointInterval: pointInterval     // 1小时      
	        	},{
		        		data: [0,0,1,6,9,11,14,23,35,46,57,68,79,81,93,104,95,86,77,68,null],
					    name : "新用户（帐号）" ,
					    //dashStyle: 'dash',
					    pointStart: pointStart,
			            pointInterval: pointInterval     // 1小时      
		        }
	];
	
	return data;
});
