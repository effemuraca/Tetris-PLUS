const registrazioneForm = document.getElementById("richiedi_registrazione");
registrazioneForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("pwd").value;
    const password2 = document.getElementById("pwd2").value;
    const mail = document.getElementById("mail").value;
    const domanda = document.getElementById("domanda").value;
    const risposta = document.getElementById("risposta").value;
    const myJSON = JSON.stringify({
        username: username,
        password: password,
        password2: password2,
        mail: mail,
        domanda: domanda,
        risposta: risposta
    });

    if (password !== password2) {
        const errore = document.getElementById("errore_registrazione");
        errore.textContent = "Le password non coincidono";
        return;
    }

    fetch('../php/registrazione.php', {
        method: 'POST',
        body: myJSON,
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
                // Registrazione riuscita, reindirizza alla pagina di successo
                alert(data.messaggio);
                window.location.href = "login.html";
            } else {
                // Registrazione fallita, mostra un messaggio di errore sullaq pagina di login
                const errore = document.getElementById("errore_registrazione");
                errore.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error("Errore durante la richiesta: " + error);
        });
});
