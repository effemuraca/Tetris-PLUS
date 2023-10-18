'use strict';

//funzione di scelta della modalità di gioco (singleplayer o multiplayer)
function SelezioneModalità(numero_giocatori) {
    let selezione;
    let nonSelezione;
    sessionStorage.setItem('numero_giocatori', numero_giocatori);
    if (numero_giocatori === 1) {
        selezione = document.getElementById('partita_singleplayer');
        nonSelezione = document.getElementById('partita_multiplayer');
    }
    else if (numero_giocatori === 2) {
        if (window.innerWidth < 1001) {
            alert('Non è possibile giocare in modalità multiplayer da mobile')
            return;
        }
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
    if (sessionStorage.getItem('numero_giocatori') !== '1' && sessionStorage.getItem('numero_giocatori') !== '2') {
        // da sostituire con un p che compare
        window.alert('non hai selezionato una modalità');
    }
    else if (tipo_partita === 'salvata') 
        window.location.href = '../html/salvate.html';
    else if (tipo_partita === 'nuova') 
        window.location.href = '../html/gioca.php';
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

const logout = document.getElementById('logout');
logout.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = '../php/logout.php';
});