"use strict";

function SelezioneModalità(numero_giocatori) {
    let selezione;
    let non_selezione;
    if (numero_giocatori == 1) {
        selezione = document.getElementById("partita_singleplayer");
        non_selezione = document.getElementById("partita_multiplayer");
    }
    else if (numero_giocatori == 2) {
        selezione = document.getElementById("partita_multiplayer");
        non_selezione = document.getElementById("partita_singleplayer");
    }
    selezione.style.backgroundColor = "rgba(120, 192, 224, 0.9)";
    non_selezione.style.backgroundColor = "rgba(23, 36, 126, 0.9)";
}

function TipoPartita(tipo_partita) {
    let modalità;
    let tipo;
    if (document.getElementById("partita_singleplayer").style.backgroundColor == "rgba(120, 192, 224, 0.9)") {
        modalità = "singleplayer";
    }
    else if (document.getElementById("partita_multiplayer").style.backgroundColor == "rgba(120, 192, 224, 0.9)") {
        modalità = "multiplayer";
    }
    else {
        modalità = false;   
    }
    
    if (!modalità){
        // da sostituire con un p che compare
        window.prompt("non hai selezionato una modalità");
    }
    
}