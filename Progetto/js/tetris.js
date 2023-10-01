'use strict';

// definizione delle costanti utilizzate nel gioco
const nRow = 20;
const nCol = 10;

// definizione delle matrici che rappresentano i tetromini (momentaneamente non colorati)
const I = [
    [1, 1, 1, 1]
];
const T = [
    [0, 1, 0],
    [1, 1, 1]
];
const O = [
    [1, 1],
    [1, 1]
];
const L = [
    [0, 0, 1],
    [1, 1, 1]
];
const J = [
    [1, 0, 0],
    [1, 1, 1]
];
const S = [
    [0, 1, 1],
    [1, 1, 0]
];
const Z = [
    [1, 1, 0],
    [0, 1, 1]
];
const tetromino = [I, T, O, L, J, S, Z];
const colore = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];

// definizione delle classi utilizzate nel gioco
class Partita {
    constructor(nomeUtente, modalità, tipoPartita, punteggioInit, statoTabellone) {
        this.giocatore = nomeUtente;
        this.modalità = modalità;
        this.tipoPartita = tipoPartita;
        this.punteggio = punteggioInit;
        // this.tabellone = new Tabellone(statoTabellone); // statoTabellone è un array di 200 elementi, 0 se vuoto, lettera identificativa del colore se pieno 
    }

    toString() {
        // da capire come fare per passarla al db
    }
}
/*
class Tabellone {
    constructor(statoTabellone) {
        for (let i = 0; i < nRow * nCol; i++) {
            this.tabelloneAttuale[i] = statoTabellone[i];
        }
    } //questo costruttore non va una sega, ricorda che bisogna discriminare il caso di nuova partita (array con tutti 0) e il caso di partita salvata (array con i valori presi da statoTabellone)

    gravità() {

    }

    riposiziona() {

    }
}*/
class Tetromino {
    constructor(tipoT, rotazione, x, y) {
        this.tipoT = tipoT;
        this.rotazione = rotazione;
        this.posizione = [x, y];
    }

    ruotaDx() {

    }

    ruotaSx() {

    }

    muoviDx() {

    }

    muoviSx() {

    }

    muoviGiu() {

    }

    caduta() {

    }
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
    if (da_aprire === 'salvataggio_popup' && controllaRegole.className === 'aperto') {
        window.alert("Non si può aprire il popup di salvataggio finché il regolamento è aperto"); //magari sistema gli alert in qualche modo
        return;
    }
    else if (da_aprire === 'regolamento_popup' && controllaSalva.className === 'aperto') {
        window.alert("Non si può aprire il regolamento finché il popup di salvataggio è aperto");
        return;
    }
    daAprire.classList.add('aperto');
    daAprire.style.display = 'block';
    const container = document.getElementById('container');
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
}

// funzione che restituisce un tetromino casuale
function getTetromino() {
    let indiceTetromino = tetromino[Math.floor(Math.random() * tetromino.length)];
    let tetrominoCorrente = tetromino[indiceTetromino];
}

//funzione che restituisce un colore casuale
function getColore() {
    let indiceColore = Math.floor(Math.random() * colore.length);
    return indiceColore;
}

// funzione che inizializza una nuova partita prendendo, se la partita è salvata, i dati dal database
function iniziaPartita() {
    const partitaGiocatore1 = new Partita('admin', 'singleplayer', 'nuovaPartita', 0, []);

    if (partitaGiocatore1.tipoPartita === 'salvata') {
        // prendi i dati dal db e sostituisci i valori default di partitaGiocatore1 e partitaGiocatore2
    }

    // creazione del tabellone di gioco
    const tab = document.getElementById('tabellone');
    for (let i = 0; i < nRow; i++) {
        const riga = document.createElement('tr');
        riga.className = 'riga_tabellone';
        tab.appendChild(riga);

        for (let j = 0; j < nCol; j++) {
            const elementoTabellone = document.createElement('td');
            elementoTabellone.className = 'elem_tabellone';
            riga.appendChild(elementoTabellone);
        }
    }
    // inserimento del punteggio iniziale
    const nodePunteggio = document.createElement('p');
    nodePunteggio.style.marginBlockEnd = '0rem';
    nodePunteggio.style.fontSize = '4vw';
    const textnodePunteggio = document.createTextNode(partitaGiocatore1.punteggio);
    nodePunteggio.appendChild(textnodePunteggio);
    document.getElementById('punteggio').appendChild(nodePunteggio);

    // inserimento del nome utente
    const nodeUtente = document.createElement('p');
    const textnodeUtente = document.createTextNode(partitaGiocatore1.giocatore);
    nodeUtente.appendChild(textnodeUtente);
    document.getElementById('nome_giocatore1').appendChild(nodeUtente);

    if (partitaGiocatore1.modalità === 'multiplayer') {
        // i dati sul tipo di partita del secondo giocatore non sono rilevanti, se era salvata per il giocatore 1, lo sarà anche per il giocatore 2
        const partitaGiocatore2 = new Partita('admin', 'multiplayer', 'secondoGiocatore', 0, []);
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

document.onload = iniziaPartita();

const chiudiSalva = document.getElementById('chiudi_salvataggio');
chiudiSalva.addEventListener('click', function () {
    Chiudi('salvataggio_popup');
});

const chiudiRegole = document.getElementById('chiudi_regolamento');
chiudiRegole.addEventListener('click', function () {
    Chiudi('regolamento_popup');
});

const pausa = document.getElementById('pausa');
pausa.addEventListener('click', function () {
    PausaMobile();
});

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
        case 'Space':
            Pausa();
            break;
    }
});