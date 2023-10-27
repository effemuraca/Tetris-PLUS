const salvate = document.getElementById('tab');

document.addEventListener('DOMContentLoaded', function () {
    fetch('../php/salvate.php')
        .then(response => {
            if (response.ok) {
                console.log('Richiesta di caricamento delle partite salvate al server effettuata con successo');
                return response.json();
            }
            else {
                console.log('Errore nella richiesta di caricamento delle partite salvate al server');
            }
        })
        .then(data => {
            const table = document.createElement('table');
            table.setAttribute('id', 'salvate');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'ID Partita';
            const th2 = document.createElement('th');
            th2.textContent = 'Username';
            const th3 = document.createElement('th');
            th3.textContent = 'Data Partita';
            const th4 = document.createElement('th');
            th4.textContent = 'Tipo Salvataggio';
            const th5 = document.createElement('th');
            th5.textContent = 'Punteggio';
            const th6 = document.createElement('th');
            th6.textContent = 'Partita Doppia';
            const th7 = document.createElement('th');
            th7.textContent = 'Gioca Partita';
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            tr.appendChild(th7);
            thead.appendChild(tr);
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            for (let i = 0; i < data.length; i++) {
                if (data.salvate[i].TipoSalvataggio == 1 || data.salvate[i].Username === 'Giocatore ospite' ||
                    (data.salvate[i].TipoSalvataggio == 0 && data.salvate[i].Username === sessionStorage.getItem('username')) ||
                    (data.PartitaDoppia !== false && sessionStorage.getItem('numero_giocatori') === '2')
                    ) {
                    const tr = document.createElement('tr');
                    const td1 = document.createElement('td');
                    td1.setAttribute('id', i);
                    td1.textContent = data.salvate[i].idSalvate;
                    const td2 = document.createElement('td');
                    td2.textContent = data.salvate[i].Username;
                    const td3 = document.createElement('td');
                    td3.textContent = data.salvate[i].Data;
                    const td4 = document.createElement('td');
                    if (data.salvate[i].TipoSalvataggio === '0')
                        td4.textContent = 'Privato';
                    else
                        td4.textContent = 'Pubblico';
                    const td5 = document.createElement('td');
                    td5.textContent = data.salvate[i].Punteggio;
                    const td6 = document.createElement('td');
                    if (data.salvate[i].PartitaDoppia === 'false')
                        td6.textContent = 'No';
                    else
                        td6.textContent = 'Si';
                    const td7 = document.createElement('td');
                    td7.classList.add('bottone');
                    const bottone = document.createElement('button');
                    bottone.classList.add('bot_partita');
                    bottone.addEventListener('click', () => {
                        giocaPartitaSalvata(bottone.value)
                    });
                    bottone.textContent = 'Gioca';
                    bottone.value = i;
                    td7.appendChild(bottone);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tr.appendChild(td7);
                    tbody.appendChild(tr);
                }
                else {
                    continue;
                }
            }
            table.appendChild(tbody);
            salvate.parentNode.replaceChild(table, salvate);
        })
        .catch(error => console.log(error));


});

function giocaPartitaSalvata(qualeBottone) {
    // id prende il valore del contenuto del td con id = qualeBottone per passare al server l'id della partita da caricare
    const id = document.getElementById(qualeBottone).textContent;
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
                sessionStorage.setItem('partita', data.partita);
                if (data.partitaDoppia !== 'false')
                    sessionStorage.setItem('partitaDoppia', data.partitaDoppia);
                else 
                    sessionStorage.setItem('partitaDoppia', false);
                window.location.href = '../html/gioca.html';
            }
            else {
                alert(data.messaggio);
            }
        })
        .catch((error) => {
            console.error('Errore durante la richiesta: ' + error);
        });
}