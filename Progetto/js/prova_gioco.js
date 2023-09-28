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

class Tetromino {
    constructor() {
        this.tipoT = getTetromino();
        this.colore = getColore();
        this.rotazione = 0;
        this.x = 0;
        this.y = 3;
    }
}


class Tabellone {
    constructor(statoTabellone) {
        this.tabelloneAttuale = [];
        for (let i = 0; i < nRow; i++) {
            this.tabelloneAttuale[i] = [];
            for (let j = 0; j < nCol; j++) {
                this.tabelloneAttuale[i][j] = 0;
            }
        }
    }

    inserisci(tet) {
        for (let i = 0; i < tet.tipoT.length; i++) {
            for (let j = 0; j < tet.tipoT[i].length; j++) {
                if (tet.tipoT[i][j] == 1) {
                    this.tabelloneAttuale[i + tet.x][j + tet.y] = colore[tet.colore][0];
                }
            }
        }
    }

    cancella(tet) {
        for (let i = 0; i < tet.tipoT.length; i++) {
            for (let j = 0; j < tet.tipoT[i].length; j++) {
                if (tet.tipoT[i][j] == 1) {
                    this.tabelloneAttuale[i][j + 3] = 0;
                }
            }
        }
    }

    riposiziona() {

    }

    //funzioni che agiscono sul tetronimo, ma nel contesto del tabellone a cui appartiene (non avrebbe senso muovere a destra un tetromino se non si considera il fatto che si trovi dentro qualcosa in cui può muoversi)
    tRuotaDx(tet) {

    }

    tRuotaSx(tet) {

    }

    tMuoviDx(tet) {
        // inserire il controllo di fattibilità
        this.cancella(tet);
        tet.y++;
        this.inserisci(tet);
    }

    tMuoviSx(tet) {
        // inserire il controllo di fattibilità
        this.cancella(tet);
        tet.y--;
        this.inserisci(tet);
    }

    tMuoviGiu(tet) {
        // inserire il controllo di fattibilità
        this.cancella(tet);
        tet.x--;
        this.inserisci(tet);
    }

    tCaduta(tet) {
        // da capire se tenerla o meno
    }
}

function getTetromino() {
    let indiceTetromino = tetromino[Math.floor(Math.random() * tetromino.length)];
    return indiceTetromino;
}

//funzione che restituisce un colore casuale
function getColore() {
    let indiceColore = Math.floor(Math.random() * colore.length);
    return indiceColore;
}

function stampaTabellone(tabellone) {
    for (let i = 0; i < nRow; i++) {
        const stringaRiga = tabellone.tabelloneAttuale[i].join(' ');
        console.log(stringaRiga);
    }
}

let tabellone = new Tabellone();
let nuovoT = new Tetromino();
tabellone.inserisci(nuovoT);
stampaTabellone(tabellone);
console.log('\n');
tabellone.tMuoviDx(nuovoT);
stampaTabellone(tabellone);