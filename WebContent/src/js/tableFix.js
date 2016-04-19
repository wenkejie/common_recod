/**
 * @version 1.0.0
 * @author 李光耀 2014-06-06
 * @depends jquery-1.9.1.js
 * @description 提供table的thead固定功能，未来支持左右栏目固定
 * @param height、width滚动区域的宽高默认为400和100%
 * @param fixTop固定头部,默认为ture 
 * @method 
 */
(function($) {
  var methods = {
    init: function(options) {

//如果width为数字给width加上px单位
  if (options) {//当options没有传入的时候options.width会报undefind by will
    !isNaN(options.width) && (options.width = options.width + "px");
  }
      var settings = $.extend(
          {
            'height':'400px',
            'width':'100%',
            'className': 'tableFix-thead',
            'padding':30,
            'borderColor':'#C2CDD3',
            'background':'',
            'fixTop':true,
            'fixLeft':false,
            'fixRight':false
          },options )

      var _that = this;
        // console.log(Sys.chrome)
      //为table包滚动层
      this.wrap('<div id="j-tableFixScroll" style="position:relative;overflow:auto;width:'+settings.width+';height:'+settings.height+'px"></div>');

      if (settings.fixTop) {

        var $theadWrap = $('<div />', {
          id: "j-tableFixThead",
          'class': settings.className
        });


        var
        $thatThead = _that.find('thead'),
          height = $thatThead.height(),
          $firTh = $thatThead.find('tr:first').find('th'),
          $colTh = $thatThead.find('tr:last').find('th');


        //绝对定位到最上方
        $theadWrap
          .css({
            position: 'relative',
            overflow: 'hidden',
            width: settings.width,
            height: height,
            'border-bottom': '1px solid ' + settings.borderColor,
            background: settings.background
          });


        var eachWith = [],
            tw = 0,
            colIndex = 0;
        //为每个li设置宽度来保证和复制的一样宽
        $firTh.each(function() {
          var colspanMun = $(this).attr('colspan') || 0,
              w = 0;

              //由于fixed以后多列头被浏览器强制平分，所以如果是多列头，那么列头宽度取下面th的最大值乘以colspan的值
              if (colspanMun>1) {
                var colW = [];

                // 取多列头下面每个th的宽度
                for (var i = 0; i < colspanMun; i++) {
                    colIndex ++;
                    colW.push(Math.ceil($colTh.eq(colIndex -1).outerWidth()));
                };

                //最大值乘以cospan数
                w = Math.max.apply(null, colW) * colspanMun;
                
              }else{

                // +2为了防止ie6，7 列头换行问题
                w = Math.ceil($(this).width()) +2;
              };

          eachWith.push(w);
          tw += w;

        });


        var $thead = $('<table/>', {
          'class': _that.attr("class"),
          'style': 'position:absolute;left:0;table-layout:fixed;width:' + tw + 'px'
        });

        var $thisChildrenThead = $thatThead.clone(true);

        $thisChildrenThead.find('tr:first').find('th').each(function(index) {
          var w = eachWith[index];

          $(this).width(w);

        });

        $thisChildrenThead.appendTo($thead);
        $thead.appendTo($theadWrap);
        //插入到thead中
        $theadWrap.insertBefore('#j-tableFixScroll');

        _that.css({
          'table-layout': 'fixed',
          'width': tw,
          'margin-top': -height - 1
        });

        _that.find('thead').remove().end().prepend($thisChildrenThead.clone());

        //解决webkit内核不重绘问题
        document.body.style.WebkitBoxShadow !== undefined && _that.hide().show(0);


      }

    

      //滚动的时候给$thead赋值
      $('#j-tableFixScroll').scroll(function(){
        var left = $(this).scrollLeft();
        // var top = $(this).scrollTop();
        
       $thead.css('left',-left);

      });

    },
    resize:function(options){
      if (options) {//当options没有传入的时候options.width会报undefind by will
    !isNaN(options.width) && (options.width = options.width + "px");
  }
      var settings = $.extend(
          {
            'height':'400px',
            'width':'100%'
          },options )

      $('#j-tableFixScroll').css({
        'width':settings.width,
        'height':settings.height

      });
    },
    destroy:function(){
      $div = $("<div />");
      $('#j-tableFixScroll').unbind();
      $('#j-tableFixThead').unwrap().appendTo($div);
      $div.html('').remove();
      $(window).unbind('.tableFix');

    }
  };

  $.fn.tableFix = function(method){

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.tableFix');
    }

  };

})(jQuery);
