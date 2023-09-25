'use strict';

// definizione degli oggetti utili all'implementazione del gioco
function Partita(nomeUtente = 'default', modalità = 'default', tipoPartita = 'default', punteggioInit = 0) {
    this.giocatore = nomeUtente;
    this.modalità = modalità;
    this.tipoPartita = tipoPartita;
    this.punteggio = punteggioInit;
}

function Tabellone(statoTabellone = []) {
    this.stato_iniziale = statoTabellone;
    this.gravità = function () {

    };
    this.riposiziona = function () {

    };
}

function Tetromino(tipoT, rotazione, x, y) {
    this.tipoT = tipoT;
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

    this.caduta = function () {
    };
}

// funzioni per la gestione dei popup di salvataggio e regolamento
function Chiudi(da_chiudere) {
    const daChiudere = document.getElementById(da_chiudere);
    daChiudere.style.display = 'none';
    daChiudere.classList.remove('aperto');
    const container = document.getElementById('container');
    container.style.backgroundColor = 'rgba(0, 0, 0, 0)';
}

function Apri(da_aprire) {
    const daAprire = document.getElementById(da_aprire);
    const controllaSalva = document.getElementById('salvataggio_popup');
    const controllaRegole = document.getElementById('regolamento_popup');
    if (da_aprire === 'salvataggio_popup' & controllaRegole.className === 'aperto') {
        window.alert("Non si può aprire il popup di salvataggio finché il regolamento è aperto"); //magari sistema gli alert in qualche modo
        return;
    }
    else if (da_aprire === 'regolamento_popup' & controllaSalva.className === 'aperto') {
        window.alert("Non si può aprire il regolamento finché il popup di salvataggio è aperto");
        return;
    }
    daAprire.classList.add('aperto');
    daAprire.style.display = 'block';
    const container = document.getElementById('container');
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
}

// funzione che mette in pausa il gioco
function Pausa() {

}

// funzione che inizializza una nuova partita prendendo, se la partita è salvata, i dati dal database
function createGame() {
    const questaPartita = new Partita('default', 'singleplayer', 'nuova');

    // inserimento del punteggio iniziale
    const nodePunteggio = document.createElement('p');
    nodePunteggio.style.marginBlockEnd = '0rem';
    //   nodePunteggio.style.fontSize = '4vw';
    const textnodePunteggio = document.createTextNode('Punteggio: ' + questaPartita.punteggio);
    nodePunteggio.appendChild(textnodePunteggio);
    document.getElementById('punteggio').appendChild(nodePunteggio);

    // discriminare le funzioni per pc (mettono un a capo dopo prossimo tet\punteggio e il valore) e quelle telefono che le lasciano sulla stessa riga
    const nodeTetronimo = document.createElement('p');
    //   nodeTetronimo.style.fontSize = '4vw';
    const textnodeTetronimo = document.createTextNode('Prossimo Tetronimo: ' + 'L');
    nodeTetronimo.appendChild(textnodeTetronimo);
    document.getElementById('prossimo_tetronimo').appendChild(nodeTetronimo);

    // creazione del tabellone di gioco
    const nRow = 20;
    const nCol = 10;
    const tab = document.getElementById('tabellone');
    for (let i = 0; i < nRow; i++) {
        const riga = document.createElement('tr');
        riga.className = 'riga_tabellone';
        tab.appendChild(riga);

        for (let j = 0; j < nCol; j++) {
            const elem = document.createElement('td');
            elem.className = 'elem_tabellone';
            riga.appendChild(elem);
        }
    }
}

const salva = document.getElementById('salvataggio');
salva.addEventListener('click', function () {
    Apri('salvataggio_popup');
});

const regole = document.getElementById('regolamento');
regole.addEventListener('click', function () {
    Apri('regolamento_popup');
});

document.getElementById('chiudi_salvataggio').addEventListener('click', function (event) {
    event.preventDefault()
});

const chiudiSalva = document.getElementById('chiudi_salvataggio');
chiudiSalva.addEventListener('click', function () {
    Chiudi('salvataggio_popup');
});

const chiudiRegole = document.getElementById('chiudi_regolamento');
chiudiRegole.addEventListener('click', function () {
    Chiudi('regolamento_popup');
});

const pausa = document.getElementById('pausa');
pausa.addEventListener('click', Pausa);

// creazione eventi per il controllo dei tasti da mobile
const rotazioneDx = document.getElementById('ruota_dx');
rotazioneDx.addEventListener('click', function () {
    // tetromino.ruotaDx();
});

const rotazioneSx = document.getElementById('ruota_sx');
rotazioneSx.addEventListener('click', function () {
    // tetromino.ruotaSx();
});

const muoviDx = document.getElementById('muovi_dx');
muoviDx.addEventListener('click', function () {
    // tetromino.muoviDx();
});

const muoviSx = document.getElementById('muovi_sx');
muoviSx.addEventListener('click', function () {
    // tetromino.muoviSx();
});

const muoviGiu = document.getElementById('muovi_giu');
muoviGiu.addEventListener('click', function () {
    // tetromino.muoviGiu();
});

// creazione eventi per il controllo dei tasti da pc
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'E':
            // tetromino.ruotaDx();
            break;
        case 'Q':
            // tetromino.ruotaSx();
            break;
        case 'S':
            // tetromino.muoviGiu();
            break;
        case 'A':
            // tetromino.muoviSx();
            break;
        case 'D':
            // tetromino.muoviDx();
            break;
        case 'W':
            // tetromino.caduta();
            break;
    }
});