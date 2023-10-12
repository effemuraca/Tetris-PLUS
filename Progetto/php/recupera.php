<?php declare(strict_types=1);

$user = $pwd = $pwd2 = $domanda = $risposta = '';
$pwdErr = $pwd2Err = false;
$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    // il controllo sulla presenza di username e password è già stato fatto in html, ma è qui ugualmente per sicurezza
    if (empty($_POST['username'])) {
        throw new Exception("Username richiesto");
    } else
        $user = $_POST['username'];

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

    if (empty($_POST['risposta_account'])) {
        throw new Exception("Risposta alla domanda di sicurezza richiesta");
    } else
        $risposta = $_POST['risposta_account'];

    // controllo se la risposta alla domanda di sicurezza inserita dall'utente coincide con quella nel database
    $row = $stmt->fetch(pdo::FETCH_ASSOC);
    if (password_verify($risposta, $row['Risposta'])) {
        // aggiornamento della password
        $sql = "UPDATE Utente SET Password = ? WHERE Username = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $user);
        $stmt->bindValue(2, password_hash($pwd, PASSWORD_DEFAULT));
        $stmt->execute();
        // inizializzazione della sessione
        session_start();
        $response = [
            'stato' => true,
            'messaggio' => 'Passwors ripristinata con successo'
        ];
    } else {
        // risposta alla domanda di sicurezza errata
        $response = [
            'stato' => false,
            'messaggio' => 'Risposta alla domanda di sicurezza errata, riprova'
        ];
    }
    echo json_encode($response);
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}
?>