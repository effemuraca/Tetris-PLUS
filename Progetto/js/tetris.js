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
function createGame() {
    let questa_partita = new Partita("default", "singleplayer", "nuova");

    // inserimento del punteggio iniziale
    const node = document.createElement("p");
    const textnode = document.createTextNode(questa_partita.punteggio);
    node.appendChild(textnode);
    document.getElementById("punteggio").appendChild(node);

    // creazione del tabellone di gioco
    let n_row = 20;
    let n_col = 11;
    const main_con = document.getElementsByTagName("main")[0];
    for (let i = 1; i < n_row * n_col; i++) {
        if (questa_partita.tipo_partita == "nuova") {
            questa_partita.stato_tabellone[i] = 0;
        }
        else {
            // copia elemento per elemento lo stato della partita salvata
        }
        const cella = document.createElement("div");
        main_con.appendChild(cella);
        if (i % 11 == 0) {
            cella.style.float = "none";
        }
    }


}



