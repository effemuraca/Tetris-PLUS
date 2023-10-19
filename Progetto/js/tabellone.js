'use strict';
class Tabellone {
    constructor(statoTabellone, punteggio) {
        this.tabelloneAttuale = [];
        for (let i = 0; i < nRow; i++) {
            this.tabelloneAttuale[i] = [];
            for (let j = 0; j < nCol; j++) {
                this.tabelloneAttuale[i][j] = 0;
            }
        }
        this.punteggio = 0;
        this.statoPartita = statoGioco.inCorso;
        // statoGravita rappresenta quanto effetto ha la gravità sul tetromino attivo
        this.statoGravita = 1;
        // è utile tenere nel tabellone una reference a quale giocatore appartiene, per evitare di passare ad alcune funzioni l'intero oggetto partita come parametro
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
        let riga = tetromino.y + tetromino.tetMatrice.length - 1;
        // gestione del caso matrice ingrandita per via della rotazione (una riga di soli zeri in fondo alla matrice del tetromino)
        if (riga >= nRow)
            riga = nRow - 1;
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
}