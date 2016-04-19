/***
 * Map 实现
 * @returns
 */

function FPMap() {
	var struct = function(key, value) {
	  this.key = key;
	  this.value = value;
	}
 
	var put = function(key, value){
	  for (var i = 0; i < this.arr.length; i++) {
	     if ( this.arr[i].key === key ) {
			this.arr[i].value = value;
			return;
	     }
	  }
      this.arr[this.arr.length] = new struct(key, value);
   }
 
   var get = function(key) {
     for (var i = 0; i < this.arr.length; i++) {
       if ( this.arr[i].key === key ) {
          return this.arr[i].value;
       }
     }
     return null;
   }
 
 var remove = function(key) {
    var v;
    for (var i = 0; i < this.arr.length; i++) {
      v = this.arr.pop();
      if ( v.key == key ) {
        continue;
      }
    this.arr.unshift(v);
    }
 }
 
 var size = function() {
   return this.arr.length;
 }
 
 var isEmpty = function() {
   return this.arr.length <= 0;
 }

//获取MAP中所有KEY的数组（ARRAY）
this.keys = function() {
    var arr = new Array();
    for (i = 0; i < this.arr.length; i++) {
        arr.push(this.arr[i].key);
     }
    return arr;
};
//获取Map中所有value的数组（array）
 this.values = function() {
	var arr = new Array();
	for (i = 0; i < this.arr.length; i++) {  
		arr.push(this.arr[i].value);
	}
	return arr;
 };

 this.arr = new Array();
 this.get = get;
 this.put = put;
 this.remove = remove;
 this.size = size;
 this.isEmpty = isEmpty;
}