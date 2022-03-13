let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //Import XMLHttpRequest

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();//Variable manejadora de consultas
        //open recibe 3 valores el 1 la accion (GET, POST, DELET etc), 2 la url y 3 que se maneje de forma asíncrona
        //el valor del 3er argumento es true por defecto, pero por buenas practicas lo pasamos para saber cómo se hace la llamada
        xhttp.open('GET', url_api, true);
        //Luego de hacer la peticion se tiene que escuchar el cambio o lo que genera la peticion eso se hace con
        //onreadystatechange
        xhttp.onreadystatechange = (() => {
            /*En este bloque se hace alguna validacion para saber si se ejecuta el callback, no siempre se necesita el evento
            Exiten 5 estados empezando desde el 0 que es inicializado, 1 esta cargando el proceso de hacer el llamado, 
            2 dónde ya se cargo la llamada, 3 si hay alguna descarga o información
            y por último el 4 donde ya finalizo, se completo la conexión y recibimos los valores*/
            if(xhttp.readyState === 4) {
                /*se hace una segunda validacion para saber el STATUS en el cual se encuentra mi llamada,
                si bien ya se ha completado la petición aún no se sabe si es correcta o que STATUS ha arrojado*/
                (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject (new Error('Error', url_api))
            }
        });
        xhttp.send();//se envía la solicitud
    });
}

module.exports = fetchData;
