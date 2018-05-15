//swiper
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if(windowWidth > 750) {
    //PC時のみの　ほしいものリスト
    var swiperChecked = new Swiper('.swiper-container.swiper-item-photo', {
        slidesPerView: 1,
        loop: true,
        autoHeight: true,
        navigation: {
            nextEl: '.favolite__next',
            prevEl: '.favolite__prev',
        }
    });
} else {
    //SPのswiper共通
    var allSwiper = new Swiper('.swiperContainer.swiper-item-photo', {
        slidesPerView: 3,
        spaceBetween: 1,
        loop: true,
        pagination: {
            el: '.favolite-pagination',
            type: 'bullets',
        }
        /*navigation: {
            nextEl: '.swiper-favolite .m-swiper-control__next',
            prevEl: '.swiper-favolite .m-swiper-control__prev',
        }*/
    });
}


