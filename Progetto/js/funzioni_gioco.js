function loopGioco(partitaG1, partitaG2, salvata = false) {
    if (salvata === false) {
        partitaG1.prosTetromino = scegliTetromino(partitaG1);
        partitaG1.prosTetromino.inserisci(partitaG1.tabellone);
        partitaG1.tetromino = partitaG1.prosTetromino;
        partitaG1.prosTetromino = scegliTetromino(partitaG1);
    }
    else
        partitaG1.tetromino.inserisci(partitaG1.tabellone);
    let gioco1;
    let gioco2;

    gioco1 = aggiornaInterval(gioco1, partitaG1, partitaG2);

    if (nGiocatori === '2') {
        partitaG2.tabellone.qualeGiocatore = 1;
        if (salvata === false) {
            partitaG2.prosTetromino = scegliTetromino(partitaG2);
            partitaG2.prosTetromino.inserisci(partitaG2.tabellone);
            partitaG2.tetromino = partitaG2.prosTetromino;
            partitaG2.prosTetromino = scegliTetromino(partitaG2);
        }
        else
            partitaG2.tetromino.inserisci(partitaG2.tabellone);
        gioco2 = aggiornaInterval(gioco2, partitaG2, partitaG1);
    }
}

// la funzione si occupa dell'aggiornamento dell'intervallo con cui viene chiamato gioco, che dipende dallo stato attuale della gravità
function aggiornaInterval(gioco, partita1, partita2 = null) {
    clearInterval(gioco);
    gioco = setInterval(() => {
        if (window.innerWidth < 1001 && nGiocatori === '2') {
            alert('Il gioco non è ottimizzato per giocare in modalità multiplayer su uno schermo cosi piccolo, ridimensiona lo schermo o potresti visualizzare dei problemi grafici')
            pausaMobile(partita1.tabellone);
            pausaMobile(partita2.tabellone);
        }
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
            partita1.tetromino.attivo = false;
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
        window.alert('Non si può aprire il popup di salvataggio finché il regolamento o la schermata di game over sono aperto'); //magari sistema gli alert in qualche modo
        return;
    }
    else if ((da_aprire === 'regolamento_popup' && controllaSalva.className === 'aperto') || (da_aprire === 'regolamento_popup' && controllaGo.className === 'aperto')) {
        window.alert('Non si può aprire il regolamento finché il popup di salvataggio o la schermata di game over sono aperto');
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
            if ((i + y) * nCol + j + x < 0 || (i + y) * nCol + j + x >= nRow * nCol)
                return false;
            if (matrice[i][j] == 1 && tabellone.tabelloneAttuale[i + y][j + x] !== 0)
                return false;
        }
    }
    return true;
}

// la funzione serve a restituire un valore casuale che determina se il prossimo tetromino sarà speciale o meno
function getPossibilita() {
    const possibilita = Math.floor(Math.random() * 14);
    if (possibilita === 0)
        return true;
    else
        return false;
}

// funzioni che forniscono un elemento casuale tra quelli possibili
function getSpeciale() {
    const spec = speciale[Math.floor(Math.random() * speciale.length)];
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

// la funzione si occupa della creazione di un nuovo tetromino, che viene scelto in modo casuale
function scegliTetromino(partita) {
    let tipoTet = getTetromino();
    if (getPossibilita() === true)
        tipoTet = 'Speciale';
    let prossimoTet;
    switch (tipoTet) {
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
            prossimoTet.tipoT = getSpeciale();
            break;
    }
    nuovoTetrominoDOM(prossimoTet, partita.tabellone.qualeGiocatore)
    return prossimoTet;
}

// la funzione si occupa di aggiornare la gravità del gioco, che aumenta ogni volta che un tetromino viene inserito nel tabellone
function aggiornaGravita(gioco, partita1, partita2 = null) {
    if (partita1.tabellone.statoGravita > 0.5)
        partita1.tabellone.statoGravita -= 0.025;
    else
        partita1.tabellone.statoGravita -= 0.01;
    if (partita1.tabellone.statoGravita < 0.2)
        partita1.tabellone.statoGravita = 0.2;
    aggiornaInterval(gioco, partita1, partita2);
}

function pausa(tabellone) {
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

function nuovoTetrominoDOM(tet, giocatore) {
    for (let i = 0; i < 25; i++) {
        let elemDOM = document.getElementsByClassName('elem_prossimo')[i + giocatore * 25];
        elemDOM.style.backgroundColor = 'transparent';
    }
    for (let i = 0; i < tet.tetMatrice.length; i++) {
        for (let j = 0; j < tet.tetMatrice[i].length; j++) {
            if (tet.tetMatrice[i][j] === 1) {
                if (tet.tipoT === 'I')
                    i++;
                let elemDOM = document.getElementsByClassName('elem_prossimo')[(i + 1) * 5 + (j + 1) + giocatore * 25];
                if (tet.tipoT === 'I')
                    i--;
                if (tet.colore === 'white')
                    elemDOM.style.backgroundColor = 'gold';
                else
                    elemDOM.style.backgroundColor = 'rgb(177, 221, 241)';
            }
        }
    }
    const letteraTet = document.getElementById('prossimo_tetromino_nome');
    letteraTet.textContent = tet.tipoT;
    letteraTet.style.fontSize = '3vw';
    if (window.innerWidth > 1000) {
        if (tet.colore === 'white') {
            letteraTet.style.display = 'block';
            letteraTet.style.color = 'gold';
            letteraTet.style.fontSize = '2vw';
        }
        else
            letteraTet.style.display = 'none';
    }
}

// la funzione si occupa di aggiornare il popup di salvataggio, nel caso di partita multiplayer
function aggiornaSalvataggio() {
    const daSalvare = document.getElementsByClassName('quale_salvataggio')[0];
    daSalvare.style.display = 'block';
    const select = document.createElement('select');
    select.id = 'partita_da_salvare';
    select.required = true;
    const option1 = document.createElement('option');
    option1.value = 'partita1';
    option1.textContent = 'Partita 1';
    const option2 = document.createElement('option');
    option2.value = 'partita2';
    option2.textContent = 'Partita 2';
    select.appendChild(option1);
    select.appendChild(option2);
    daSalvare.appendChild(select);
}

// la funzione serve, nel caso di partita a due giocatori, a scegliere quale partita salvare
function scegliPartita(partita1, partita2) {
    const select = document.getElementById('partita_da_salvare');
    if (select.value === 'partita1')
        return partita1;
    else
        return partita2;
}

// la funzione serve a ricostruire un tetromino a partire dai dati salvati
function costruisciTetEsistente(questoTet, tetromino) {
    switch (tetromino.tipoT) {
        case 'I':
            questoTet = new tetI(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo);
            break;
        case 'J':
            questoTet = new tetJ(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo);
            break;
        case 'L':
            questoTet = new tetL(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo);
            break;
        case 'O':
            questoTet = new tetO(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo);
            break;
        case 'S':
            questoTet = new tetS(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo);
            break;
        case 'T':
            questoTet = new tetT(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo);
            break;
        case 'Z':
            questoTet = new tetZ(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo);
            break;
        default:
            questoTet = new tetSpec(tetromino.tetMatrice, tetromino.colore, tetromino.rotazione, tetromino.x, tetromino.y, tetromino.attivo, tetromino.tipoT);
    }
}