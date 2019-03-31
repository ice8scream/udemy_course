
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
    let serverRequest = new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();

        request.open('GET', 'js/current.json');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        
        request.addEventListener('readystatechange', function () {
            if (request.readyState === 4){
                if(request.status == 200) {
                    resolve(JSON.parse(request.response).usd);
                } else {
                    reject();
                }
            }
        });
       
        request.send();
    });

    serverRequest
        .then(result => 
            inputUsd.value = inputRub.value / result)
        .catch(() => inputUsd.value = "Что-то пошло не так!");

});