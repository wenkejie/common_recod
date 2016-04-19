// Run javascript after DOM is initialized
$(document).ready(function() {

	// $('#search').hideseek();

	// $('#search-highlight').hideseek({
	// 	highlight: true
	// });

 //  $('#search-nodata').hideseek({
 //    nodata: 'No results found'
 //  });

 //  $('#search-navigation').hideseek({
 //    nodata: 'No results found',
 //    navigation: true
 //  });

 //  $('#search-ignore').hideseek({
 //    highlight: true,
 //    ignore: '.ignore'
 //  });

 //  $('#search-ignore-accents').hideseek({
 //    highlight: true,
 //    ignore_accents: true
 //  });

 //  $('#search-hidden-mode').hideseek({
 //    hidden_mode: true
 //  });

 //  $('#search-custom-event').hideseek();
 //  $('#search-custom-event').on("_after", function() {
 //    alert('This alert comes after the search!')
 //  });

 //  $('#search-custom-event-2').hideseek();
 //  $('#search-custom-event-2').on("_after", function() {
 //    alert('This alert comes after the procession of each element!')
 //  });

  $('.after_each_event').hideseek({
    // hidden_mode: true,
    highlight: true,
    nodata: '没找到对应内容'
  }).on("_after", function() {
      var  $thisLise = $(this).parent().children('ul.j-list');
      var $list = $('ul.j-list');
      if ($(this).val() == "") {
        $thisLise.addClass('none');
        $(this).parent().removeClass('zindex-up');
      }else{
        $list.addClass('none');
        $thisLise.removeClass('none');
        $(this).parent().addClass('zindex-up');
      };
  });
});