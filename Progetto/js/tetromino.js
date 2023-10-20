'use strict';
class Tetromino {
    constructor(matrice = [], colore = getColore(), rotazione = 0, x = 3, y = 0, attivo = true) {
        this.colore = colore;
        this.rotazione = rotazione;
        this.tetMatrice = matrice;
        this.x = x;
        this.y = y;
        // this.attivo serve per evitare eventuali incosistenze del tipo: il tetromino si è fermato, ma è ancora attivo e quindi può essere mosso
        this.attivo = attivo;
    }

    checkCollisione(tabellone) {
        for (let i = 0; i < this.tetMatrice.length; i++) {
            for (let j = 0; j < this.tetMatrice[i].length; j++) {
                if (this.tetMatrice[i][j] !== 0 && ((i + this.y) * nCol + j + this.x < 0 || (i + this.y) * nCol + j + this.x >= nRow * nCol))
                    return false;
                if (this.tetMatrice[i][j] == 1 && tabellone.tabelloneAttuale[i + this.y][j + this.x] !== 0) {
                    // se il pezzo è nella posizione iniziale e non è possibile inserirlo, la partita è finita
                    if (this.y === 0 && this.x === 3)
                        tabellone.statoPartita = statoGioco.finita;
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
                    // inserimento del tetromino nel DOM
                    let elemDOM;
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
                    // cancellazione del tetromino nel DOM
                    let elemDOM;
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
        if (this.attivo === false)
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
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return;
        if (this.attivo === false)
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

    tMuoviGiu(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return false;
        if (this.attivo === false)
            return;
        this.cancella(tabellone);
        this.y++;
        if (this.checkCollisione(tabellone) === false) {
            this.y--;
            this.inserisci(tabellone);
            return false;
        }
        tabellone.punteggio += 10;
        updatePunteggioDOM(tabellone);
        this.inserisci(tabellone);
        return true;
    }
    // funzioni generiche per la rotazione (le classi derivate inizializzazono il proprio polo di rotazione e usano le funzioni generiche) 
    tRuotaDx(tabellone) {
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return;
        if (this.attivo === false)
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
        if (tabellone.statoPartita === statoGioco.finita || tabellone.statoPartita === statoGioco.inPausa)
            return;
        if (this.attivo === false)
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

    checkSpeciale(tabellone) {
        return;
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
        this.colore = 'white';
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

    checkSpeciale(tabellone) {
        switch (this.tipoT) {
            // il destroyer distrugge la riga dove si è posato il tetromino
            case 'destroyer':
                tabellone.tabelloneAttuale.splice(this.y + 1, 1);
                tabellone.tabelloneAttuale.unshift(new Array(nCol).fill(0));
                tabellone.riscriviTabelloneDOM(tabellone.qualeGiocatore);
                break;
            // la dinamite distrugge un quadrato 5x5 centrato sul tetromino
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
            // il resetter riporta la gravità al valore iniziale
            case 'resetter':
                tabellone.statoGravita = 1;
                break;

            // l'accelerator diminuisce la gravità
            case 'accelerator':
                tabellone.statoGravita -= 0.2;
                break;

            case 'mist':
                // nasconde per 15 secondi le tre righe più in basso del tabellone
                for (let i = nRow - 3; i < nRow; i++) {
                    for (let j = 0; j < nCol; j++) {
                        let elemDOM = document.getElementsByClassName('elem_tabellone')[i * nCol + j + tabellone.qualeGiocatore * 200];
                        elemDOM.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
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
    }
}

