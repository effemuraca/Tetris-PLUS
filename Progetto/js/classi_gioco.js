'use strict';

// definizione delle costanti utilizzate nel gioco
const nRow = 20;
const nCol = 10;
const nGiocatori = sessionStorage.getItem('numero_giocatori');

const tetromino = ['I', 'T', 'O', 'L', 'J', 'S', 'Z'];
const colore = ['red', 'coral', 'yellow', 'green', 'cyan', 'purple', 'blue'];
const speciale = ['destroyer', 'dinamite', 'stopper', 'accelerator', 'mist'];

const statoGioco = {
    inCorso: 1,
    finita: 0,
    inPausa: -1,
};

class Partita {
    constructor(nutente = 1, username = sessionStorage.getItem('username')) {
        this.username = username;
        this.nUtente = nutente;
        if (sessionStorage.getItem('tipo_partita') === 'nuova') {
            this.punteggio = 0;
            this.tabellone = new Tabellone();
            this.tetromino = [];
            this.prosTetromino = [];
        }

        else if (sessionStorage.getItem('tipo_partita') === 'salvata') {
            // da sostituire con la parte del codice che prende la partita dal db
        }

    }

    iniziaPartita() {
        // creazione del tabellone di gioco
        const container = document.getElementById('container_tabellone');
        const tab = document.createElement('table');
        tab.className = 'tabellone';
        container.appendChild(tab);
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
        nodePunteggio.className = 'punteggioAttuale';
        nodePunteggio.style.marginBlockEnd = '0rem';
        nodePunteggio.style.fontSize = '3vw';
        const textnodePunteggio = document.createTextNode(this.punteggio);
        nodePunteggio.appendChild(textnodePunteggio);
        document.getElementById('punteggio').appendChild(nodePunteggio);

        //creazione dell'interfaccia per la scelta del tetromino successivo
        const prossimo = document.getElementById('prossimo_tetromino_tabellone');
        for (let i = 0; i < 5; i++) {
            const riga = document.createElement('tr');
            prossimo.appendChild(riga);

            for (let j = 0; j < 5; j++) {
                const elementoProssimo = document.createElement('td');
                elementoProssimo.className = 'elem_prossimo';
                riga.appendChild(elementoProssimo);
            }
        }

        // inserimento del nome utente
        const nodeUtente = document.createElement('p');
        nodeUtente.style.marginBlockEnd = '0rem';
        const textnodeUtente = document.createTextNode(this.username);
        nodeUtente.appendChild(textnodeUtente);
        document.getElementById('nome_giocatore').appendChild(nodeUtente);
    }

    finePartita(tab = []) {
        // se ci sono due giocatori, passo il tabellone del giocatore che non ha perso per mettere in pausa la sua partita
        if (nGiocatori === '2') {
            tab.statoGioco = statoGioco.inPausa;
        }
        const gameOver = document.getElementById('game_over');
        gameOver.classList.add('aperto');
        gameOver.style.display = 'flex';
        const container = document.getElementById('container');
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        const nodePunteggio = document.getElementById('info_go');
        nodePunteggio.style.marginBlock = '1rem';
        nodePunteggio.textContent = 'Hai totalizzato ' + this.tabellone.punteggio + ' punti';
        setTimeout(() => {
            if (nGiocatori === '2') {
                Chiudi('game_over', partitaG1.tabellone, partitaG2.tabellone);
            }
            else
                Chiudi('game_over', partitaG1.tabellone);
        }, 5000);
    }

    salvaPartita() {

    }
}

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
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return;
        if (this.checkCollisione(tabellone) === false)
            return;
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 1) {
                    tabellone.tabelloneAttuale[i + this.y][j + this.x] = this.colore;
                    let elemDOM
                    if (tabellone.qualeGiocatore === 1)
                        elemDOM = document.getElementsByClassName('elem_tabellone')[200 + (i + this.y) * nCol + j + this.x];
                    else
                        elemDOM = document.getElementsByClassName('elem_tabellone')[(i + this.y) * nCol + j + this.x];
                    if (this.tipoT)
                        elemDOM.style.backgroundColor = this.colore;
                }
            }
        }
    }

    cancella(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] === 1) {
                    tabellone.tabelloneAttuale[i + this.y][j + this.x] = 0;
                    let elemDOM
                    if (tabellone.qualeGiocatore === 1)
                        elemDOM = document.getElementsByClassName('elem_tabellone')[200 + (i + this.y) * nCol + j + this.x];
                    else
                        elemDOM = document.getElementsByClassName('elem_tabellone')[(i + this.y) * nCol + j + this.x];
                    elemDOM.style.backgroundColor = 'rgba(23, 36, 126, 0.9)';
                }
            }
        }
    }

    tMuoviDx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return;
        this.cancella(tabellone);
        this.x++;
        if (this.checkCollisione(tabellone) === false) {
            this.x--;
            console.log('inserisci da tMuoviDx');
            this.inserisci(tabellone);
            return;
        }
        console.log('inserisci da tMuoviDx');
        this.inserisci(tabellone);
    }

    tMuoviSx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return;
        this.cancella(tabellone);
        this.x--;
        if (this.checkCollisione(tabellone) === false) {
            this.x++;
            console.log('inserisci da tMuoviSx');
            this.inserisci(tabellone);
            return;
        }
        console.log('inserisci da tMuoviSx');
        this.inserisci(tabellone);
    }

    tMuoviGiu(tabellone, gravita) {
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return false;
        if (this.y + this.tetMatrice.length >= nRow) {
            this.attivo = false;
            clearInterval(gravita);
            return false;
        }
        this.cancella(tabellone);
        this.y++;
        if (this.checkCollisione(tabellone) === false) {
            this.y--;
            console.log('inserisci da tMuoviGiu caso fallito');
            this.inserisci(tabellone);
            this.attivo = false;
            clearInterval(gravita);
            return false;
        }
        tabellone.punteggio += 10;
        updatePunteggioDOM(tabellone);
        console.log('inserisci da tMuoviGiu caso riuscito');
        this.inserisci(tabellone);
        return true;
    }
    // funzioni generiche per la rotazione (le classi derivate inizializzazono il proprio polo di rotazione e usano le funzioni generiche) 
    tRuotaDx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
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
        console.log('inserisci da tRuotaDx');
        this.inserisci(tabellone);
    }

    tRuotaSx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
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
        console.log('inserisci da tRuotaSx');
        this.inserisci(tabellone);
    }

    checkSpeciale(tabellone) {
        if (this.tipoT === 'destroyer' || this.tipoT === 'dinamite' || this.tipoT === 'stopper' || this.tipoT === 'accelerator' || this.tipoT === 'mist') {
            console.log('tMuoviGiu caso speciale');
            switch (this.tipoT) {
                case 'destroyer':
                    tabellone.tabelloneAttuale.splice(this.y + 1, 1);
                    tabellone.tabelloneAttuale.unshift(new Array(nCol).fill(0));
                    tabellone.riscriviTabelloneDOM(tabellone.qualeGiocatore);
                    break;

                case 'dinamite':
                    for (let i = this.y - 2; i <= this.y + 2; i++) {
                        for (let j = this.x - 2; j <= this.x + 2; j++) {
                            if (i >= 0 && i < nRow && j >= 0 && j < nCol) {
                                tabellone.tabelloneAttuale[i][j] = 0;
                                let elemDOM = document.getElementsByClassName('elem_tabellone')[i * nCol + j + tabellone.qualeGiocatore * 200];
                                elemDOM.style.backgroundColor = 'rgba(23, 36, 126, 0.9)';
                            }
                        }
                    }
                    break;

                case 'stopper':
                    // ferma il tempo per 15 secondi
                    tabellone.statoGravita = 999;
                    setTimeout(() => {
                        tabellone.statoGravita = 1;
                    }, 15000);

                case 'accelerator':
                    tabellone.statoGravita -= 0.2;
                    break;

                case 'mist':
                    // nasconde per 15 secondi le tre righe più in basso del tabellone
                    for (let i = nRow - 3; i < nRow; i++) {
                        for (let j = 0; j < nCol; j++) {
                            let elemDOM = document.getElementsByClassName('elem_tabellone')[i * nCol + j + tabellone.qualeGiocatore * 200];
                            elemDOM.style.backgroundColor = 'white';
                        }
                    }
                    setTimeout(() => {
                        for (let i = nRow - 3; i < nRow; i++) {
                            for (let j = 0; j < nCol; j++) {
                                let elemDOM = document.getElementsByClassName('elem_tabellone')[i * nCol + j + tabellone.qualeGiocatore * 200];
                                if (tabellone.tabelloneAttuale[i][j] !== 0)
                                    elemDOM.style.backgroundColor = tabellone.tabelloneAttuale[i][j];
                                else
                                    elemDOM.style.backgroundColor = 'rgba(23, 36, 126, 0.9)';
                            }
                        }
                    }, 15000);
                    break;
            }
            return;
        }
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

class tetSpec extends Tetromino {
    constructor() {
        super();
        this.tipoT = getSpeciale();
        this.colore = 'gold';
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
        // è utile tenere nel tabellone una reference a quale giocatore appartiene, per evitare di passare a molte funzioni come parametro l'intero oggetto partita
        this.qualeGiocatore = 0;
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
    cancellaRighe(tetromino) {
        console.log('cancellaRighe');
        let riga = tetromino.y + tetromino.tetMatrice.length - 1;
        let righeCancellate = 0;

        while (riga >= tetromino.y) {
            if (this.checkRigaPiena(riga)) {
                // rimozione della riga piena
                this.tabelloneAttuale.splice(riga, 1);
                // aggiunta di una nuova riga vuota in cima al tabellone
                this.tabelloneAttuale.unshift(new Array(nCol).fill(0));
                righeCancellate++;
            } else {
                riga--;
            }
        }

        if (righeCancellate > 0) {
            this.righeCancellate = true;
            this.riscriviTabelloneDOM(this.qualeGiocatore);
            this.punteggio += righeCancellate * 100 + (righeCancellate - 1) * 50;
            updatePunteggioDOM(this);
        }
    }

    riscriviTabelloneDOM(giocatore) {
        for (let i = 0; i < nRow; i++) {
            for (let j = 0; j < nCol; j++) {
                const elemDOM = document.getElementsByClassName('elem_tabellone')[i * nCol + j + giocatore * 200];
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
                if (tetromino.attivo === false) {
                    clearInterval(gravita);
                    return;
                }
                tetromino.tMuoviGiu(this, gravita);
            }, 1000 * this.statoGravita);
        }
    }
}