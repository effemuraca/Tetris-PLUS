function loopGioco(partitaG1, partitaG2) {
    partitaG1.prosTetromino = scegliTetromino(partitaG1);
    partitaG1.prosTetromino.inserisci(partitaG1.tabellone);
    partitaG1.tetromino = partitaG1.prosTetromino;
    partitaG1.prosTetromino = scegliTetromino(partitaG1);
    partitaG1.tabellone.gravita(partitaG1.tetromino);

    let gioco1 =
        setInterval(() => {
            if (partitaG1.tabellone.statoPartita === statoGioco.inPausa) {
                return;
            }
            if (partitaG1.tabellone.statoPartita === statoGioco.finita) {
                clearInterval(gioco1);
                if (nGiocatori === '2')
                    partitaG1.finePartita(partitaG2.tabellone);
                else
                    partitaG1.finePartita();
                return;
            }
            if (partitaG1.tetromino.attivo === false && partitaG1.tetromino.tMuoviGiu(partitaG1.tabellone) === false) {
                partitaG1.tabellone.cancellaRighe(partitaG1.tetromino);
                partitaG1.tetromino.checkSpeciale(partitaG1.tabellone);
                partitaG1.prosTetromino.inserisci(partitaG1.tabellone);
                partitaG1.tetromino = partitaG1.prosTetromino;
                partitaG1.prosTetromino = scegliTetromino(partitaG1);
                aggiornaGravita(partitaG1.tabellone);
                partitaG1.tabellone.gravita(partitaG1.tetromino);
            }
        }, 100);

    if (nGiocatori === '2') {
        partitaG2.tabellone.qualeGiocatore = 1;
        partitaG2.prosTetromino = scegliTetromino(partitaG2);
        partitaG2.prosTetromino.inserisci(partitaG2.tabellone);
        partitaG2.tetromino = partitaG2.prosTetromino;
        partitaG2.prosTetromino = scegliTetromino(partitaG2);
        partitaG2.tabellone.gravita(partitaG2.tetromino);

        let gioco2 =
            setInterval(() => {
                if (partitaG2.tabellone.statoPartita === statoGioco.inPausa) {
                    return;
                }
                if (partitaG2.tabellone.statoPartita === statoGioco.finita) {
                    clearInterval(gioco2);
                    partitaG2.finePartita(partitaG1.tabellone);
                    return;
                }
                if (partitaG2.tetromino.attivo === false && partitaG2.tetromino.tMuoviGiu(partitaG2.tabellone) === false) {
                    partitaG2.tabellone.cancellaRighe(partitaG2.tetromino);
                    partitaG2.tetromino.checkSpeciale(partitaG2.tabellone);
                    partitaG2.prosTetromino.inserisci(partitaG2.tabellone);
                    partitaG2.tetromino = partitaG2.prosTetromino;
                    partitaG2.prosTetromino = scegliTetromino(partitaG2);
                    aggiornaGravita(partitaG2.tabellone);
                    partitaG2.tabellone.gravita(partitaG2.tetromino);
                }
            }, 100);
    }
}

// funzioni per la gestione dei popup di salvataggio e regolamento
function Chiudi(da_chiudere, tab1, tab2 = null) {
    tab1.statoPartita = statoGioco.inCorso;
    if (nGiocatori === '2')
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

function aggiornaGravita(tab) {
    tab.statoGravita = (tab.punteggio > 10000) ? tab.statoGravita -= 0.05 : tab.statoGravita;
    if (tab.statoGravita < 0.2)
        tab.statoGravita = 0.2;
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
