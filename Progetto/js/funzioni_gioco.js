function loopGioco(partitaG1, partitaG2) {
    partitaG1.prosTetromino = scegliTetromino(partitaG1);
    partitaG1.prosTetromino.inserisci(partitaG1.tabellone);
    partitaG1.tetromino = partitaG1.prosTetromino;
    partitaG1.prosTetromino = scegliTetromino(partitaG1);
    let gioco1;
    let gioco2;

    gioco1 = aggiornaInterval(gioco1, partitaG1, partitaG2);

    if (nGiocatori === '2') {
        partitaG2.tabellone.qualeGiocatore = 1;
        partitaG2.prosTetromino = scegliTetromino(partitaG2);
        partitaG2.prosTetromino.inserisci(partitaG2.tabellone);
        partitaG2.tetromino = partitaG2.prosTetromino;
        partitaG2.prosTetromino = scegliTetromino(partitaG2);
        gioco2 = aggiornaInterval(gioco2, partitaG2, partitaG1);
    }
}

function aggiornaInterval(gioco, partita1, partita2 = null) {
    clearInterval(gioco);
    gioco = setInterval(() => {
        if (partita1.tabellone.statoPartita === statoGioco.inPausa) {
            return;
        }
        if (partita1.tabellone.statoPartita === statoGioco.finita) {
            clearInterval(gioco);
            if (nGiocatori === '2')
                partita1.finePartita(partita2.tabellone);
            else
                partita1.finePartita();
            return;
        }
        if (partita1.tetromino.tMuoviGiu(partita1.tabellone) === false) {
            partita1.tabellone.cancellaRighe(partita1.tetromino);
            partita1.tetromino.checkSpeciale(partita1.tabellone);
            partita1.prosTetromino.inserisci(partita1.tabellone);
            partita1.tetromino = partita1.prosTetromino;
            partita1.prosTetromino = scegliTetromino(partita1);
            aggiornaGravita(gioco, partita1, partita2);
        }
    }, 800 * partita1.tabellone.statoGravita);
    return gioco;
}

// funzioni per la gestione dei popup di salvataggio e regolamento
function Chiudi(da_chiudere, tab1, tab2 = null) {
    if (tab1.statoPartita !== statoGioco.finita)
        tab1.statoPartita = statoGioco.inCorso;
    if (nGiocatori === '2' && tab2.statoPartita !== statoGioco.finita)
        tab2.statoPartita = statoGioco.inCorso;
    const daChiudere = document.getElementById(da_chiudere);
    daChiudere.style.display = 'none';
    daChiudere.classList.remove('aperto');
    const container = document.getElementById('container');
    container.style.backgroundColor = 'rgba(0, 0, 0, 0)';
}

function Apri(da_aprire, tab1, tab2 = null) {
    tab1.statoPartita = statoGioco.inPausa;
    if (nGiocatori === '2')
        tab2.statoPartita = statoGioco.inPausa;
    const daAprire = document.getElementById(da_aprire);
    const controllaSalva = document.getElementById('salvataggio_popup');
    const controllaRegole = document.getElementById('regolamento_popup');
    const controllaGo = document.getElementById('game_over');
    if ((da_aprire === 'salvataggio_popup' && controllaRegole.className === 'aperto') || (da_aprire === 'salvataggio_popup' && controllaGo.className === 'aperto')) {
        window.alert("Non si può aprire il popup di salvataggio finché il regolamento o la schermata di game over sono aperto"); //magari sistema gli alert in qualche modo
        return;
    }
    else if ((da_aprire === 'regolamento_popup' && controllaSalva.className === 'aperto') || (da_aprire === 'regolamento_popup' && controllaGo.className === 'aperto')) {
        window.alert("Non si può aprire il regolamento finché il popup di salvataggio o la schermata di game over sono aperto");
        return;
    }
    daAprire.classList.add('aperto');
    daAprire.style.display = 'block';
    const container = document.getElementById('container');
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
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

function getPossibilita() {
    const possibilita = Math.floor(Math.random() * 14);
    if (possibilita === 0)
        return true;
    else
        return false;
}

function getSpeciale() {
    const spec = 'stopper';//speciale[Math.floor(Math.random() * speciale.length)];
    return spec;
}

function getTetromino() {
    const qualeTet = tetromino[Math.floor(Math.random() * tetromino.length)];
    return qualeTet;
}

//funzione che restituisce un colore casuale
function getColore() {
    const col = colore[Math.floor(Math.random() * colore.length)];
    return col;
}

function stampaTabellone(tabellone) {
    for (let i = 0; i < nRow; i++) {
        const stringaRiga = tabellone.tabelloneAttuale[i].join(' ');
        console.log(stringaRiga);
    }
    console.log('\n');
}

function scegliTetromino(partita) {
    let tipoTet = getTetromino();
    if (getPossibilita() === true)
        tipoTet = 'Speciale';
    nuovoTetrominoDOM(tipoTet, partita.tabellone.qualeGiocatore);
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
        case 'Speciale':
            tet = new tetSpec();
            break;
    }
    return tet;
}

function aggiornaGravita(gioco, partita1, partita2 = null) {
    partita1.tabellone.statoGravita = (partita1.tabellone.punteggio > 7500) ? partita1.tabellone.statoGravita -= 0.025 : partita1.tabellone.statoGravita;
    if (partita1.tabellone.statoGravita < 0.2)
        partita1.tabellone.statoGravita = 0.2;
    aggiornaInterval(gioco, partita1, partita2);
}

function pausa(tabellone) {
    console.log('pausa');
    if (tabellone.statoPartita === statoGioco.inCorso)
        tabellone.statoPartita = statoGioco.inPausa;
    else
        tabellone.statoPartita = statoGioco.inCorso;
}

// funzione che mette in pausa/fa riprendere il gioco (versione mobile)
function pausaMobile(tabellone) {
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

function updatePunteggioDOM(tab) {
    const nodePunteggio = document.getElementsByClassName('punteggioAttuale')[tab.qualeGiocatore];
    nodePunteggio.textContent = tab.punteggio;
}

function nuovoTetrominoDOM(qualeTet, giocatore) {
    let prossimoTet;
    switch (qualeTet) {
        case 'I':
            prossimoTet = new tetI();
            break;
        case 'T':
            prossimoTet = new tetT();
            break;
        case 'O':
            prossimoTet = new tetO();
            break;
        case 'L':
            prossimoTet = new tetL();
            break;
        case 'J':
            prossimoTet = new tetJ();
            break;
        case 'S':
            prossimoTet = new tetS();
            break;
        case 'Z':
            prossimoTet = new tetZ();
            break;
        case 'Speciale':
            prossimoTet = new tetSpec();
            break;
    }
    for (let i = 0; i < 25; i++) {
        let elemDOM = document.getElementsByClassName('elem_prossimo')[i + giocatore * 25];
        elemDOM.style.backgroundColor = 'transparent';
    }
    for (let i = 0; i < prossimoTet.tetMatrice.length; i++) {
        for (let j = 0; j < prossimoTet.tetMatrice[i].length; j++) {
            if (prossimoTet.tetMatrice[i][j] === 1) {
                if (prossimoTet.tipoT === 'I')
                    i++;
                let elemDOM = document.getElementsByClassName('elem_prossimo')[(i + 1) * 5 + (j + 1) + giocatore * 25];
                if (prossimoTet.tipoT === 'I')
                    i--;
                if (qualeTet === 'Speciale')
                    elemDOM.style.backgroundColor = 'gold';
                else
                    elemDOM.style.backgroundColor = 'rgb(177, 221, 241)';
            }
        }
    }
    const letteraTet = document.getElementById('prossimo_tetromino_nome');
    letteraTet.textContent = prossimoTet.tipoT;
    letteraTet.style.fontSize = '3vw';
}
