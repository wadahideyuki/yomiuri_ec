$(function() {
	$('.slick-box').slick({
		infinite: true,
    dots: true
	}); 
});
$(document).ready(function() {
  //サムネイル差し替え
  $(".item-thumbs li").click(function(){
    $(".item-thumbs li").removeClass();
    $(this).addClass("selected");
    var imgSrc = $("img",this).attr("src");
    $(".item-photo img").attr("src",imgSrc);
  });
  
  //SP商品詳細
  $(".item-detail h2").click(function(){
    $(this).toggleClass("open");
    $(this).next().toggleClass("sp-show");
  });
  
  //サイズのradio切り替え
  $(".size-select input").change(function(){
    $(".size-select .checkBox").removeClass("checked");
    $(".size-select input:checked").parent().addClass("checked");
  });
  
});


