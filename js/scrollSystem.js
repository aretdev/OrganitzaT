/*
    Proyecto DCU 2021-2022

    Con este script permitimos el funcionamiento de scrolls
    a modo de "carrousel"


*/


$(document).ready(function(){
       (function($) {
        $.fn.hasScrollBar = function() {
        var e = this.get(0);
                return {
                    horizontal: e.scrollWidth > e.clientWidth
                };
            }
        })(jQuery);
        
            $(".indicator-scroller-left").css("display","none")
            $(".scrolling-wrapper").each(function(i, elem) {
                if(!$(elem).hasScrollBar().horizontal) {
                    $(elem).children(".indicator-scroller-right").css("display","none")
                }
            })

        });


        const isEnd = function(element) {
            var $width = $(element).outerWidth();
                var $scrollWidth = $(element)[0].scrollWidth; 
                var $scrollLeft = $(element).scrollLeft();
                if ($scrollWidth - $width  - 35 <= $scrollLeft){
                    $(element).children(".indicator-scroller-right").css("display","none")
                }else {
                    $(element).children(".indicator-scroller-right").css("display","block")
                }

                if ($scrollLeft <= 35){
                    $(element).children(".indicator-scroller-left").css("display","none")
                }else {
                    $(element).children(".indicator-scroller-left").css("display","block")
                }

        }

        const scrollRightBut = function(element) {
                  let x = $(element).parent().scrollLeft();
                  $(element).parent().animate({
                     scrollLeft : x + 500
                 });
        }
        const scrollLeftBut = function(element) {
            let x = $(element).parent().scrollLeft();
                  $(element).parent().animate({
                     scrollLeft  : x - 500
                 });

        }
