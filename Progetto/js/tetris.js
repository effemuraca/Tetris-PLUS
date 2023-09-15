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

function Chiudi() {
    let da_chiudere = document.getElementById('popupContainer');
    da_chiudere.style.display = 'none';
}

let questa_partita = new Partita();
function createGame() {
    let questa_partita = new Partita('default', 'singleplayer', 'nuova');

    // inserimento del punteggio iniziale
    const node_punteggio = document.createElement('p');
    node_punteggio.style.marginBlockEnd = '0rem';
    const textnode_punteggio = document.createTextNode('Punteggio: ' + questa_partita.punteggio);
    node_punteggio.appendChild(textnode_punteggio);
    document.getElementById('punteggio').appendChild(node_punteggio);

    // discriminare le funzioni per pc (mettono un a capo dopo prossimo tet\punteggio e il valore) e quelle telefono che le lasxiano sulla stessa riga
    const node_tetronimo = document.createElement('p');
    const textnode_tetronimo = document.createTextNode('Prossimo Tetronimo: ' + 'L');
    node_tetronimo.appendChild(textnode_tetronimo);
    document.getElementById('prossimo_tetronimo').appendChild(node_tetronimo);

    // creazione del tabellone di gioco
    const n_row = 20;
    const n_col = 10;
    const main_con = document.getElementById('tabellone');
    for (let i = 0; i < n_row * n_col; i++) {
        /* if (questa_partita.tipo_partita == 'nuova') {
             questa_partita.stato_tabellone[i] = 0;
         }
         else {
             // copia elemento per elemento lo stato della partita salvata
         }*/
        const cella = document.createElement('div');
        cella.className = 'elemento_tabella';
        main_con.appendChild(cella);
        if (i % 11 == 0) {
            cella.style.float = 'none';
        }
    }


}



