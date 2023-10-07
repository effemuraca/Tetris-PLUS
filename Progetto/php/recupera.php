<?php declare(strict_types=1);

$user = $pwd = $domanda = '';
$userErr = $pwdErr = $domandaErr = $loginErr = '';
$c_str = "mysql:host=localhost;dbname=muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function generateRandomSalt() {
    return base64_encode(random_bytes(8));
}

try {
    // il controllo sulla presenza di username e password è già stato fatto in html, ma è qui ugualmente per sicurezza
    if (empty($_POST['username'])) {
        $userErr = "L'username è richiesto";
        throw new Exception("Username richiesto");
    } else
        $user = $_POST['username'];

    if (empty($_POST['pwd'])) {
        $pwdErr = 'La password è richiesta';
        throw new Exception("Password richiesta");
    } else {
        $pwd = $_POST['pwd'];

        // validazione della password (almeno 8 caratteri)
        if (strlen($pwd) < 8) {
            $pwdErr = 'La password deve contenere almeno 8 caratteri';
        }
        else if (strlen($pwd) > 20) {
            $pwdErr = 'La password deve contenere al massimo 20 caratteri';
        }
        // validazione della password (almeno un numero)
        else if (!preg_match("#[0-9]+#", $pwd)) {
            $pwdErr = 'La password deve contenere almeno un numero';
        }
        // validazione della password (almeno una lettera minuscola)
        else if (!preg_match("#[a-z]+#", $pwd)) {
            $pwdErr = 'La password deve contenere almeno una lettera minuscola';
        }
        // validazione della password (almeno una lettera maiuscola)
        else if (!preg_match("#[A-Z]+#", $pwd)) {
            $pwdErr = 'La password deve contenere almeno una lettera maiuscola';
        }
        // validazione della password (almeno un carattere speciale)
        else if (!preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $pwd)) {
            $pwdErr = 'La password deve contenere almeno un carattere speciale';
        }
        // validazione della password (nessuno spazio)
        else if (preg_match("/\s/", $pwd)) {
            $pwdErr = 'La password non deve contenere spazi';
        }

        if ($pwdErr != '')
            throw new Exception("Password non valida");
    }

    if (empty($_POST['domanda'])) {
        $domandaErr = 'La domanda di sicurezza è richiesta';
        throw new Exception("Domanda di sicurezza richiesta");
    } else
        $domanda = $_POST['domanda'];

    $sql = "SELECT * FROM utenti WHERE username = :user AND domanda = :domanda LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':user', $user);
    $statement->bindValue(':domanda', $domanda);
    $statement->execute();
    $result = $pdo->query($sql);

    if ($result->rowCount() == 1) {
        // aggiornamento della password
        $salt = generateRandomSalt();
        $sql = "UPDATE utenti SET password = :pwd, salt = :salt WHERE username = :user";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(':pwd', md5($pwd . $salt));
        $statement->bindValue(':salt', $salt);
        $statement->bindValue(':user', $user);
        $statement->execute();

        // inizializzazione della sessione
        session_start();
        // salvataggio dell'username nella sessione
        $_SESSION['username'] = $user;
        // reindirizzamento alla pagina principale
        header('Location: ../html/modalità.html');
    } else {
        // login fallito
        $loginErr = 'Username o domanda di sicurezza errati';
        throw new Exception("Username o domanda di sicurezza errati");
        //chiusura della connessione con il database
    }
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}
?>