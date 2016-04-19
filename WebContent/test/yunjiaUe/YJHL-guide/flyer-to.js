$(function() {
	

	$('html,body').on('click','a.guide-btn-last',addProduct);
	function addProduct(event){
	  	var offset = $("a.to-guide").offset();
	  	$('div.guide-box').remove();
	  	// var flycell = $("div.unfly").addClass('flycell');
	    	flyer =  $('<img class="guide-box guide-box-7 flycell" src="./img/guide-img7.png"/>');
		  flyer.fly({
		    start: {
		      left: 860,
		      top: 285,
		    },
		    end: {
		      left: offset.left,
		      top: offset.top, 
		      width: 0,height: 0
		    },
		    onEnd: function(){
		    	//跳转链接可以些这里
		    } //结束回调
	  	});
		  // flycell.animate(500).addClass('none');
	};

	$('html,body').on('click','a.guide-box-close',addProduct);
	function addProduct(event){
	  	var offset = $("a.to-guide").offset();
	  	$('div.guide-box').remove();
	  	// var flycell = $("div.unfly").addClass('flycell');
	    	flyer =  $('<img class="guide-box guide-box-7 flycell" src="./img/guide-img7.png"/>');
		  flyer.fly({
		    start: {
		      left: 860,
		      top: 285,
		    },
		    end: {
		      left: offset.left,
		      top: offset.top, 
		      width: 0,height: 0
		    },
		    onEnd: function(){
		    	//跳转链接可以些这里
		    } //结束回调
	  	});
		  // flycell.animate(500).addClass('none');
	}

});