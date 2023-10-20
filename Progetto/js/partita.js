'use strict';
class Partita {
    // i parametri default servono ad avere "virtualmente" due costruttori, uno con i parametri già inseriti per il caso nuova partita e uno senza per il caso partita salvata
    // lo stesso approccio viene ripresentato per la classe Tabellone e la classe Tetromino
    constructor(tabellone = [], tetromino = [], prossimoTet = [], punteggio = 0, nutente = 1, username = sessionStorage.getItem('username')) {
        this.username = username;
        this.nUtente = nutente;
        this.punteggio = punteggio;
        this.tabellone = new Tabellone();
        this.tetromino = tetromino;
        this.prosTetromino = prossimoTet;
        // se la partita è stata caricata da una partita salvata, i tetromini e il tabellone vengono costruiti a partire dai dati salvati
        if (this.tetromino != []) {
            this.tabellone = new Tabellone(tabellone.tabelloneAttuale, tabellone.punteggio, tabellone.statoGravita, tabellone.qualeGiocatore);
            // si fanno due switch sul tipo di tetromino che creano al posto di new tetromino, new tet? con ? tipo del pezzo corretto (magari fallo in una funzione)
            costruisciTetEsistente(this.tetromino, tetromino);
            costruisciTetEsistente(this.prosTetromino, prossimoTet);
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
        this.tabellone.riscriviTabelloneDOM(this.tabellone.qualeGiocatore);
        // inserimento del punteggio iniziale
        const nodePunteggio = document.createElement('p');
        nodePunteggio.className = 'punteggioAttuale';
        nodePunteggio.style.marginBlockEnd = '0rem';
        nodePunteggio.style.fontSize = '3vw';
        nodePunteggio.textContent = this.punteggio;
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
        nodeUtente.textContent = this.username;
        document.getElementById('nome_giocatore').appendChild(nodeUtente);
    }

    finePartita(altroTab = null) {
        const gameOver = document.getElementById('game_over');
        gameOver.classList.add('aperto');
        gameOver.style.display = 'flex';
        const container = document.getElementById('container');
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        const nodePunteggio = document.getElementById('info_go');
        nodePunteggio.style.marginBlock = '1rem';
        nodePunteggio.textContent = 'Hai totalizzato ' + this.tabellone.punteggio + ' punti';
        this.tabellone.statoPartita = statoGioco.finita;
        // se ci sono due giocatori, passo il tabellone del giocatore che non ha perso per mettere in pausa la sua partita
        if (nGiocatori === '2' && altroTab.statoPartita !== statoGioco.finita) {
            altroTab.statoPartita = statoGioco.inPausa;
            setTimeout(() => {
                Chiudi('game_over', partitaG1.tabellone, partitaG2.tabellone);
            }, 5000);
        }
        this.punteggio = this.tabellone.punteggio;
        this.salvaPartitaFinita();
    }

    salvaPartitaFinita() {
        fetch('../php/salva_classifica.php', {
            method: 'POST',
            body: JSON.stringify(this.punteggio),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Richiesta di salvataggio della partita terminata inoltrata correttamente al server');
                } else {
                    console.log('Errore nella richiesta di salvataggio della partita terminata al server');
                }
            })
            .catch((error) => {
                console.error('Errore durante la richiesta: ' + error);
            });
    }

    salvaPartita(valSal) {
        this.punteggio = this.tabellone.punteggio;
        const partitaJSON = {
            partita: this,
            tipoSalvataggio: valSal,
            punteggio: this.punteggio
        }
        fetch('../php/salva.php', {
            method: 'POST',
            body: JSON.stringify(partitaJSON),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('Richiesta di salvataggio della partita in corso inoltrata correttamente al server');
                    return response.json();
                }
                else {
                    console.log('Errore nella richiesta di salvataggio della partita in corso al server');
                }
            })
            .then(data => {
                alert(data.messaggio);
            })
            .catch(error => {
                console.error('Errore durante la richiesta: ' + error);
            });
    }
}