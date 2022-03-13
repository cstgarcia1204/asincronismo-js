function sum(numberA, numberB) {
    return numberA + numberB;
}

function calc(numberA, numberB, callback) {
    return callback(numberA, numberB);
}
console.log(calc(17, 3, sum));

function date(callback) {
    console.log(new Date);
    setTimeout(function (){ 
        let date = new Date;
        callback(date);
    }, 3000); 
}

function printDate(dateNow) {
     console.log(dateNow);
}

date(printDate);
