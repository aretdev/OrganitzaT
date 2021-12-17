 $(document).ready(function(){

       (function($) {
        $.fn.hasScrollBar = function() {
        var e = this.get(0);
                return {
                    horizontal: e.scrollWidth > e.clientWidth
                };
            }
        })(jQuery);

            $('#footernavbar-bar').load('./common/footernavbar.html');
            $(".indicator-scroller-left").css("display","none")
            $(".scrolling-wrapper").each(function(i, elem) {
                if(!$(elem).hasScrollBar().horizontal) {
                    $(elem).children(".indicator-scroller-right").css("display","none")
                }
            })

        });
        function showBurgerMenu() {
              $(".burger-elements").toggle("slide", { direction: "right" }, 500, function() {
                if($(".burger-elements").is(":visible")) {
                    $(".burger i").removeClass('bi-list').addClass('bi-x')
                }else {
                    $(".burger i").removeClass('bi-x').addClass('bi-list')
                }

              })

        }

        function isEnd(element) {
            var $width = $(element).outerWidth();
                var $scrollWidth = $(element)[0].scrollWidth; 
                var $scrollLeft = $(element).scrollLeft();

                if ($scrollWidth - $width === $scrollLeft){
                    $(element).children(".indicator-scroller-right").css("display","none")
                }else {
                    $(element).children(".indicator-scroller-right").css("display","block")
                }

                if ($scrollLeft===0){
                    $(element).children(".indicator-scroller-left").css("display","none")
                }else {
                    $(element).children(".indicator-scroller-left").css("display","block")
                }

        }

        function scrollRightBut(element) {
                  let x = $(element).parent().scrollLeft();
                  $(element).parent().animate({
                     scrollLeft : x + 500
                 });
        }
        function scrollLeftBut(element) {
            let x = $(element).parent().scrollLeft();
                  $(element).parent().animate({
                     scrollLeft  : x - 500
                 });

        }
