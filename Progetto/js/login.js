const loginForm = document.getElementById("richiedi_login");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(loginForm);

    fetch('../php/login.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.stato) {
                // Login riuscito, reindirizza alla pagina di successo
                window.location.href = "modalità.html";
            } else {
                // Login fallito, mostra un messaggio di errore sullaq pagina di login
                const errore = document.getElementById("errore_login");
                errore.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error("Errore durante la richiesta: " + error);
        });
});