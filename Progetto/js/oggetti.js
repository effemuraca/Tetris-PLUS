"use strict";

// definizione degli oggetti utili all'implementazione del gioco
function Partita(nome_utente = "default", modalità = "default", tipo_partita = "default", punteggio_init = 0) {
    this.giocatore = nome_utente;
    this.modalità = modalità;
    this.tipo_partita = tipo_partita;
    this.punteggio = punteggio_init;
}

function Tabellone(stato_tabellone = []) {
    this.stato_iniziale = stato_tabellone;
    this.gravità = function () {

    };
    this.riposiziona = function () {

    };
}
function Tetromino(tipo_t, rotazione, x, y) {
    this.tipo_t = tipo_t;
    this.rotazione = rotazione;
    this.posizione = [x, y];
    this.ruota = function () {

    };
    this.muoviDx = function () {

    };
    this.muoviSx = function () {

    };
    this.muoviGiu = function () {
    }
}


let questa_partita = new Partita();