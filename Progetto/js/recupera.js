
const recuperaForm = document.getElementById('richiedi_recupero');
recuperaForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('pwd').value;
    const password2 = document.getElementById('pwd2').value;
    const risposta = document.getElementById('risposta_account').value;
    const myJSON = { username: username, password: password, password2: password2, risposta: risposta };

    if (password !== password2) {
        const errore = document.getElementById('errore_registrazione');
        errore.textContent = 'Le password non coincidono';
        return;
    }

    fetch('../php/recupera.php', {
        method: 'POST',
        body: JSON.stringify(myJSON),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                console.log('Richiesta di caricamento della partita salvata al server effettuata con successo');
                return response.json();
            } else {
                console.log('Errore nella richiesta di caricamento della partita salvata al server');
            }
        })
        .then(data => {
            if (data.stato) {
                // Recupero riuscito, reindirizza alla pagina di successo
                alert(data.messaggio);
                window.location.href = '../html/login.html';
            }
            else {
                // Recupero fallito, mostra un messaggio di errore sulla pagina di login
                const errore = document.getElementById('errore_recupero');
                let domanda;
                if (data.messaggio === '0')
                    domanda = 'Qual è il nome del tuo nonno materno?'
                else if (data.messaggio === '1')
                    domanda = 'Qual è il nome della tua prima auto?'
                else
                    domanda = 'Qual è il nome delle tue scuole superiori?'
                errore.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta: ' + error);
        });
});