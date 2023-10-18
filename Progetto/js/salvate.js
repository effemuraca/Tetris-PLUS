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
            if (data.length == 0)
                alert('Non ci sono partite salvate');
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
            th6.textContent = 'Gioca Partita';
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            thead.appendChild(tr);
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            for (let i = 0; i < data.length; i++) {
                if (data.salvate[i].TipoSalvataggio === 'pubblico' || (data.salvate[i].TipoSalvataggio === 'privato' && data.salvate[i].Username === sessionStorage.getItem('username'))) {
                    const tr = document.createElement('tr');
                    tr.setAttribute('id', i);
                    const td1 = document.createElement('td');
                    td1.textContent = data.salvate[i].idSalvate;
                    const td2 = document.createElement('td');
                    td2.textContent = data.salvate[i].Username;
                    const td3 = document.createElement('td');
                    td3.textContent = data.salvate[i].Data;
                    const td4 = document.createElement('td');
                    td4.textContent = data.salvate[i].TipoSalvataggio;
                    const td5 = document.createElement('td');
                    td5.textContent = data.salvate[i].Punteggio;
                    const td6 = document.createElement('td');
                    td6.classList.add('bottone');
                    const bottone = document.createElement('button');
                    bottone.classList.add('bot_partita');
                    bottone.textContent = 'Gioca';
                    bottone.value = i;
                    td6.appendChild(bottone);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
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