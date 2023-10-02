'use strict';   

const salva = document.getElementById('salvataggio');
salva.addEventListener('click', function () {
    Apri('salvataggio_popup');
});

const regole = document.getElementById('regolamento');
regole.addEventListener('click', function () {
    Apri('regolamento_popup');
});

document.getElementById('chiudi_salvataggio').addEventListener('click', function (event) {
    event.preventDefault()
});

document.onload = iniziaPartita();

const chiudiSalva = document.getElementById('chiudi_salvataggio');
chiudiSalva.addEventListener('click', function () {
    Chiudi('salvataggio_popup');
});

const chiudiRegole = document.getElementById('chiudi_regolamento');
chiudiRegole.addEventListener('click', function () {
    Chiudi('regolamento_popup');
});

const pausa = document.getElementById('pausa');
pausa.addEventListener('click', function () {
    PausaMobile();
});

// creazione eventi per il controllo dei tasti da mobile
const rotazioneDx = document.getElementById('ruota_dx');
rotazioneDx.addEventListener('click', function () {
    // tetromino.ruotaDx();
});

const rotazioneSx = document.getElementById('ruota_sx');
rotazioneSx.addEventListener('click', function () {
    // tetromino.ruotaSx();
});

const muoviDx = document.getElementById('muovi_dx');
muoviDx.addEventListener('click', function () {
    // tetromino.muoviDx();
});

const muoviSx = document.getElementById('muovi_sx');
muoviSx.addEventListener('click', function () {
    // tetromino.muoviSx();
});

const muoviGiu = document.getElementById('muovi_giu');
muoviGiu.addEventListener('click', function () {
    // tetromino.muoviGiu();
});

// creazione eventi per il controllo dei tasti da pc
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'E':
            // tetromino.ruotaDx();
            break;
        case 'Q':
            // tetromino.ruotaSx();
            break;
        case 'S':
            // tetromino.muoviGiu();
            break;
        case 'A':
            // tetromino.muoviSx();
            break;
        case 'D':
            // tetromino.muoviDx();
            break;
        case 'W':
            // tetromino.caduta();
            break;
        case 'Space':
            Pausa();
            break;
    }
});