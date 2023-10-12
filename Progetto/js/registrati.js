const registrazioneForm = document.getElementById("richiedi_registrazione");
registrazioneForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(registrazioneForm);

    if (formData.get('pwd') !== formData.get('pwd2')) {
        const errore = document.getElementById("errore_registrazione");
        errore.textContent = "Le password non coincidono";
        return;
    }

    fetch('../php/registrazione.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.stato) {
                // Registrazione riuscita, reindirizza alla pagina di successo
                alert(data.messaggio);
                window.location.href = "login.php";
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
