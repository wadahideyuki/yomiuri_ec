$(window).on('load', function () {
    // NEWS 新着・その他 切り替え
    var tab = $('.p-top__newsTab').find('a');
    var tabA = $('.p-top__newsTab--A').find('a');
    var tabB = $('.p-top__newsTab--B').find('a');
    var wrap = $('.p-top__newsWrap');
    tab.on('click',function() {
        if(!$(this).hasClass('is-active')) {
            tab.removeClass('is-active');
            $(this).addClass('is-active');
        }
        return false;
    });
    tabA.on('click',function(){
        wrap.removeClass('is-slide');
    });
    tabB.on('click',function(){
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
if(windowWidth > 750) {
    //PC時のみの　最近チェックした商品
    var swiperChecked = new Swiper('.p-top-checked-slide .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        autoHeight: true,
        navigation: {
            nextEl: '.p-top-swiper-control__next',
            prevEl: '.p-top-swiper-control__prev',
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
            prevEl: '.p-top-swiper-control__prev',
        }
    });
    //SPのランキングのみ
    var rankingSwiper = new Swiper('.rankingSwiper', {
        slidesPerView: 3,
        spaceBetween: 5,
        loop: false,
        navigation: {
            nextEl: '.p-top-swiper-control__nextR',
            prevEl: '.p-top-swiper-control__prevR',
        }
    });
}

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