<?php declare(strict_types=1);

$user = $pwd = $pwd2 = $domanda = $risposta = '';
$pwdErr = $pwd2Err = false;
$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {

    $recuperaJSON = json_decode(file_get_contents('php://input'), true);
    $user = $recuperaJSON['username'];
    $pwd = $recuperaJSON['pwd'];
    $pwd2 = $recuperaJSON['pwd2'];
    $risposta = $recuperaJSON['risposta_account'];
    
    // il controllo sulla presenza di username e password è già stato fatto in html, ma è qui ugualmente per sicurezza
    if (empty($user)) {
        throw new Exception("Username richiesto");
    } 

    if (empty($pwd)) {
        throw new Exception("Password richiesta");
    } 

        // validazione della password (almeno 8 caratteri)
        if (strlen($pwd) < 8) {
            $pwdErr = true;
        } 
        else if (strlen($pwd) > 20) {
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

    if (empty($pwd2)) {
        $pwd2Err = 'La password è richiesta';
        throw new Exception("Password richiesta");
    } 
        // validazione della password (almeno 8 caratteri)
        if (strlen($pwd2) < 8) {
            $pwd2Err = true;
        } 
        else if (strlen($pwd2) > 20) {
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

    if (empty($risposta)) {
        throw new Exception("Risposta alla domanda di sicurezza richiesta");
    } 

    // controllo se la risposta alla domanda di sicurezza inserita dall'utente coincide con quella nel database
    $row = $stmt->fetch(pdo::FETCH_ASSOC);
    if (password_verify($risposta, $row['Risposta'])) {
        // aggiornamento della password
        $sql = "UPDATE utente SET Password = ? WHERE Username = ?";
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
    } 
    else {
        // risposta alla domanda di sicurezza errata
        throw new Exception("Risposta alla domanda di sicurezza errata");
    }
}
catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => 'Errore: ' . $e->getMessage()
    ];
}

echo json_encode($response);
$pdo = null;
?>