!function(a){a.fn.monthpicker=function(b){var c={Year:(new Date).getFullYear(),SelectMonth:null,SelectYear:null,zIndex:1200,maxYear:2100,format:"yyyy-MM",onSelect:function(a,c,d){a.val(new Date(c,d-1,1).Format(b.format))}},b=a.extend(c,b);return PreYear=function(a){b.Year=b.Year-1,Draw(a)},NextYear=function(a){b.Year<b.maxYear&&(b.Year=b.Year+1,Draw(a))},IsSame=function(a,b){return a.getFullYear()==b.getFullYear()&&a.getMonth()==b.getMonth()},Date.prototype.Format=function(a){var b={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var c in b)new RegExp("("+c+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?b[c]:("00"+b[c]).substr((""+b[c]).length)));return a},Draw=function(c){a("#j-ui-monthpicker-div").remove();var d=a('<div id="j-ui-monthpicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="z-index:'+b.zIndex+'"></div>'),e=a('<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"></div>'),f=a('<a title="&lt;\u4e0a\u5e74" class="ui-datepicker-prev ui-corner-all cur-p"><span class="ui-icon ui-icon-circle-triangle-w">&lt;\u4e0a\u5e74</span></a>'),g=a('<a title="\u4e0b\u5e74&gt;" class="ui-datepicker-next ui-corner-all cur-p"><span class="ui-icon ui-icon-circle-triangle-e">\u4e0b\u5e74&gt;</span></a>'),h='<div class="ui-datepicker-title"><span class="ui-datepicker-year">'+b.Year+"</span>\u5e74&nbsp;</div>";e.append(f).append(g).append(h),f.click(function(){PreYear(c)}),g.click(function(){NextYear(c)});for(var i=["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],j=[1,2,3,4,5,6,7,8,9,10,11,12],k=a('<table class="ui-datepicker-calendar"></table>');i.length;){for(var l=a("<tr></tr>"),m=1;3>=m;m++)if(i.length){var n=a("<td></td>"),o=a('<a class="ui-state-default cur-p"></a>'),p=i.shift(),q=j.shift();if(p){o.html(p),o.attr("title",q);var r=new Date(b.Year,q-1,1);b.SelectYear&&b.SelectMonth&&IsSame(r,new Date(b.SelectYear,b.SelectMonth-1,1))&&o.addClass("ui-state-active")}o.click(function(){var e=a(this).attr("title");b.SelectMonth=parseInt(e),b.SelectYear=b.Year,b.onSelect(c,b.SelectYear,b.SelectMonth),d.remove()}),n.append(o),l.append(n)}k.append(l)}var s=c.offset(),t=s.left,u=s.top+c.outerHeight()+2;d.append(e).append(k),d.show(),d.css("top",u),d.css("left",t),d.css("position","absolute"),a("body").append(d)},this.each(function(){var b=this,c=a(this);c.addClass("jg-monthpicker"),a(this).focus(function(){Draw(c),a("#j-ui-monthpicker-div").show();var d=a(document),e=function(c){var f=c.target;b===f||"j-ui-monthpicker-div"===f.id||a(f).parents("#j-ui-monthpicker-div").length||(a("#j-ui-monthpicker-div").remove(),d.off("click.month",e))};d.off("click.month",e).on("click.month",e)})}),this}}(jQuery);