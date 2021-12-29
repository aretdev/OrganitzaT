/*
	Proyecto DCU 2021-2022

	Este script es necesario para dotar de funcionalidad a la barra de navegación
	
	Habilitamos el menu "burger" y el sistema adaptativo del mismo


*/


// Funciones Post-cargadas
 $(document).ready(function(){
    window.onscroll = function() {hacerSticky()};

      $(document).on('click', function(e) {
        var container = $(".notification-elements-wraper");
          if (!$(e.target).closest(container).length) {
              container.hide();
      }
      });


    const hacerSticky = function() {
    var navbarSize = (window.innerWidth > 768 ) ? "main-navbar" : "footer-main-navbar";
    var header = document.getElementsByClassName(navbarSize)[0];
    var sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky-main-navbar");
        $(".body-wrapper").css("padding-top", "80px");


      } else {
        header.classList.remove("sticky-main-navbar");
        $(".body-wrapper").css("padding-top", "0px");

      }
    }

 });

/**
 * 
 * 
 * Necesito poder marcar en el lugar donde estoy, como cargo de forma independiente
 * el navbar, tendré que esperar hasta que este esté insertado en el DOM y posteriormente
 * añadir la clase correspondiente 
 * 
 * 
 **/


const activarItemMenu = function(selector) {
  let frecuency = 500;
  let timeout = 10000;

  var startTimeInMs = Date.now();

  (function recurSearch() {

    if ($('#' + selector).length) {
      $("#" + selector).addClass("active-nav")
      return;
    }
    else {
      setTimeout(function () {

        if (timeout && Date.now() - startTimeInMs > timeout)
          return;
        recurSearch();
      }, frecuency);
    }
  })();
}

// Funciones de utilidad

function showBurgerMenu(element) {
      $("." + element +" > .burger-elements").toggle("slide", { direction: "right" }, 500, function() {
        if($("." + element +" > .burger-elements").is(":visible")) {
            $("." + element +"> .footer-nav-mobile-wraper > .burger-menu-wrap > .burger i").removeClass('bi-list').addClass('bi-x')
            $("." + element +"> .nav-mobile-wraper > .burger-menu-wrap > .burger i").removeClass('bi-list').addClass('bi-x')

        }else {
            $("." + element +"> .footer-nav-mobile-wraper > .burger-menu-wrap > .burger i").removeClass('bi-x').addClass('bi-list')
            $("." + element +"> .nav-mobile-wraper > .burger-menu-wrap > .burger i").removeClass('bi-x').addClass('bi-list')

        }

    })

}


function showNotifications() {
  $(".notification-elements-wraper").toggle("slide", { direction: "right" }, 300)
}