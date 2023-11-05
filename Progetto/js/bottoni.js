const bottoneHome = document.getElementsByClassName("bottone_home")[0];
const bottoneLogin = document.getElementsByClassName("bottone_login")[0];
const bottoneModalita = document.getElementsByClassName("bottone_modalita")[0];
const bottoneClassifica = document.getElementsByClassName("bottone_classifica")[0];
const bottoneDocumentazione = document.getElementsByClassName("bottone_documentazione")[0];

if (bottoneHome !== undefined){
    bottoneHome.addEventListener("click", function(){
        window.location.href = "../html/index.html";
    });
}

if (bottoneLogin !== undefined){
    bottoneLogin.addEventListener("click", function(){
        window.location.href = "../html/login.html";
    });
}

if (bottoneModalita !== undefined){
    bottoneModalita.addEventListener("click", function(){
        window.location.href = "../html/modalità.html";
    });
}

if (bottoneClassifica !== undefined){
    bottoneClassifica.addEventListener("click", function(){
        window.location.href = "../html/classifica.html";
    });
}

if (bottoneDocumentazione !== undefined){
    bottoneDocumentazione.addEventListener("click", function(){
        window.location.href = "../html/documentazione.html";
    });
}