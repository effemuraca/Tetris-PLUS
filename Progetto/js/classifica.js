const salvate = document.getElementById('tab');

document.addEventListener('DOMContentLoaded', function () {
    fetch('../php/classifica.php')
        .then(response => {
            if (response.ok) {
                console.log('Richiesta di caricamento delle partite in classifica al server effettuata con successo');
                return response.json();
            }
            else {
                console.log('Errore nella richiesta di caricamento delle partite in classifica al server');
            }
        })
        .then(data => {
            if (data.length == 0) {
                const p = document.createElement('p');
                p.classList.add('db_vuoto');
                p.textContent = data.messaggio;
                salvate.parentNode.replaceChild(p, salvate);
                return;
            }
            else {
                const table = document.createElement('table');
                table.setAttribute('id', 'classifica');
                const thead = document.createElement('thead');
                const tr = document.createElement('tr');
                const th1 = document.createElement('th');
                th1.textContent = 'Posizione';
                const th2 = document.createElement('th');
                th2.textContent = 'Username';
                const th3 = document.createElement('th');
                th3.textContent = 'Data Partita';
                const th4 = document.createElement('th');
                th4.textContent = 'Punteggio';
                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                thead.appendChild(tr);
                table.appendChild(thead);
                const tbody = document.createElement('tbody');
                for (let i = 0; i < data.length; i++) {
                    const tr = document.createElement('tr');
                    const td1 = document.createElement('td');
                    td1.textContent = i + 1;
                    const td2 = document.createElement('td');
                    td2.textContent = data.classifica[i].Username;
                    const td3 = document.createElement('td');
                    td3.textContent = data.classifica[i].Data;
                    const td4 = document.createElement('td');
                    td4.textContent = data.classifica[i].Punteggio;
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                salvate.parentNode.replaceChild(table, salvate);
            }
        })
        .catch(error => console.log(error));
});