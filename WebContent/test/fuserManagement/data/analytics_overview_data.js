(function(str){
	var data = [];
	
	switch (str) {
	case "today":
		data.push(235,102,86,68,97,145);
		break;
	case "yestoday":
		data.push(532,213,110,88,98,166);
		break;
	case "last2":
		data.push(478,201,111,79,86,132);
		break;
	case "last3":
		data.push(423,199,99,68,108,176);
		break;
	case "last4":
		data.push(324,190,85,89,100,132);
		break;
	case "last5":
		data.push(445,209,132,89,102,177);
		break;
	case "last6":
		data.push(478,190,132,98,89,155);
		break;
	case "last7":
		data.push(922,713,710,568,698,766);
		break;
	case "last30":
		data.push(13680,7680,3450,2640,3000,4350);
		break;
	default:
		break;
	}
	return data;
});
