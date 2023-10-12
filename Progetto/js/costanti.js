'use strict';

// definizione delle costanti utilizzate nel gioco
const nRow = 20;
const nCol = 10;
const nGiocatori = sessionStorage.getItem('numero_giocatori');
let datiGioco;

const tetromino = ['I', 'T', 'O', 'L', 'J', 'S', 'Z'];
const colore = ['red', 'coral', 'yellow', 'green', 'cyan', 'purple', 'blue'];
const speciale = ['destroyer', 'dinamite', 'resetter', 'accelerator', 'mist'];

const statoGioco = {
    inCorso: 1,
    finita: 0,
    inPausa: -1,
};




