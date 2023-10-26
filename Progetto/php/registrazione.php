<?php declare(strict_types=1);

$user = $mail = $pwd = $pwd2 = $domanda = $risposta = '';
$userErr = $pwdErr = $pwd2Err = $rispostaErr = false;
$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $userJSON = json_decode(file_get_contents('php://input'), true);
    $user = $userJSON['username'];
    $mail = $userJSON['mail'];
    $pwd = $userJSON['password'];
    $pwd2 = $userJSON['password2'];
    $domanda = $userJSON['domanda'];
    $risposta = $userJSON['risposta'];

    if (empty($user)) {
        throw new Exception("Username richiesto");
    } 
    else {
        // validazione dell'username (almeno 3 caratteri)
        if (strlen($user) < 3) {
            $userErr = true;
        } 
        else if (strlen($user) > 20) {
            $userErr = true;
        }
        // validazione dell'username (nessuno spazio)
        else if (preg_match("/\s/", $user)) {
            $userErr = true;
        }
        // validazione dell'username (nessun carattere speciale)
        else if (preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $user)) {
            $userErr = true;
        }

        if ($userErr)
            throw new Exception("Username non valido");
    }

    if (empty($mail)) {
        throw new Exception("Mail richiesta");
    }

    // validazione della mail
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Mail non valida");
    }

    if (empty($pwd)) {
        throw new Exception("Password richiesta");
    } 
    else {
        // validazione della password (almeno 8 caratteri)
        if (strlen($pwd) < 8) {
            $pwdErr = true;
        } else if (strlen($pwd) > 20) {
            $pwdErr = true;
        }
        // validazione della password (almeno un numero)
        else if (!preg_match("#[0-9]+#", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (almeno una lettera minuscola)
        else if (!preg_match("#[a-z]+#", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (almeno una lettera maiuscola)
        else if (!preg_match("#[A-Z]+#", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (almeno un carattere speciale)
        else if (!preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (nessuno spazio)
        else if (preg_match("/\s/", $pwd)) {
            $pwdErr = true;
        }

        if ($pwdErr)
            throw new Exception("Password non valida");
    }

    if (empty($pwd2)) {
        throw new Exception("Password richiesta");
    } else {
        // validazione della password (almeno 8 caratteri)
        if (strlen($pwd2) < 8) {
            $pwd2Err = true;
        } else if (strlen($pwd2) > 20) {
            $pwd2Err = true;
        }
        // validazione della password (almeno un numero)
        else if (!preg_match("#[0-9]+#", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (almeno una lettera minuscola)
        else if (!preg_match("#[a-z]+#", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (almeno una lettera maiuscola)
        else if (!preg_match("#[A-Z]+#", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (almeno un carattere speciale)
        else if (!preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (nessuno spazio)
        else if (preg_match("/\s/", $pwd2)) {
            $pwd2Err = true;
        }

        if ($pwd2Err)
            throw new Exception("Password non valida");
    }

    if (empty($domanda)) {
        throw new Exception("Domanda di sicurezza richiesta");
    } 
    if (empty($risposta)) {
        throw new Exception("Risposta alla domanda di sicurezza richiesta");
    } 
    else {
        // validazione della domanda di sicurezza (almeno 3 caratteri)
        if (strlen($risposta) < 3) {
            $rispostaErr = true;
        } 
        else if (strlen($risposta) > 20) {
            $rispostaErr = true;
        }
        // validazione della domanda di sicurezza (nessun carattere speciale)
        else if (preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $risposta)) {
            $rispostaErr = true;
        }

        if ($rispostaErr)
            throw new Exception("Risposta alla domanda di sicurezza non valida");
    }

    $sql = "SELECT * FROM utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();

    if ($stmt->fetch(pdo::FETCH_ASSOC) == false) {
        //oss: si è supposto possibile ci possano essere più utenti con la stessa mail
        $sql = "INSERT INTO utente (Username, Mail, Password, Domanda, Risposta) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $user);
        $stmt->bindValue(2, $mail);
        $stmt->bindValue(3, password_hash($pwd, PASSWORD_DEFAULT));
        $stmt->bindValue(4, $domanda);
        // la risposta alla domanda di sicurezzia viene hashata per evitare che un utente malintenzionato possa, attraverso il recupero 
        // della password, accedere ad un account qualunque, leggendo la risposta alla domanda di sicurezza in chiaro
        $stmt->bindValue(5, password_hash($risposta, PASSWORD_DEFAULT));
        $stmt->execute();
        $response = [
            'stato' => true,
            'messaggio' => 'Registrazione effettuata con successo'
        ];
    } 
    else {
        throw new Exception("Username già in uso");
    }
} 
catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => $e->getMessage()
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;
?>