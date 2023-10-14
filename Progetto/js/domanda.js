'use strict';

const utenteDomanda = document.getElementById('username');
utenteDomanda.addEventListener('change', function () {
    const username = utenteDomanda.value;
    const domanda = document.getElementById('domanda_personale');
    fetch('../php/domanda.php', {
        method: 'POST',
        body: JSON.stringify({ username: username }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Richiesta di caricamento della domanda personale al server effettuata con successo');
                return response.json();
            } 
            else {
                console.log('Errore nella richiesta di caricamento della domanda personale al server');
            }
        })
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