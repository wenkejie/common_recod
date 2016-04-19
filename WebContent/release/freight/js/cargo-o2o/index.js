// ====================================================
// ================== cargo-o2o整合 ===================
// ================== by,evan =========================
// ====================================================


$(function() {

	var $manv = $("li.mnav-cell");
	var $msld = $('div.mnav-sld');

	var $tbnav = $("li.j-tbnav-sld");

	$manv.mouseenter(function() {
		var sldw = $(this).children('div.mnav-sld').innerWidth();
		var sldml = -sldw/2;
		$manv.removeClass('mnav-hover');
		$msld.css('margin-left', sldml);
		$(this).addClass('mnav-hover');
		$(this).addClass('zindex-up');
		$(this).children('a.mnav-link').children('i').html('&#xe645;');
	}).mouseleave(function() {
		$(this).removeClass('mnav-hover');
		$(this).removeClass('zindex-up');
		$(this).children('a.mnav-link').children('i').html('&#xe643;');
	});

	$tbnav.mouseenter(function() {
		$tbnav.removeClass('tb-menu-active');
		$(this).addClass('tb-menu-active');
		$(this).addClass('zindex-up');
		$(this).children('a.tb-menu-link').children('i').html('&#xe645;');
		
	}).mouseleave(function() {
		$(this).removeClass('tb-menu-active')
		$(this).removeClass('zindex-up');
		$(this).children('a.tb-menu-link').children('i').html('&#xe643;');
		
	});

	$manv.click(function() {
		$manv.removeClass('current');
		$(this).addClass('current');
	});

	$("div.j-sld-more").click(function() {
		var $moreLink = $(this).parent().children("div.sd-nav-extend").children().children("div.more-link");
		var $this = $(this);
		if ($this.hasClass("slide")) {
			$moreLink.addClass("none");
			$this.removeClass("slide");
			$this.children("i.sd-nav-point").html("&#xe643;");
		}else{
			$("div.more-link").addClass("none");
			$moreLink.removeClass("none");
			$this.addClass("slide");
			$this.children("i.sd-nav-point").html("&#xe645;");
		}
	});

})