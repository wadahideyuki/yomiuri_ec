(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
	// スクロール時 アニメーション表示
	$(window).scroll(function () {
		var windowH = $(window).height();
		var windowT = $(window).scrollTop();
		$('.animV').each(function () {
			var targetPos = $(this).offset().top;
			if (windowT > targetPos - windowH + 100) {
				$(this).addClass('vertical');
			}
		});
		$('.animH').each(function () {
			var targetPos = $(this).offset().top;
			if (windowT > targetPos - windowH + 60) {
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
	$('a[href^=#]').click(function () {
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - headerHight;
		$("html, body").animate({ scrollTop: position }, 550, "swing");
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

},{}],2:[function(require,module,exports){
'use strict';

require('./lineup.js');

require('./top.js');

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
        if (windowWidth <= 750) {
            // SP
            if ((scrollH - scrollPos) / scrollH <= 0.06) {
                $('.toTop').css({ "position": "absolute", "bottom": 385 });
            } else {
                $('.toTop').css({ "position": "fixed", "bottom": 70 });
            }
        } else {
            // PC
            if ((scrollH - scrollPos) / scrollH <= 0.04) {
                $('.toTop').css({ "position": "absolute", "bottom": 280 });
            } else {
                $('.toTop').css({ "position": "fixed", "bottom": 70 });
            }
        }
    });

    pagetop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
});

},{"./lineup.js":1,"./top.js":3}],3:[function(require,module,exports){
'use strict';

$(window).on('load', function () {
    // NEWS 新着・その他 切り替え
    var tab = $('.p-top__newsTab').find('a');
    var tabA = $('.p-top__newsTab--A').find('a');
    var tabB = $('.p-top__newsTab--B').find('a');
    var wrap = $('.p-top__newsWrap');
    tab.on('click', function () {
        if (!$(this).hasClass('is-active')) {
            tab.removeClass('is-active');
            $(this).addClass('is-active');
        }
        return false;
    });
    tabA.on('click', function () {
        wrap.removeClass('is-slide');
    });
    tabB.on('click', function () {
        wrap.addClass('is-slide');
    });

    var W = $(window).width();
    var Sm = 750;
    var newsList = $('.p-top__section--new .p-top__itemList');
    var rankingList = $('.p-top__section--ranking .p-top__itemList');
    var recommendList = $('.p-top__section--recommend .p-top__itemList');
    if (W < Sm) {
        //newsList.addClass('item-slider');
        recommendList.addClass('item-slider');
        rankingList.addClass('ranking-slider');
    } else {
        //newsList.removeClass('item-slider');
        recommendList.removeClass('item-slider');
        rankingList.removeClass('ranking-slider');
    }

    // KV スライダー
    $('.main-slider').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 400,
        slidesToShow: 1,
        adaptiveHeight: true,
        asNavFor: '.sub-slider'
    });
    $('.sub-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 400,
        asNavFor: '.main-slider'
    });
});

//swiper
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if (windowWidth > 750) {
    //PC時のみの　最近チェックした商品
    var swiperChecked = new Swiper('.p-top-checked-slide .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        autoHeight: true,
        navigation: {
            nextEl: '.p-top-swiper-control__next',
            prevEl: '.p-top-swiper-control__prev'
        }
    });
} else {
    //SPのswiper共通
    var allSwiper = new Swiper('.swiperContainer', {
        slidesPerView: 3,
        spaceBetween: 5,
        loop: true,
        navigation: {
            nextEl: '.p-top-swiper-control__next',
            prevEl: '.p-top-swiper-control__prev'
        }
    });
    //SPのランキングのみ
    var rankingSwiper = new Swiper('.rankingSwiper', {
        slidesPerView: 3,
        spaceBetween: 5,
        loop: false,
        navigation: {
            nextEl: '.p-top-swiper-control__nextR',
            prevEl: '.p-top-swiper-control__prevR'
        }
    });
}

$(window).on('load', function () {
    // 選手名を選ぶ
    $('.l-header__select').on('click', function () {
        $('.l-header__playerBox').toggleClass('open');
        return false;
    });
    $(document).on('click', function () {
        $('.l-header__playerBox').removeClass('open');
    });
    // 選手名 選択したらフォームに記述
    $('.l-header__playerNameLink').find('a').on('click', function () {
        var player = $(this).text();
        $('#inputHeader').val(player);
        $('.l-header__playerBox').removeClass('open');
        return false;
    });

    // 検索履歴の表示・非表示
    $('#inputHeader').focus(function () {
        $('.l-header__searchHistory').addClass('active');
        $(this).select();
    });
    $(document).on('click', function (e) {
        if (!$(event.target).closest('#inputHeader').length) {
            $('.l-header__searchHistory').removeClass('active');
        }
    });
    // 検索履歴を選択したらフォームに記述
    $('.l-header__searchHistoryRow').find('a').on('click', function () {
        var history = $(this).text();
        $('#inputHeader').val(history);
        $('.l-header__searchHistory').removeClass('active');
        return false;
    });

    // もっと見る
    $('.readmore').find('a').on('click', function () {
        $('.hidden').slideToggle();
        $(this).toggleClass('open');
        if ($(this).hasClass('open')) {
            $(this).text('閉じる');
        } else {
            $(this).text('もっと見る');
        }
        return false;
    });

    // ヘッダー メニュー
    $('.nav').on('mouseover', function () {
        $(this).find('.l-sidebar__block').addClass('open');
        return false;
    });
    $('.nav').on('mouseout', function () {
        $(this).find('.l-sidebar__block').removeClass('open');
        return false;
    });

    // 注目ワード moreクリック時
    $('.more').find('a').on('click', function () {
        $(this).toggleClass('open');
        $('.plus').slideToggle();
        return false;
    });
});

},{}]},{},[2]);
