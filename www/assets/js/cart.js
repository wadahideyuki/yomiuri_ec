//swiper
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if(windowWidth > 750) {
    //PC時のみの　最近チェックした商品
    var swiperChecked = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        autoHeight: true,
        navigation: {
            nextEl: '.m-swiper-control__next',
            prevEl: '.m-swiper-control__prev',
        }
    });
} else {
    //SPのswiper共通
    var allSwiper = new Swiper('.swiperContainer', {
        slidesPerView: 3,
        spaceBetween: 5,
        loop: true,
        navigation: {
            nextEl: '.m-swiper-control__next',
            prevEl: '.m-swiper-control__prev',
        }
    });
}
