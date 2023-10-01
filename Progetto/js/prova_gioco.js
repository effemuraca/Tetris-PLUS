// definizione delle costanti utilizzate nel gioco
const nRow = 20;
const nCol = 10;

const tetromino = ['I', 'T', 'O', 'L', 'J', 'S', 'Z'];
const colore = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];

const statoGioco = {
    inCorso: 1,
    finita: 0,
    inPausa: -1,
};

class Tetromino {
    constructor(matrice = []) {
        this.colore = getColore();
        this.rotazione = 0;
        this.tetMatrice = matrice;
        this.x = 3;
        this.y = 0;
        this.attivo = true;
    }

    checkCollisione(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] == 1 && tabellone.tabelloneAttuale[i + this.y][j + this.x] !== 0) {
                    // se il pezzo è nella posizione iniziale e non è possibile inserirlo, la partita è finita
                    if (this.y === 0 && this.x === 3)
                        tabellone.statoPartita = 0;
                    return false;
                }
            }
        }
        return true;
    }

    inserisci(tabellone) {
        if (this.checkCollisione(tabellone) === false)
            return;
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 1) {
                    tabellone.tabelloneAttuale[i + this.y][j + this.x] = colore[this.colore];
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
        if (this.y + this.tetMatrice.length >= nRow) {
            this.attivo = false;
            return;
        }
        for (let i = 0; i < this.tetMatrice[0].length; i++) {
            if (tabellone.tabelloneAttuale[this.y + this.tetMatrice.length][i + this.x] != 0) {
                this.attivo = false;
                return;
            }
        }
        this.cancella(tabellone);
        if (this.checkCollisione(tabellone) === false) {
            this.inserisci(tabellone);
            return;
        }
        this.y++;
        this.inserisci(tabellone);
        return;
    }
    /*
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
    
        }*/
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
    constructor(statoTabellone, punteggio) {
        // manca il caso in cui il tabellone non è vuoto e viene preso dal db (statoTabellone rappresenta il tabellone della partita presa dal db)
        this.tabelloneAttuale = [];
        for (let i = 0; i < nRow; i++) {
            this.tabelloneAttuale[i] = [];
            for (let j = 0; j < nCol; j++) {
                this.tabelloneAttuale[i][j] = 0;
            }
        }
        // manca il caso in cui il tabellone non è vuoto e viene preso dal db (punteggio rappresenta il punteggio della partita presa dal db)
        this.punteggio = 0;
        this.statoPartita = statoGioco.inCorso;
        // statoGravita rappresenta quanto effetto ha la gravità sul tetromino attivo
        this.statoGravita = 1;
    }

    //funzione che controlla se una riga è piena
    checkRigaPiena(riga) {
        for (let i = 0; i < nCol; i++) {
            if (this.tabelloneAttuale[riga][i] === 0)
                return false;
        }
        return true;
    }

    //funzione che cancella una riga piena e sposta le righe sopra di essa di una posizione verso il basso
    cancellaRighe() {
        let riga = nRow - 1;
        // quanteRighe è una variabile che tiene conto di quante righe sono state cancellate
        let quanteRighe = 0;
        while (riga >= 0) {
            if (this.checkRigaPiena(riga) === true) {
                this.tabelloneAttuale.splice(riga, 1);
                this.tabelloneAttuale.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                quanteRighe++;
            }
            else {
                riga--;
            }
        }
        // il punteggio è soggetto ad un moltiplicatore che tiene conto del numero di righe cancellate
        this.punteggio += quanteRighe * 100 + (quanteRighe - 1) * 50;
    }

    // la funzione fa cadere il tetromino attivo verso il basso, con un intervallo dipendente dallo statoGravita
    gravita(tetromino) {
        if (tetromino.attivo === true) {
            setInterval(() => {
                tetromino.tMuoviGiu(this);
            }, 3000 * this.statoGravita);
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

function Pausa(tabellone) {
    if (tabellone.statoPartita === statoGioco.inCorso)
        tabellone.statoPartita = statoGioco.inPausa;
    else
        tabellone.statoPartita = statoGioco.inCorso;
}

// funzione che mette in pausa/fa riprendere il gioco (versione mobile)
function PausaMobile(tabellone) {
    const immaginePausa = document.getElementById('immagine_pausa');
    const immagineRiprendi = document.getElementById('immagine_riprendi');
    if (tabellone.statoPartita === statoGioco.inCorso) {
        immaginePausa.style.display = 'block';
        immagineRiprendi.style.display = 'none';
        tabellone.statoPartita = statoGioco.inPausa;
    }
    else {
        immaginePausa.style.display = 'none';
        immagineRiprendi.style.display = 'block';
        tabellone.statoPartita = statoGioco.inCorso;
    }
}

function nuovaPartita() {
    const tabellone = new Tabellone();
    while (tabellone.statoPartita === statoGioco.inCorso) {
        loopDiGioco(tabellone);
    }
}

// Funzione principale del loop di gioco
function loopDiGioco(tabellone) {
    let tipoTet = getTetromino();
    let tetAttivo;
    switch (tipoTet) {
        case 'I':
            tetAttivo = new tetI();
            break;
        case 'T':
            tetAttivo = new tetT();
            break;
        case 'O':
            tetAttivo = new tetO();
            break;
        case 'L':
            tetAttivo = new tetL();
            break;
        case 'J':
            tetAttivo = new tetJ();
            break;
        case 'S':
            tetAttivo = new tetS();
            break;
        case 'Z':
            tetAttivo = new tetZ();
            break;
    }
    tetAttivo.inserisci(tabellone);
    while (tetAttivo.attivo === true) {
        // capire che fare (idealmente il loop dovrebbe permettere all'utente di fare le sue cose, finche il tetronimo non cade)
    }
}
