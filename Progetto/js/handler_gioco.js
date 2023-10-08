const salva = document.getElementById('salvataggio');
salva.addEventListener('click', function () {
    Apri('salvataggio_popup', partitaG1.tabellone, partitaG2.tabellone);

});

const regole = document.getElementById('regolamento');
regole.addEventListener('click', function () {
    Apri('regolamento_popup', partitaG1.tabellone, partitaG2.tabellone);
});

document.getElementById('chiudi_salvataggio').addEventListener('click', function (event) {
    event.preventDefault()
});

const chiudiSalva = document.getElementById('chiudi_salvataggio');
chiudiSalva.addEventListener('click', function () {
    Chiudi('salvataggio_popup', partitaG1.tabellone, partitaG2.tabellone);
});

const chiudiRegole = document.getElementById('chiudi_regolamento');
chiudiRegole.addEventListener('click', function () {
    Chiudi('regolamento_popup', partitaG1.tabellone, partitaG2.tabellone);
});

const riprova = document.getElementById('riprova');
riprova.addEventListener('click', function () {
    location.reload();
});

const pausaListener = document.getElementById('pausa');
pausaListener.addEventListener('click', function () {
    pausaMobile(partitaG1.tabellone);
});

// creazione eventi per il controllo dei tasti da mobile
const rotazioneDx = document.getElementById('ruota_dx');
rotazioneDx.addEventListener('click', function () {
    partitaG1.tetromino.tRuotaDx(partitaG1.tabellone);
});

const rotazioneSx = document.getElementById('ruota_sx');
rotazioneSx.addEventListener('click', function () {
    partitaG1.tetromino.tRuotaSx(partitaG1.tabellone);
});

const muoviDx = document.getElementById('muovi_dx');
muoviDx.addEventListener('click', function () {
    partitaG1.tetromino.tMuoviDx(partitaG1.tabellone);
});

const muoviSx = document.getElementById('muovi_sx');
muoviSx.addEventListener('click', function () {
    partitaG1.tetromino.tMuoviSx(partitaG1.tabellone);
});

const muoviGiu = document.getElementById('muovi_giu');
muoviGiu.addEventListener('click', function () {
    partitaG1.tetromino.tMuoviGiu(partitaG1.tabellone);
});

// creazione eventi per il controllo dei tasti da pc
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'e':
            partitaG1.tetromino.tRuotaDx(partitaG1.tabellone);
            break;
        case 'q':
            partitaG1.tetromino.tRuotaSx(partitaG1.tabellone);
            break;
        case 's':
            partitaG1.tetromino.tMuoviGiu(partitaG1.tabellone);
            break;
        case 'a':
            partitaG1.tetromino.tMuoviSx(partitaG1.tabellone);
            break;
        case 'd':
            partitaG1.tetromino.tMuoviDx(partitaG1.tabellone);
            break;
        case ' ':
            pausa(partitaG1.tabellone);
            if (sessionStorage.getItem('numero_giocatori') === '2')
                pausa(partitaG2.tabellone);
            break;
    }
});

let partitaG1 = new Partita();
let partitaG2;
partitaG1.iniziaPartita();
if (sessionStorage.getItem('numero_giocatori') === '2') {
    const classeMP = document.getElementById('container_tabellone');
    classeMP.classList.add('multiplayer');
    const nomeGiocatore2 = prompt('Inserisci il nome del secondo giocatore', 'Giocatore 2');
    partitaG2 = new Partita(2, nomeGiocatore2);
    partitaG2.iniziaPartita();
    console.log('ciaooo');
}

partitaG1.prosTetromino = scegliTetromino();
partitaG1.prosTetromino.inserisci(partitaG1.tabellone);
partitaG1.tetromino = partitaG1.prosTetromino;
partitaG1.prosTetromino = scegliTetromino();
partitaG1.tabellone.gravita(partitaG1.tetromino);

let gioco1 =
    setInterval(() => {
        if (partitaG1.tabellone.statoPartita === statoGioco.inPausa) {
            return;
        }
        if (partitaG1.tabellone.statoPartita === statoGioco.finita) {
            clearInterval(gioco1);
            partitaG1.tabellone.finePartita();
            return;
        }
        if (partitaG1.tetromino.attivo === false && partitaG1.tetromino.tMuoviGiu(partitaG1.tabellone) === false) {
            partitaG1.tabellone.cancellaRighe(partitaG1.tetromino);
            partitaG1.tetromino.checkSpeciale(partitaG1.tabellone);
            partitaG1.prosTetromino.inserisci(partitaG1.tabellone);
            partitaG1.tetromino = partitaG1.prosTetromino;
            partitaG1.prosTetromino = scegliTetromino();
            aggiornaGravita(partitaG1.tabellone);
            partitaG1.tabellone.gravita(partitaG1.tetromino);
        }
    }, 100);

if (sessionStorage.getItem('numero_giocatori') === '2') {

    partitaG2.prosTetromino = scegliTetromino();
    partitaG2.prosTetromino.inserisci(partitaG2.tabellone);
    partitaG2.tetromino = partitaG2.prosTetromino;
    partitaG2.prosTetromino = scegliTetromino();
    partitaG2.tabellone.gravita(partitaG2.tetromino);

    let gioco2 =
        setInterval(() => {
            if (partitaG2.tabellone.statoPartita === statoGioco.inPausa) {
                return;
            }
            if (partitaG2.tabellone.statoPartita === statoGioco.finita) {
                clearInterval(gioco2);
                partitaG2.tabellone.finePartita();
                return;
            }
            if (partitaG2.tetromino.attivo === false && partitaG2.tetromino.tMuoviGiu(partitaG2.tabellone) === false) {
                partitaG2.tabellone.cancellaRighe(partitaG2.tetromino);
                partitaG2.tetromino.checkSpeciale(partitaG2.tabellone);
                partitaG2.prosTetromino.inserisci(partitaG2.tabellone);
                partitaG2.tetromino = partitaG2.prosTetromino;
                partitaG2.prosTetromino = scegliTetromino();
                aggiornaGravita(partitaG2.tabellone);
                partitaG2.tabellone.gravita(partitaG2.tetromino);
            }
        }, 100);
}