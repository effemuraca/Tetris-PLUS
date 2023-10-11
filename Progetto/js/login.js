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
    let testoP;

    if (pw.length < 8) {
        testoP = document.createTextNode('La password deve contenere almeno 8 caratteri');
        nuovoP.id = 'errore';
    }
    else if (pw.length > 20) {
        testoP = document.createTextNode('La password deve contenere al massimo 20 caratteri');
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

function testaUsername() {
    const username = document.getElementById('username').value;
    const checkErrore = document.getElementById('errore');
    if (checkErrore !== null) {
        checkErrore.remove();
    }
    const daAppendere = document.getElementsByClassName('username')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1vw';
    let testoP = null;

    if (username.length < 3) {
        testoP = document.createTextNode('Lo username deve contenere almeno 5 caratteri');
        nuovoP.id = 'errore';
    }
    else if (username.length > 20) {
        testoP = document.createTextNode('Lo username deve contenere al massimo 20 caratteri');
        nuovoP.id = 'errore';
    }
    else if (/[ ]/.test(username)) {
        testoP = document.createTextNode('Lo username non deve contenere spazi');
        nuovoP.id = 'errore';
    }
    nuovoP.appendChild(testoP);
    daAppendere.appendChild(nuovoP);
    if (testoP === null) {
        sessionStorage.setItem('username', username);
    }
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
    let testoP;

    if (risposta.length < 3) {
        testoP = document.createTextNode('La risposta deve contenere almeno 5 caratteri');
        nuovoP.id = 'errore';
    }
    else if (risposta.length > 30) {
        testoP = document.createTextNode('La risposta deve contenere al massimo 20 caratteri');
        nuovoP.id = 'errore';
    }
    nuovoP.appendChild(testoP);
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
    let testoP;

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mail)) {
        testoP = document.createTextNode('Inserire una mail valida');
        nuovoP.id = 'errore';
    }
    else if (mail.length < 6) {
        testoP = document.createTextNode('La mail deve contenere almeno 5 caratteri');
        nuovoP.id = 'errore';
    }
    else if (mail.length > 30) {
        testoP = document.createTextNode('La mail deve contenere al massimo 30 caratteri');
        nuovoP.id = 'errore';
    }
    nuovoP.appendChild(testoP);
    daAppendere.appendChild(nuovoP);



}

const testPW = document.getElementById('pwd');
testPW.addEventListener('change', TestaPassword);

const testUsername = document.getElementById('username');
testUsername.addEventListener('change', testaUsername);

const testDomanda = document.getElementById('risposta');
testDomanda.addEventListener('change', testaRisposta);

const testMail = document.getElementById('mail');
testMail.addEventListener('change', testaMail);

