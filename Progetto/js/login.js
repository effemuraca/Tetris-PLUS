'use strict';

function TestaPassword() {
    const pw = document.getElementById('pwd').value;
    const checkErrore = document.getElementById('errore');
    if (checkErrore != null) {
        checkErrore.remove();
    }
    const daAppendere = document.getElementsByClassName('password')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1vw';
    let testoP;

    if (pw.length < 8) {
        testoP = document.createTextNode('La password deve contenere almeno 8 caratteri');
        nuovoP.id = 'errore';
    }
    else if (!/[a-z]/.test(pw)) {
        testoP = document.createTextNode('La password deve contenere almeno una lettera minuscola');
        nuovoP.id = 'errore';
    }
    else if (!/[A-Z]/.test(pw)) {
        testoP = document.createTextNode('La password deve contenere almeno una lettera maiuscola');
        nuovoP.id = 'errore';
    }
    else if (!/[0-9]/.test(pw)) {
        testoP = document.createTextNode('La password deve contenere almeno un numero');
        nuovoP.id = 'errore';
    }
    else if (!/[^a-zA-Z0-9]/.test(pw)) {
        testoP = document.createTextNode('La password deve contenere almeno un carattere speciale');
        nuovoP.id = 'errore';
    }
    if (/[ ]/.test(pw)) {
        testoP = document.createTextNode('La password non deve contenere spazi');
        nuovoP.id = 'errore';
    }
    nuovoP.appendChild(testoP);
    daAppendere.appendChild(nuovoP);
}

const testPW = document.getElementById('pwd');
testPW.addEventListener('change', TestaPassword);   