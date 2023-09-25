'use strict';

//funzione di scelta della modalità di gioco (singleplayer o multiplayer)
function SelezioneModalità(numero_giocatori) {
    let selezione;
    let nonSelezione;
    if (numero_giocatori == 1) {
        selezione = document.getElementById('partita_singleplayer');
        nonSelezione = document.getElementById('partita_multiplayer');
    }
    else if (numero_giocatori == 2) {
        selezione = document.getElementById('partita_multiplayer');
        nonSelezione = document.getElementById('partita_singleplayer');
    }
    selezione.style.backgroundColor = 'rgba(120, 192, 224, 0.9)';
    selezione.classList.add('selezionato');
    nonSelezione.classList.remove('selezionato');
    nonSelezione.style.backgroundColor = 'rgba(23, 36, 126, 0.9)';
}

// funzione per la scelta del tipo di partita (nuova o salvata)
function TipoPartita(tipo_partita) {
    let modalità;
    let tipo;
    if (document.getElementById('partita_singleplayer').className == 'selezionato') {
        modalità = 'singleplayer';  
    }
    else if (document.getElementById('partita_multiplayer').className == 'selezionato') {
        modalità = 'multiplayer';
    }
    else {
        modalità = false;
    }

    if (!modalità) {
        // da sostituire con un p che compare
        window.alert('non hai selezionato una modalità');
    }
}

const singleplayer = document.getElementById('partita_singleplayer');
singleplayer.addEventListener('click', function () {
    SelezioneModalità(1);
});

const multiplayer = document.getElementById('partita_multiplayer');
multiplayer.addEventListener('click', function () {
    SelezioneModalità(2);
});

const salvata = document.getElementById('partita_salvata');
salvata.addEventListener('click', function () {
    TipoPartita('salvata');
});

const nuova = document.getElementById('nuova_partita');
nuova.addEventListener('click', function () {
    TipoPartita('nuova');
});  