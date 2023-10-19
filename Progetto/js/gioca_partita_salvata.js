const bottoni = document.getElementsByClassName('bot_partita');
for (let i = 0; i < bottoni.length; i++) {
    bottoni[i].addEventListener('click', () => {
        const id = document.getElementById(bottoni[i].value).textContent;
        fetch('../php/carica_partita.php', {
            method: 'POST',
            body: JSON.stringify({ idPartita: id }),
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
            .then((data) => {   
                if (data.stato) {
                    sessionStorage.setItem('partita', JSON.stringify(data));
                    window.location.href = '../html/gioca.php';
                }
                else {
                    alert(data.messaggio);
                }
            })
            .catch((error) => {
                console.error('Errore durante la richiesta: ' + error);
            });
    });
}