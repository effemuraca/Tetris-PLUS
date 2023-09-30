// definizione delle costanti utilizzate nel gioco
const nRow = 20;
const nCol = 10;

const tetromino = ['I', 'T', 'O', 'L', 'J', 'S', 'Z'];
const colore = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];

class Tetromino {
    constructor(matrice = []) {
        this.colore = getColore();
        this.rotazione = 0;
        this.tetMatrice = matrice;
        this.x = 3;
        this.y = 0;
    }

    checkCollisione(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] == 1 & tabellone.tabelloneAttuale[i + this.y][j + this.x] !== 0)
                    return false;
            }
        }
        return true;
    }

    inserisci(tabellone) {
        if (this.checkCollisione(tabellone) === false) {
            return;
        }
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 1) {
                    tabellone.tabelloneAttuale[i + this.y][j + this.x] = colore[this.colore][0];
                }
            }
        }
    }

    cancella(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 1) {
                    tabellone.tabelloneAttuale[i + this.y][j + this.x] = 0;
                }
            }
        }
    }

    tMuoviDx(tabellone) {
        if (this.x + this.tetMatrice[0].length >= nCol)
            return;
        for (let i = 0; i < this.tetMatrice.length; i++) {
            if (tabellone.tabelloneAttuale[i + this.y][this.x + this.tetMatrice[i].length] != 0)
                return;
        }
        this.cancella(tabellone);
        if (this.checkCollisione(tabellone) === false) {
            this.inserisci(tabellone);
            return;
        }
        this.x++;
        this.inserisci(tabellone);
    }

    tMuoviSx(tabellone) {
        if (this.x + this.tetMatrice[0].length <= 0)
            return;
        for (let i = 0; i < this.tetMatrice.length; i++) {
            if (tabellone.tabelloneAttuale[i + this.y][this.x + this.tetMatrice[i].length] != 0)
                return;
        }
        this.cancella(tabellone);
        if (this.checkCollisione(tabellone) === false) {
            this.inserisci(tabellone);
            return;
        }
        this.x--;
        this.inserisci(tabellone);
    }

    tMuoviGiu(tabellone) {
        if (this.y + this.tetMatrice.length >= nRow)
            return;
        for (let i = 0; i < this.tetMatrice[0].length; i++) {
            if (tabellone.tabelloneAttuale[this.y + this.tetMatrice.length][i + this.x] != 0)
                return;
        }
        this.cancella(tabellone);
        if (this.checkCollisione(tabellone) === false) {
            this.inserisci(tabellone);
            return;
        }
        this.y++;
        this.inserisci(tabellone);
    }

    //funzione che copia il tetromino attuale in una matrice temporanea (utile ad entrambe le rotazioni)
    ruotaPreliminari() {
        // matrice di dimensione nxn (dove n è il massimo tra lunghezza e larghezza del tetromino)
        // questa scelta è stata fatta per rendere piu semplice la rotazione attorno ad un polo (si evita di avere accessi fuori dalla matrice)
        let matriceTemp = [];
        let max = Math.max(this.tetMatrice.length, this.tetMatrice[0].length);
        // inizializzazione della matrice temporanea
        for (let i = 0; i < max; i++) {
            matriceTemp[i] = [];
            for (let j = 0; j < max; j++) {
                matriceTemp[i][j] = 0;
            }
        }
        // copia del tetromino nella matrice temporanea
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 0) {
                    matriceTemp[i + this.polo[0]][j + this.polo[1]] = 0;
                }
                else {
                    matriceTemp[i + this.polo[0]][j + this.polo[1]] = this.tetMatrice[i][j];
                }
            }
        }
        console.log(matriceTemp);
    }

    // funzioni generiche per la rotazione (le classi derivate inizializzazono il proprio polo di rotazione e usano le funzioni generiche) 
    tRuotaDx(tabellone) {
        this.ruotaPreliminari();
        // rotazione della matrice temporanea intorno all'elemento (1,1) della matrice temporanea


    }

    tRuotaSx(tabellone) {
        this.ruotaPreliminari();
        // rotazione della matrice temporanea intorno all'elemento (1,1) della matrice temporanea

    }
}

class tetI extends Tetromino {
    constructor() {
        super();
        this.tipoT = 'I';
        this.tetMatrice = [
            [1, 1, 1, 1]
        ];
        this.polo = [0, 0];
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
        this.polo = [1, 1];
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
        // il polo non è presente in quanto la rotazione non ha effetto sul blocco O
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
        this.polo = [1, 1];
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
        this.polo = [1, 1];
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
        this.polo = [1, 0];
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
        this.polo = [1, 0];
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

/*
for (let i = 0; i < 3; i++) {
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
console.log(tetAtttivo.tetMatrice);
tetAtttivo.tRuotaDx(tabellone);
}*/

let tipoTet = new tetI();
tipoTet.inserisci(tabellone);
console.log(tipoTet.tetMatrice);
tipoTet.tRuotaDx(tabellone);