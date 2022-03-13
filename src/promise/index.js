//Promises and es6 standar arrow function
//Las promesas pueden suceder ahora, en el futuro o nunca
const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        //Validacion si resolve o reject se ejecuta
        if (true) {
            resolve('hey everything it is ok!!!');
        }else{
            reject('oops!! something went wrong');
        }
    });
};

somethingWillHappen()
    .then(response => console.log(response))//handle response
    .catch(error => console.log(error));    //handle error


const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if(true) {
            setTimeout(() => {
                resolve('True')
            }, 4000);
        }else {
            const error = new Error('oops!');// Es mejor crear el error de esta manera a solo pasar un string
            reject(error);
        }
    })
}

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(error => console.log(error));


//Varias promesas al mismo tiempo o encadenadas
Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
        console.log(`Array of results ${response}`); //Resultado : Array of results hey everything it is ok!!!,True 
        console.log('Array of results : ', response)
    })
    .catch(err => {
        console.error(err);
    })


