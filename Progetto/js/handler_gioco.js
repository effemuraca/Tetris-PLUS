const salva = document.getElementById('salvataggio');
salva.addEventListener('click', function () {
    if (nGiocatori === '2')
        Apri('salvataggio_popup', partitaG1.tabellone, partitaG2.tabellone);
    else
        Apri('salvataggio_popup', partitaG1.tabellone);
});

const regole = document.getElementById('regolamento');
regole.addEventListener('click', function () {
    if (nGiocatori === '2')
        Apri('regolamento_popup', partitaG1.tabellone, partitaG2.tabellone);
    else
        Apri('regolamento_popup', partitaG1.tabellone);
});

document.getElementById('chiudi_salvataggio').addEventListener('click', function (event) {
    event.preventDefault()
});

const chiudiSalva = document.getElementById('chiudi_salvataggio');
chiudiSalva.addEventListener('click', function () {
    if (nGiocatori === '2')
        Chiudi('salvataggio_popup', partitaG1.tabellone, partitaG2.tabellone);
    else
        Chiudi('salvataggio_popup', partitaG1.tabellone);
});

const chiudiRegole = document.getElementById('chiudi_regolamento');
chiudiRegole.addEventListener('click', function () {
    if (nGiocatori === '2')
        Chiudi('regolamento_popup', partitaG1.tabellone, partitaG2.tabellone);
    else
        Chiudi('regolamento_popup', partitaG1.tabellone);
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

// la creazione di keyObj è necessaria a fare in modo che nel caso ci siano due giocatori, entrambi i tetromini possano muoversi fluidamente
// nel caso in cui si usi un event listener con switch case (event.key) la pressione di un tasto interrompe il movimento del tetromino dell'altro giocatore
let keyObj = {};
// creazione eventi per il controllo dei tasti da pc
document.addEventListener('keydown', function (event) {
    keyObj[event.key] = true;
    ControllaTasti(keyObj, partitaG1.tabellone, partitaG1.tetromino, 1);
    if (nGiocatori === '2')
        ControllaTasti(keyObj, partitaG2.tabellone, partitaG2.tetromino, 2);
});

document.addEventListener('keyup', function (event) {
    delete keyObj[event.key];
});

let partitaG1
let partitaG2;
let salvata = sessionStorage.getItem('partita') !== null;
if (salvata === true) {
    const partita = JSON.parse(sessionStorage.getItem('partita'));
    partitaG1 = new Partita(partita.username, partita.tabellone, partita.tetromino, partita.prosTetromino, partita.punteggio, 1);
}
else
    partitaG1 = new Partita();

partitaG1.iniziaPartita();
if (nGiocatori === '2') {
    const classeMP = document.getElementById('container_tabellone');
    classeMP.classList.add('multiplayer');
    // la scelta del nome utente per il giocatore ospite è fatta in automatico e non tramite un secondo login (si suppone che il giocatore ospite spesso non abbia un account su cui giocare, essendo che il gioco viene eseguito in locale sulla macchina dell'altro giocatore)
    const nomeGiocatore2 = 'Giocatore ospite';
    if (salvata === true) {
        let partita;
        if (sessionStorage.getItem('partitaDoppia') === 'false')
            partita = JSON.parse(sessionStorage.getItem('partita'));
        else
            partita = JSON.parse(sessionStorage.getItem('partitaDoppia'));
        partitaG2 = new Partita(nomeGiocatore2, partita.tabellone, partita.tetromino, partita.prosTetromino, partita.punteggio);
    }
    else
        partitaG2 = new Partita(nomeGiocatore2);
    partitaG2.tabellone.qualeGiocatore = 1;
    partitaG2.iniziaPartita();
    aggiornaSalvataggio();
}

sessionStorage.removeItem('partita');
sessionStorage.removeItem('partitaDoppia');
loopGioco(partitaG1, partitaG2, salvata);