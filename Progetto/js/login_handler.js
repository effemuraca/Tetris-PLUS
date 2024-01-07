'use strict';

// funzione per la validazione del form di login
function TestaPassword() {
    const pw = document.getElementById('pwd').value;
    const checkErrore = document.getElementById('errore');
    if (checkErrore !== null) {
        checkErrore.remove();
    }
    const daAppendere = document.getElementsByClassName('password')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1vw';

    if (pw.length < 8) {
        nuovoP.textContent = 'La password deve contenere almeno 8 caratteri';
        nuovoP.id = 'errore';
    }
    else if (pw.length > 20) {
        nuovoP.textContent = 'La password deve contenere al massimo 20 caratteri';
        nuovoP.id = 'errore';
    }
    else if (!/[a-z]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno una lettera minuscola';
        nuovoP.id = 'errore';
    }
    else if (!/[A-Z]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno una lettera maiuscola';
        nuovoP.id = 'errore';
    }
    else if (!/[0-9]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno un numero';
        nuovoP.id = 'errore';
    }
    else if (!/[^a-zA-Z0-9]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno un carattere speciale';
        nuovoP.id = 'errore';
    }
    if (/[ ]/.test(pw)) {
        nuovoP.textContent = 'La password non deve contenere spazi';
        nuovoP.id = 'errore';
    }
    daAppendere.appendChild(nuovoP);
}

function testaUsername() {
    const username = document.getElementById('username').value;
    const checkErrore = document.getElementById('errore');
    if (checkErrore !== null) {
        checkErrore.remove();
    }
    const daAppendere = document.getElementsByClassName('username')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1vw';
    nuovoP.textContent = null;

    if (username.length < 3) {
        nuovoP.textContent = 'Lo username deve contenere almeno 5 caratteri';
        nuovoP.id = 'errore';
    }
    else if (username.length > 20) {
        nuovoP.textContent = 'Lo username deve contenere al massimo 20 caratteri';
        nuovoP.id = 'errore';
    }
    else if (/[ ]/.test(username)) {
        nuovoP.textContent = 'Lo username non deve contenere spazi';
        nuovoP.id = 'errore';
    }
    daAppendere.appendChild(nuovoP);
}

function testaRisposta() {
    const risposta = document.getElementById('risposta').value;
    const checkErrore = document.getElementById('errore');
    if (checkErrore !== null) {
        checkErrore.remove();
    }
    const daAppendere = document.getElementsByClassName('risposta')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1vw';

    if (risposta.length < 3) {
        nuovoP.textContent = 'La risposta deve contenere almeno 5 caratteri';
        nuovoP.id = 'errore';
    }
    else if (risposta.length > 30) {
        nuovoP.textContent = 'La risposta deve contenere al massimo 20 caratteri';
        nuovoP.id = 'errore';
    }
    daAppendere.appendChild(nuovoP);
}

function testaMail() {
    const mail = document.getElementById('mail').value;
    const checkErrore = document.getElementById('errore');
    if (checkErrore !== null) {
        checkErrore.remove();
    }
    const daAppendere = document.getElementsByClassName('mail')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1vw';

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mail)) {
        nuovoP.textContent = 'Inserire una mail valida';
        nuovoP.id = 'errore';
    }
    else if (mail.length < 6) {
        nuovoP.textContent = 'La mail deve contenere almeno 5 caratteri';
        nuovoP.id = 'errore';
    }
    else if (mail.length > 30) {
        nuovoP.textContent = 'La mail deve contenere al massimo 30 caratteri';
        nuovoP.id = 'errore';
    }
    daAppendere.appendChild(nuovoP);
}

const testPW = document.getElementById('pwd');
if (testPW != null)
    testPW.addEventListener('change', TestaPassword);

const testUsername = document.getElementById('username');
if (testUsername != null)
    testUsername.addEventListener('change', testaUsername);

const testDomanda = document.getElementById('risposta');
if (testDomanda != null)
    testDomanda.addEventListener('change', testaRisposta);

const testMail = document.getElementById('mail');
if (testMail != null)
    testMail.addEventListener('change', testaMail);

document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('username') !== null) {
        alert('Sei già loggato');
        window.location.href = '../html/modalità.html';
    }
})