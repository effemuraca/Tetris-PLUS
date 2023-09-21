'use strict';

// definizione degli oggetti utili all'implementazione del gioco
function Partita(nome_utente = 'default', modalità = 'default', tipo_partita = 'default', punteggio_init = 0) {
    this.giocatore = nome_utente;
    this.modalità = modalità;
    this.tipo_partita = tipo_partita;
    this.punteggio = punteggio_init;
}

function Tabellone(stato_tabellone = []) {
    this.stato_iniziale = stato_tabellone;
    this.gravità = function () {

    };
    this.riposiziona = function () {

    };
}
function Tetromino(tipo_t, rotazione, x, y) {
    this.tipo_t = tipo_t;
    this.rotazione = rotazione;
    this.posizione = [x, y];
    this.ruotaDx = function () {

    };

    this.ruotaSx = function () {

    };

    this.muoviDx = function () {

    };
    this.muoviSx = function () {

    };

    this.muoviGiu = function () {
    };
}

function Informazioni() {

}

function Chiudi(daChiudere) {
    let da_chiudere = document.getElementById(daChiudere);
    da_chiudere.style.display = 'none';
    da_chiudere.classList.remove('aperto');
    let container = document.getElementById('container');
    container.style.backgroundColor = 'rgba(0, 0, 0, 0)';
}

function Apri(daAprire) {
    let da_aprire = document.getElementById(daAprire);
    let controlla_salva = document.getElementById('salvataggio');
    let controlla_regole = document.getElementById('regolamento');
    if (daAprire == 'salvataggio' & controlla_regole.className == 'aperto') {
        window.alert("Non si può aprire il popup di salvataggio finché il regolamento è aperto"); //magari sistema gli alert in qualche modo
        return;
    }
    else if (daAprire == 'regolamento' & controlla_salva.className == 'aperto') {
        window.alert("Non si può aprire il regolamento finché il popup di salvataggio è aperto");
        return;
    }
    da_aprire.classList.add('aperto');
    da_aprire.style.display = 'block';
    let container = document.getElementById('container');
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
}

document.getElementById('chiudi_popup').addEventListener('click', function (event) {
    event.preventDefault()
});

function createGame() {
    let questa_partita = new Partita('default', 'singleplayer', 'nuova');

    // inserimento del punteggio iniziale
    const node_punteggio = document.createElement('p');
    node_punteggio.style.marginBlockEnd = '0rem';
    //   node_punteggio.style.fontSize = '4vw';
    const textnode_punteggio = document.createTextNode('Punteggio: ' + questa_partita.punteggio);
    node_punteggio.appendChild(textnode_punteggio);
    document.getElementById('punteggio').appendChild(node_punteggio);

    // discriminare le funzioni per pc (mettono un a capo dopo prossimo tet\punteggio e il valore) e quelle telefono che le lasxiano sulla stessa riga
    const node_tetronimo = document.createElement('p');
    //   node_tetronimo.style.fontSize = '4vw';
    const textnode_tetronimo = document.createTextNode('Prossimo Tetronimo: ' + 'L');
    node_tetronimo.appendChild(textnode_tetronimo);
    document.getElementById('prossimo_tetronimo').appendChild(node_tetronimo);

    // creazione del tabellone di gioco
    const n_row = 20;
    const n_col = 10;
    const tab = document.getElementById('tabellone');
    for (let i = 0; i < n_row; i++) {
        const riga = document.createElement('tr');
        riga.className = 'riga_tabellone';
        tab.appendChild(riga);

        for (let j = 0; j < n_col; j++) {
            const elem = document.createElement('td');
            elem.className = 'elem_tabellone';
            riga.appendChild(elem);
        }
    }
}



