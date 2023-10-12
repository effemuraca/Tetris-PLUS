'use strict';

const utenteDomanda = document.getElementById('username');
utenteDomanda.addEventListener('change', function () {
    const username = utenteDomanda.value;
    const domanda = document.getElementById('domanda_personale');
    fetch('../php/domanda.php?username=' + username)
        .then(response => response.json())
        .then(data => {
            if (data.stato) {
                domanda.textContent = data.messaggio;
            }
            else {
                const errore = document.getElementById('domanda_personale');
                domanda.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta: ' + error);
        });
});