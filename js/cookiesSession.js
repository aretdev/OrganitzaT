/**
 * 	
 * Proyecto DCU 2021-2022
 * 
 * Para poder iniciar sesión con cada uno de los usuarios, podría hacerlo de dos formas:
 *      Manteniendo el dni del propio usuario mediante la URI (no la mejor forma)
 *      O guardar el dni mediante una cookie y asi simular una sesión (tampoco es la mejor forma
 *      pero evito el trabajo de trabajar con URIS)
 * 
 * 
 **/
 
const login = (form) => {

    /*

        Para facilitar las cosas , la variable machineName corresponde a la dirección a la que apunta el servicio

    **/
    const machineName = "http://iap-056-2021.dsicv.upv.es:8081"
    localStorage.setItem('machine', machineName);


    let dni = form.dniAlumno.value

    $.ajax({
        type: "GET",
        url : localStorage.getItem("machine") + "/expediente/" + dni,
        cache: false,

        success : (data) => {
            console.log(data[0].dni)
            if(data[0].dni != null) {
                const d = new Date();
                d.setTime(d.getTime() + (24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = "dni=" + dni + ";" + expires + ";path=/";
                console.log("Sesión iniciada, cookie definida bajo dni")
                document.location.href="./home.html"
            }else {
                form.dniAlumno.classList.add("is-invalid")
            }
        }
    })
    return false;


}

const logout = () => {
    document.cookie = 'dni=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log("Sesión finalizada, cookie borrada")
    document.location.href="./index.html";
    return false
}

const getDNI = () => {
    let dniCookie = "dni="
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(dniCookie) == 0) {
          return c.substring(dniCookie.length, c.length);
        }
  }
  return ""
}

const isLogged = () => {
    return getDNI() != ""
}