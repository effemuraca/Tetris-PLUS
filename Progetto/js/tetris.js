'use strict';

// definizione delle costanti utilizzate nel gioco
const nRow = 20;
const nCol = 10;

const tetromino = ['I', 'T', 'O', 'L', 'J', 'S', 'Z'];
const colore = ['red', 'orange', 'yellow', 'green', 'cyan', 'purple', 'blue'];

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
                    if (this.y === 0 && this.x === 3) {
                        tabellone.statoPartita = statoGioco.finita;
                        this.attivo = false;
                    }
                    return false;
                }
            }
        }
        return true;
    }

    inserisci(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita)
            return;
        if (this.checkCollisione(tabellone) === false)
            return;
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 1) {
                    tabellone.tabelloneAttuale[i + this.y][j + this.x] = colore[this.colore];
                    let elemDOM = document.getElementsByClassName('elem_tabellone')[(i + this.y) * nCol + j + this.x];
                    elemDOM.style.backgroundColor = colore[this.colore];
                }
            }
        }
    }

    cancella(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 1) {
                    tabellone.tabelloneAttuale[i + this.y][j + this.x] = 0;
                    let elemDOM = document.getElementsByClassName('elem_tabellone')[(i + this.y) * nCol + j + this.x];
                    elemDOM.style.backgroundColor = 'rgba(23, 36, 126, 0.9)';
                }
            }
        }
    }

    tMuoviDx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita)
            return;
        this.cancella(tabellone);
        this.x++;
        if (this.checkCollisione(tabellone) === false) {
            this.x--;
            this.inserisci(tabellone);
            return;
        }
        this.inserisci(tabellone);
    }

    tMuoviSx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita)
            return;
        this.cancella(tabellone);
        this.x--;
        if (this.checkCollisione(tabellone) === false) {
            this.x++;
            this.inserisci(tabellone);
            return;
        }
        this.inserisci(tabellone);
    }

    tMuoviGiu(tabellone, gravita) {
        console.log("SONO UN PEZZO STRONZO");
        if (tabellone.statoPartita === statoGioco.finita)
            return;
        if (this.y + this.tetMatrice.length >= nRow) {
            this.attivo = false;
            clearInterval(gravita);
            return;
        }
        this.cancella(tabellone);
        this.y++;
        if (this.checkCollisione(tabellone) === false) {
            this.y--;
            this.inserisci(tabellone);
            this.attivo = false;
            clearInterval(gravita);
            return;
        }
        tabellone.punteggio += 10;
        updatePunteggioDOM(tab.punteggio);
        this.inserisci(tabellone);
    }
    // funzioni generiche per la rotazione (le classi derivate inizializzazono il proprio polo di rotazione e usano le funzioni generiche) 
    tRuotaDx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita)
            return;
        let matriceTemp = [];
        const tRighe = this.tetMatrice.length;
        const tColonne = this.tetMatrice[0].length;
        // inizializzazione della matrice temporanea
        for (let i = 0; i < tColonne; i++) {
            matriceTemp[i] = [];
            for (let j = 0; j < tRighe; j++) {
                matriceTemp[i][j] = 0;
            }
        }

        for (let i = 0; i < tRighe; i++) {
            for (let j = 0; j < tColonne; j++) {
                // dX e dY sono le distanze del blocco dalla posizione del polo di rotazione
                const dX = i - this.polo[0];
                const dY = j - this.polo[1];
                // nX e nY sono le nuove coordinate del blocco dopo la rotazione
                const nX = this.polo[0] + dY;
                let nY = this.polo[1] - dX;
                if (nY < 0)
                    nY = Math.abs(nY);
                matriceTemp[nX][nY] = this.tetMatrice[i][j];
            }
        }
        this.cancella(tabellone);
        if (checkCollisione(matriceTemp, this.x, this.y, tabellone) === false) {
            this.inserisci(tabellone);
            return;
        }
        this.tetMatrice = matriceTemp;
        this.inserisci(tabellone);
    }

    tRuotaSx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita)
            return;
        let matriceTemp = [];
        const tRighe = this.tetMatrice.length;
        const tColonne = this.tetMatrice[0].length;
        // inizializzazione della matrice temporanea
        for (let i = 0; i < tColonne; i++) {
            matriceTemp[i] = [];
            for (let j = 0; j < tRighe; j++) {
                matriceTemp[i][j] = 0;
            }
        }

        for (let i = 0; i < tRighe; i++) {
            for (let j = 0; j < tColonne; j++) {
                const dX = i - this.polo[0];
                const dY = j - this.polo[1];
                const nX = this.polo[0] + dY;
                let nY = this.polo[1] - dX;
                console.log(nX, nY);
                if (nY < 0)
                    nY = Math.abs(nY);
                matriceTemp[nX][nY] = this.tetMatrice[i][j];
            }
        }

        this.cancella(tabellone);

        if (checkCollisione(matriceTemp, this.x, this.y, tabellone) === false) {
            this.inserisci(tabellone);
            return;
        }
        this.tetMatrice = matriceTemp;
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
        this.polo = [0, 0]

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
        this.polo = [1, 1];
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
        this.polo = [1, 1];
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
        let righeCancellate = 0;

        while (riga >= 0) {
            if (this.checkRigaPiena(riga)) {
                // rimozione della riga piena
                this.tabelloneAttuale.splice(riga, 1);
                // aggiunta di una nuova riga vuota in cima al tabellone
                this.tabelloneAttuale.unshift(new Array(nCol).fill(0));
                righeCancellate++;
                stampaTabellone(tab);
            } else {
                riga--;
            }
        }

        if (righeCancellate > 0) {
            this.riscriviTabelloneDOM();
            this.punteggio += righeCancellate * 100 + (righeCancellate - 1) * 50;
            updatePunteggioDOM(this.punteggio);
        }
    }

    riscriviTabelloneDOM() {
        console.log(document.getElementsByClassName('elem_tabellone'));
        for (let i = 0; i < nRow; i++) {
            for (let j = 0; j < nCol; j++) {
                const elemDOM = document.getElementsByClassName('elem_tabellone')[i * nCol + j];
                if (this.tabelloneAttuale[i][j] === 0) {
                    elemDOM.style.backgroundColor = 'rgba(23, 36, 126, 0.9)';
                } else {
                    elemDOM.style.backgroundColor = this.tabelloneAttuale[i][j];
                }
            }
        }
    }
    
    // la funzione fa cadere il tetromino attivo verso il basso, con un intervallo dipendente dallo statoGravita
    gravita(tetromino) {
        if (tetromino.attivo === true) {
            const gravita = setInterval(() => {
                tetromino.tMuoviGiu(this, gravita);
            }, 1500 * this.statoGravita);

        }
    }
}

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
    nodePunteggio.id = 'punteggioAttuale';
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

// overloading della funzione checkCollisione per le matrici generiche (utile per controllare la fattibilità della rotazione)

function checkCollisione(matrice, x, y, tabellone) {
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            if (matrice[i][j] == 1 && tabellone.tabelloneAttuale[i + y][j + x] !== 0)
                return false;
        }
    }
    return true;
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
    console.log('\n');
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

function updatePunteggioDOM(punteggio) {
    const nodePunteggio = document.getElementById('punteggioAttuale').firstChild;
    nodePunteggio.nodeValue = punteggio;
}

function nuovoTetrominoDOM(tet) {
    // da implementare
}

function finePartita() {
    // funzione che fa apparire un div che dice quanti punti sono stati fatti e che la partita è terminata
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
    tet.tRuotaDx(tab);
});

const rotazioneSx = document.getElementById('ruota_sx');
rotazioneSx.addEventListener('click', function () {
    tet.tRuotaSx(tab);
});

const muoviDx = document.getElementById('muovi_dx');
muoviDx.addEventListener('click', function () {
    tet.tMuoviDx(tab);
});

const muoviSx = document.getElementById('muovi_sx');
muoviSx.addEventListener('click', function () {
    tet.tMuoviSx(tab);
});

const muoviGiu = document.getElementById('muovi_giu');
muoviGiu.addEventListener('click', function () {
    tet.tMuoviGiu(tab);
});

// creazione eventi per il controllo dei tasti da pc
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'e':
            tet.tRuotaDx(tab);
            break;
        case 'q':
            tet.tRuotaSx(tab);
            break;
        case 's':
            tet.tMuoviGiu(tab);
            break;
        case 'a':
            tet.tMuoviSx(tab);
            break;
        case 'd':
            tet.tMuoviDx(tab);
            break;
        case 'Space':
            Pausa();
            break;
    }
});

let tipoTet = getTetromino();
let tet;
switch (tipoTet) {
    case 'I':
        tet = new tetI();
        break;
    case 'T':
        tet = new tetT();
        break;
    case 'O':
        tet = new tetO();
        break;
    case 'L':
        tet = new tetL();
        break;
    case 'J':
        tet = new tetJ();
        break;
    case 'S':
        tet = new tetS();
        break;
    case 'Z':
        tet = new tetZ();
        break;
}
const tab = new Tabellone();
tet.inserisci(tab);
nuovoTetrominoDOM(tet);
tab.gravita(tet);

let gioco =
    setInterval(() => {
        if (tab.statoPartita === statoGioco.inPausa) {
            return;
        }
        if (tab.statoPartita === statoGioco.finita) {
            clearInterval(gioco);
            finePartita();
            return;
        }
        if (tet.attivo === false) {
            tab.cancellaRighe();
            tipoTet = getTetromino();
            switch (tipoTet) {
                case 'I':
                    tet = new tetI();
                    break;
                case 'T':
                    tet = new tetT();
                    break;
                case 'O':
                    tet = new tetO();
                    break;
                case 'L':
                    tet = new tetL();
                    break;
                case 'J':
                    tet = new tetJ();
                    break;
                case 'S':
                    tet = new tetS();
                    break;
                case 'Z':
                    tet = new tetZ();
                    break;
            }
            tet.inserisci(tab);
            nuovoTetrominoDOM(tet);
            tab.gravita(tet);
        }
    }, 500);