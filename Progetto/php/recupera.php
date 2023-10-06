<?php declare(strict_types=1);

    $user = $pwd = $domanda = '';
    $userErr = $pwdErr = $domandaErr = '';

    // il controllo sulla presenza di username e password è già stato fatto in html, ma è qui ugualmente per sicurezza
    if (empty($_POST['username']))
        $userErr = "L'username è richiesto";
    else { 
        $user = $_POST['username'];
        if (!preg_match("/^[a-zA-Z0-9_]*$/", $user)) {
            $errore = "L'username può contenere solo lettere, numeri e trattini bassi";
        }
    }

    if (empty($_POST['pwd']))
        $pwdErr = 'La password è richiesta';
    else
        $pwd = $_POST['pwd'];
        
        if (/* controlla che non sia gia uguale a quella nel database*/) {
            $pwdErr = 'La password deve essere diversa da quella attuale';
        }
        // validazione della password (almeno 8 caratteri)
        if (strlen($pwd) < 8) {
            $pwdErr = 'La password deve contenere almeno 8 caratteri';
        }
        // validazione della password (almeno un numero)
        if (!preg_match("#[0-9]+#", $pwd)) {
            $pwdErr = 'La password deve contenere almeno un numero';
        }
        // validazione della password (almeno una lettera minuscola)
        if (!preg_match("#[a-z]+#", $pwd)) {
            $pwdErr = 'La password deve contenere almeno una lettera minuscola';
        }
        // validazione della password (almeno una lettera maiuscola)
        if (!preg_match("#[A-Z]+#", $pwd)) {
            $pwdErr = 'La password deve contenere almeno una lettera maiuscola';
        }
        // validazione della password (almeno un carattere speciale)
        if (!preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $pwd)) {
            $pwdErr = 'La password deve contenere almeno un carattere speciale';
        }
        // validazione della password (nessuno spazio)
        if (preg_match("/\s/", $pwd)) {
            $pwdErr = 'La password non deve contenere spazi';
        }
        

    if (empty($_POST['domanda']))
        $domandaErr = 'La domanda di sicurezza è richiesta';
    else
        $domanda = $_POST['domanda'];
?>