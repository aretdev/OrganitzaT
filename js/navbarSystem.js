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


    function hacerSticky() {
    var navbarSize = (window.innerWidth > 768 ) ? "main-navbar" : "footer-main-navbar";
    var header = document.getElementsByClassName(navbarSize)[0];
    var sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky-main-navbar");


      } else {
        header.classList.remove("sticky-main-navbar");

      }
    }

 });


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