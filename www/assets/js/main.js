//pcとspで画像切り替え
$(function () {
    $('img.rp').hide();
});

var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

$(window).on('load resize', function () {
    var $body = $('body');
    var $rp = $('img.rp');
    if (windowWidth <= 750) {
        $body.removeClass('w-sp w-pc');
        $body.addClass('w-sp');
        $rp.each(function () {
            if ($(this).attr("src").indexOf('--sp') == -1) {
                $(this).attr("src", $(this).attr("src").replace(/(\.)(png|jpg|gif)/, "--sp$1$2"));
            }
            $(this).show();
        });
    } else {
        $body.removeClass('w-sp w-pc');
        $body.addClass('w-pc');
        $rp.each(function () {
            $(this).attr("src", $(this).attr("src").replace("--sp", ""));
            $(this).show();
        });
    }
});

$(window).on('load', function () {
    // TOPへ戻る
	var pagetop = $('.toTop');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			pagetop.fadeIn();
				} else {
			pagetop.fadeOut();
		}
        // TOPへ戻る フッター手前で止まる
        var scrollH = $(document).height();
        var scrollPos = $(window).height() + $(window).scrollTop();
        if (windowWidth <= 750) { // SP
          if ( (scrollH - scrollPos) / scrollH <= 0.06) {
              $('.toTop').css({"position":"absolute","bottom": 385});
          } else {
              $('.toTop').css({"position":"fixed","bottom": 70});
          }
        } else { // PC
          if ( (scrollH - scrollPos) / scrollH <= 0.04) {
              $('.toTop').css({"position":"absolute","bottom": 280});
          } else {
              $('.toTop').css({"position":"fixed","bottom": 70});
          }
        }
	});

	pagetop.click(function () {
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});
});



$(document).ready(function() {
	// スクロール時 アニメーション表示
	$(window).scroll(function(){
		var windowH = $(window).height();
		var windowT = $(window).scrollTop();
		$('.animV').each(function(){
			var targetPos = $(this).offset().top;
			if( windowT > targetPos - windowH + 100){
				$(this).addClass('vertical');
			}
		});
		$('.animH').each(function(){
			var targetPos = $(this).offset().top;
			if( windowT > targetPos - windowH + 60){
				$(this).addClass('horizontal');
			}
		});
	});

	// ヘッダー固定によるリンク位置の調整
	var windowWidth = $(window).width();
	var headerHight;
	if (windowWidth <= 750) {
		headerHight = 65;
	} else {
		headerHight = 90;
	}
	$('a[href^=#]').click(function(){
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top-headerHight;
		$("html, body").animate({scrollTop:position}, 550, "swing");
		return false;
	});
});

var windowWidth = $(window).width();
var headerHight;
if (windowWidth <= 750) {
	headerHight = 65;
} else {
	headerHight = 90;
}



//カテゴリーページなどにあるソート
$(function(){
	$(".u-cateCondition .btnSort a").click(function(){
		$(this).toggleClass("show");
		var thisSort = $(this).parents($(".u-cateCondition"));
		thisSort.find(".sortList1").slideToggle();
		return false;
	});
});



