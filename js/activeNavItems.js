/**
 * 	
 * Proyecto DCU 2021-2022
 * 
 * Necesito poder marcar en el lugar donde estoy, como cargo de forma independiente
 * el navbar, tendré que esperar hasta que este esté insertado en el DOM y posteriormente
 * añadir la clase correspondiente 
 * 
 * 
 **/


function activarItemMenu(selector) {
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