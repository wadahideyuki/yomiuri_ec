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



$(window).on('load', function () {
    // 選手名を選ぶ
    $('.l-header__select').on('click',function(){
        $('.l-header__playerBox').toggleClass('open');
        return false;
    });
    $(document).on('click',function(){
        $('.l-header__playerBox').removeClass('open');
    });
    // 選手名 選択したらフォームに記述
    $('.l-header__playerNameLink').find('a').on('click',function(){
        var player = $(this).text();
        $('#inputHeader').val(player);
        $('.l-header__playerBox').removeClass('open');
        return false;
    });

    // 検索履歴の表示・非表示
    $('#inputHeader').focus(function(){
        $('.l-header__searchHistory').addClass('active');
        $(this).select();
    });
    $(document).on('click',function(e){
        if(!$(event.target).closest('#inputHeader').length) {
            $('.l-header__searchHistory').removeClass('active');
        }
    });
    // 検索履歴を選択したらフォームに記述
    $('.l-header__searchHistoryRow').find('a').on('click',function(){
        var history = $(this).text();
        $('#inputHeader').val(history);
        $('.l-header__searchHistory').removeClass('active');
        return false;
    });

    // もっと見る
    $('.readmore').find('a').on('click',function(){
        $('.hidden').slideToggle();
        $(this).toggleClass('open');
        if($(this).hasClass('open')) {
            $(this).text('閉じる');
        } else {
            $(this).text('もっと見る');
        }
        return false;
    });

    // ヘッダー メニュー
    $('.nav').on('mouseover',function() {
        $(this).find('.l-sidebar__block').addClass('open');
        return false;
    });
    $('.nav').on('mouseout',function() {
        $(this).find('.l-sidebar__block').removeClass('open');
        return false;
    });

    // 注目ワード moreクリック時
    $('.more').find('a').on('click',function(){
        $(this).toggleClass('open');
        $('.plus').slideToggle();
        return false;
    });
});
