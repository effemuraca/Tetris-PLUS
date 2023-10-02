'use strict';

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
