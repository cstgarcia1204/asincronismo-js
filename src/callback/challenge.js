//Consumir API con callbacks

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //Import XMLHttpRequest
const API = 'https://rickandmortyapi.com/api/character/'; //API a consultar

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest();//Variable manejadora de consultas
//open recibe 3 valores el 1 la accion (GET, POST, DELET etc), 2 la url y 3 que se maneje de forma asíncrona
//el valor del 3er argumento es true por defecto, pero por buenas practicas lo pasamos para saber cómo se hace la llamada
    xhttp.open('GET', url_api, true);
//Luego de hacer la peticion se tiene que escuchar el cambio o lo que genera la peticion eso se hace con
//onreadystatechange
    xhttp.onreadystatechange = function (event) {
        /*En este bloque se hace alguna validacion para saber si se ejecuta el callback, no siempre se necesita el evento
        Exiten 5 estados empezando desde el 0 que es inicializado, 1 esta cargando el proceso de hacer el llamado, 
        2 dónde ya se cargo la llamada, 3 si hay alguna descarga o información
        y por último el 4 donde ya finalizo, se completo la conexión y recibimos los valores*/

        if(xhttp.readyState === 4) {
            /*se hace una segunda validacion para saber el STATUS en el cual se encuentra mi llamada,
            si bien ya se ha completado la petición aún no se sabe si es correcta o que STATUS ha arrojado*/
            if(xhttp.status === 200) {
                /*Aqui en este bloque ahora si se puede llamar a nuestro callback.
                Callback por estándar dentro de Node indica debemos pasar 2 valores: 
                el primero sería el error  y el segundo sería el resultado del llamado a la API*/
                callback(null, JSON.parse(xhttp.responseText));
            }else{
                const error = new Error('Error '+ url_api );
                return callback(error, null);
            }
        }
    }
    xhttp.send();//se envía la solicitud
}

fetchData(API, function(error1, data1) {
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2, data2){
        if (error2) return console.error(error2);
        fetchData(data2.origin.url, function(error3, data3) {
            if (error3) return console.error(error3);
            console.log(data1.info.count); //Resultado: 826
            console.log(data2.name);        //Resultado: Rick Sanchez
            console.log(data3.dimension);   //Resultado: Dimension C-137
        });
    });
});
