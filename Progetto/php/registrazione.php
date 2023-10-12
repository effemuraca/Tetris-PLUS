<?php declare(strict_types=1);

$user = $mail = $pwd = $pwd2 = $domanda = $risposta = '';
$userErr = $pwdErr = $pwd2Err = $rispostaErr = $loginErr = false;
$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {

    if (empty($_POST['username'])) {
        throw new Exception("Username richiesto");
    } else {
        $user = $_POST['username'];

        // validazione dell'username (almeno 3 caratteri)
        if (strlen($user) < 3) {
            $userErr = true;
        } else if (strlen($user) > 20) {
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

    if (empty($_POST['mail'])) {
        throw new Exception("Mail richiesta");
    } else {
        $mail = $_POST['mail'];

        // validazione della mail
        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Mail non valida");
        }

    }

    if (empty($_POST['pwd'])) {
        throw new Exception("Password richiesta");
    } else {
        $pwd = $_POST['pwd'];

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

    if (empty($_POST['pwd2'])) {
        $pwd2Err = 'La password è richiesta';
        throw new Exception("Password richiesta");
    } else {
        $pwd2 = $_POST['pwd2'];

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

    if (empty($_POST['domanda'])) {
        throw new Exception("Domanda di sicurezza richiesta");
    } else {
        $domanda = $_POST['domanda'];
    }

    if (empty($_POST['risposta'])) {
        $rispostaErr = 'La risposta alla domanda di sicurezza è richiesta';
        throw new Exception("Risposta alla domanda di sicurezza richiesta");
    } else {
        $risposta = $_POST['risposta'];

        // validazione della domanda di sicurezza (almeno 3 caratteri)
        if (strlen($risposta) < 3) {
            $rispostaErr = true;
        } else if (strlen($risposta) > 20) {
            $rispostaErr = true;
        }
        // validazione della domanda di sicurezza (nessun carattere speciale)
        else if (preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $risposta)) {
            $rispostaErr = true;
        }

        if ($rispostaErr)
            throw new Exception("Risposta alla domanda di sicurezza non valida");
    }

    $sql = "SELECT * FROM Utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();

    if ($stmt->fetch(pdo::FETCH_ASSOC) == false) {
        $sql = "SELECT * FROM Utente WHERE Mail = ? LIMIT 1";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $mail);
        $stmt->execute();

        //oss: si è supposto possibile ci possano essere più utenti con la stessa mail
        $sql = "INSERT INTO Utente (Username, Mail, Password, Domanda, Risposta) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $user);
        $stmt->bindValue(2, $mail);
        $stmt->bindValue(3, password_hash($pwd, PASSWORD_DEFAULT));
        $stmt->bindValue(4, $domanda);
        $stmt->bindValue(5, password_hash($risposta, PASSWORD_DEFAULT));
        $stmt->execute();
        $response = [
            'stato' => true,
            'messaggio' => 'Registrazione effettuata con successo'
        ];
    } else {
        $response = [
            'stato' => false,
            // stampa come messaggio la riga del database che contiene l'username inserito dall'utente
            'messaggio' => 'Username già in uso'
        ];
    }
    echo json_encode($response);
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}


?>