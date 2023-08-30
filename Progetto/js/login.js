"use strict";

function TestaPassword() {
    let psw = document.querySelector("#pwd").value;
    let all = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()=ç°§-]).{8,}$/;
    if (all.test(psw)) return true;
    let maiusc = /^(?=.*?[A-Z])/;
    if (!maiusc.test(psw)) ErrorRegister.push("Almeno una lettera maiuscola nella password");
    let minusc = /^(?=.*?[a-z])/;
    if (!minusc.test(psw)) ErrorRegister.push("Almeno una lettera minuscola nella password");
    let special = /^(?=.*?[#?!@$%^&*()=ç°§-])/;
    if (!special.test(psw)) ErrorRegister.push("Almeno un carattere speciale nella password");
    return false;
}