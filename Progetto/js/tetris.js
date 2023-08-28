"use strict";

function Partita(nome_utente, tipo_partita, punteggio_init = 0) {
    this.giocatore = nome_utente;
    this.tipo = tipo_partita;
    this.punteggio = punteggio_init;
}


function createGame() {
    let questa_partita = new Partita("default", "singleplayer", 0);

    // inserimento del punteggio iniziale
    const node = document.createElement("p");
    const textnode = document.createTextNode(questa_partita.punteggio);
    node.appendChild(textnode);
    document.getElementById("punteggio").appendChild(node);

    // creazione del tabellone di gioco
    let n_row = 20;
    let n_col = 10;

}



