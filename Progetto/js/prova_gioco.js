// definizione delle costanti utilizzate nel gioco
const nRow = 20;
const nCol = 10;

const tetromino = ['I', 'T', 'O', 'L', 'J', 'S', 'Z'];
const colore = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];


class Tetromino {
    constructor() {
        this.colore = getColore();
        this.rotazione = 0;
        this.x = 0;
        this.y = 3;
    }

    inserisci(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] == 1) {
                    tabellone.tabelloneAttuale[i + this.x][j + this.y] = colore[this.colore][0];
                }
            }
        }
    }

    cancella(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] == 1) {
                    tabellone.tabelloneAttuale[i + this.x][j + this.y] = 0;
                }
            }
        }
    }

    tMuoviDx(tabellone) {
        // inserire il controllo di fattibilità
        this.cancella(tabellone);
        this.y++;
        this.inserisci(tabellone);
    }

    tMuoviSx(tabellone) {
        // inserire il controllo di fattibilità
        this.cancella(tabellone);
        this.y--;
        this.inserisci(tabellone);
    }

    tMuoviGiu(tabellone) {
        // inserire il controllo di fattibilità
        this.cancella(tabellone);
        this.x--;
        this.inserisci(tabellone);
    }
}

class tetI extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'I';
        this.tetMatrice = [
            [1, 1, 1, 1]
        ];
    }

    tRuotaDx(tabellone) {

    }

    tRuotaSx(tabellone) {

    }
}

class tetT extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'T';
        this.tetMatrice = [
            [0, 1, 0],
            [1, 1, 1]
        ];
    }

    tRuotaDx(tabellone) {

    }

    tRuotaSx(tabellone) {

    }
}

class tetO extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'O';
        this.tetMatrice = [
            [1, 1],
            [1, 1]
        ];
    }
    tRuotaDx(tabellone) {
        return;
    }

    tRuotaSx(tabellone) {
        return;
    }
}

class tetL extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'L';
        this.tetMatrice = [
            [0, 0, 1],
            [1, 1, 1]
        ];
    }

    tRuotaDx(tabellone) {

    }

    tRuotaSx(tabellone) {

    }
}

class tetJ extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'J';
        this.tetMatrice = [
            [1, 0, 0],
            [1, 1, 1]
        ];
    }

    tRuotaDx(tabellone) {

    }

    tRuotaSx(tabellone) {

    }
}

class tetS extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'S';
        this.tetMatrice = [
            [0, 1, 1],
            [1, 1, 0]
        ];
    }

    tRuotaDx(tabellone) {

    }

    tRuotaSx(tabellone) {

    }
}

class tetZ extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'Z';
        this.tetMatrice = [
            [1, 1, 0],
            [0, 1, 1]
        ];
    }

    tRuotaDx(tabellone) {

    }

    tRuotaSx(tabellone) {

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
}

function getTetromino() {
    const qualeTet = tetromino[Math.floor(Math.random() * tetromino.length)];
    return qualeTet;
}

//funzione che restituisce un colore casuale
function getColore() {
    const indiceColore = Math.floor(Math.random() * colore.length);
    return indiceColore;
}

function stampaTabellone(tabellone) {
    for (let i = 0; i < nRow; i++) {
        const stringaRiga = tabellone.tabelloneAttuale[i].join(' ');
        console.log(stringaRiga);
    }
}

let tabellone = new Tabellone();
let tipoTet = getTetromino();
let tetAtttivo;
switch (tipoTet) {
    case 'I':
        tetAtttivo = new tetI();
        break;
    case 'T':
        tetAtttivo = new tetT();
        break;
    case 'O':
        tetAtttivo = new tetO();
        break;
    case 'L':
        tetAtttivo = new tetL();
        break;
    case 'J':
        tetAtttivo = new tetJ();
        break;
    case 'S':
        tetAtttivo = new tetS();
        break;
    case 'Z':
        tetAtttivo = new tetZ();
        break;
}
tetAtttivo.inserisci(tabellone);
stampaTabellone(tabellone);
console.log('\n');
tetAtttivo.tMuoviDx(tabellone);
stampaTabellone(tabellone);