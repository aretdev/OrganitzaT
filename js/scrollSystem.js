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
            checkScrollBars()

});
const checkScrollBars = ()=>{
        $(".scrolling-wrapper").each(function(i, elem) {
        if(!$(elem).hasScrollBar().horizontal) {
            $(elem).children(".indicator-scroller-right").css("display","none")
        }else {
            $(elem).children(".indicator-scroller-right").css("display","")
        }
    })
}

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


 /* *
 * 
 *      Sistema de búsqueda en scroll
 * 
 *      No es la mejor forma de búsqueda ,
 *        pero para una implementación simple, funciona
 *
 *
 * 
 * */

 const searchScroll = (form) => {
    //private method :)
    let hasNumber =  (myString) => {
          return /\d/.test(myString);
    }
    let whereToSearch = form.data.getAttribute("donde")
    let valueInp = form.data.value.trim().toLowerCase()
    let formatted = whereToSearch + "-" + valueInp.replace(/ +/g, "")
    let searchingOpt = ""
    let foundArray = []
    let extra_param = false
    let allElements = false
    /*
        Voy a considerar 3 formas de inputs:
            1.- Solo se introduce el número del grupo -> pueden haber varios, se resaltan todos pero solo desplazamos hasta el primero.
            2.-solo se introduce la asignatura -> mismo caso que el anterior
            3.- se introduce la cadena completa -> dcu grupo 1 , búsqueda exacta , desplazamos.
    */


    let splittedFormat = valueInp.split(" ")

    if( splittedFormat.length != 2 && !(isNaN(splittedFormat[0]) && !isNaN(splittedFormat[1])) ) {
        if(!isNaN(valueInp)) { // se búsca unicamente un número , correspondiente a entregable / grupo
            searchingOpt = "ident-data"
        }else if(!hasNumber(valueInp)) { // se búsca por acronimo de la asignatura
            searchingOpt = "acron"
        }else{ // se hace una búsqieda completa = dcu entregable/grupo 1
            searchingOpt = "fullsearch"
            valueInp = formatted
        }
    
    }else { // tenemos un input con + de dos parámetros : puede ser acron + ident o entregable/grupo + ident
        extra_param = true
    }

    let $whereSelector = $('#' + whereToSearch)
        $whereSelector.find('.col-auto').each(function(index, el) {
        $whereSelector.find(".busqueda-error").hide()
        if(valueInp == "") {
            allElements = true
            $(el).css("display","")
        } else {

            let extra_conditional = true
            if(extra_param && splittedFormat[0].length === 3 && !isNaN(splittedFormat[1])) {
                extra_conditional = $(el).find( ".cards").attr("acron") === splittedFormat[0]
                valueInp = splittedFormat[1]
                searchingOpt = "ident-data"
            }else if(splittedFormat[0].length > 3 && !isNaN(splittedFormat[1])) {
                valueInp = splittedFormat[1]
                searchingOpt = "ident-data"
            }

            if( $(el).find( ".cards").attr(searchingOpt) === valueInp && extra_conditional) {
                foundArray.push(el)
                $(el).css("display","")

            }else {
                $(el).css("display","none")
            }
        }
    });

    if(foundArray.length >= 1) {
        $whereSelector.find(".busqueda-error").hide()
        $(form).find("input").removeClass("bad-search-scroll")
        $.each(foundArray, function(index, element){
            $(element).find(".cards").css("border", "1px solid #c12a21")
            $(element).find(".cards").addClass('card-block-hovered')
            setTimeout(function() {
                $(element).find(".cards").removeClass('card-block-hovered')
                $(element).find(".cards").css("border", "none")
            },5000)
        })
        /*
         let scrollPos = $(foundArray[0]).offset().left + $(foundArray[0]).outerWidth(true)/2 + 
                        $('#' + whereToSearch).scrollLeft() - $('#' + whereToSearch).width()/2;

        $('#' + whereToSearch).animate({scrollLeft: scrollPos}, 500);
        */
    } else {
        document.querySelector("#" + whereToSearch  + " .busqueda-error").style.display = allElements ? "hide" : "block"
        $(form).find("input").addClass("bad-search-scroll")
    }
    
    allElements = false
    checkScrollBars()
    return false;
}

