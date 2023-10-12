
const recuperaForm = document.getElementById('richiedi_recupero');
recuperaForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(recuperaForm);

    if (formData.get('pwd') !== formData.get('pwd2')) {
        const errore = document.getElementById("errore_registrazione");
        errore.textContent = "Le password non coincidono";
        return;
    }

    fetch('../php/recupera.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.stato) {
                // Recupero riuscito, reindirizza alla pagina di successo
                alert(data.messaggio);
                window.location.href = 'login.php';
            }
            else {
                // Recupero fallito, mostra un messaggio di errore sullaq pagina di login
                const errore = document.getElementById('errore_recupero');
                errore.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta: ' + error);
        });
});