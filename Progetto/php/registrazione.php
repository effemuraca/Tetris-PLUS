<?php declare(strict_types=1);

$user = $mail = $pwd = $domanda =  $risposta = '';
$userErr = $mailErr = $pwdErr = $rispostaErr = $loginErr = '';
$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function generateRandomSalt() {
    return base64_encode(random_bytes(8));
}

try {

    if (empty($_POST['username'])) {
        $userErr = "L'username è richiesto";
        throw new Exception("Username richiesto");
    } else {
        $user = $_POST['username'];

        // validazione dell'username (almeno 3 caratteri)
        if (strlen($user) < 3) {
            $userErr = 'Lo username deve contenere almeno 3 caratteri';
        }
        else if (strlen($user) > 20) {
            $userErr = 'Lo username deve contenere al massimo 20 caratteri';
        }
        // validazione dell'username (nessuno spazio)
        else if (preg_match("/\s/", $user)) {
            $userErr = 'Lo username non deve contenere spazi';
        }
        // validazione dell'username (nessun carattere speciale)
        else if (preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $user)) {
            $userErr = 'Lo username non deve contenere caratteri speciali';
        }

        if ($userErr != '')
            throw new Exception("Username non valido");
    }

    if (empty($_POST['mail'])) {
        $mailErr = "La mail è richiesta";
        throw new Exception("Mail richiesta");
    } else {
        $mail = $_POST['mail'];

        // validazione della mail
        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            $mailErr = "La mail non è valida";
            throw new Exception("Mail non valida");
        }

    }

    if (empty($_POST['pwd'])) {
        $pwdErr = 'La password è richiesta';
        throw new Exception("Password richiesta");
    } else {
        $pwd = $_POST['pwd'];

        // validazione della password (almeno 8 caratteri)
        if (strlen($pwd) < 8) {
            $pwdErr = 'La password deve contenere almeno 8 caratteri';
        } else if (strlen($pwd) > 20) {
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

    $domanda = $_POST['domanda'];
    
    if (empty($_POST['riposta'])) {
        $rispostaErr = 'La risposta alla domanda di sicurezza è richiesta';
        throw new Exception("Risposta alla domanda di sicurezza richiesta");
    } else {
        $risposta = $_POST['riposta'];

        // validazione della domanda di sicurezza (almeno 3 caratteri)
        if (strlen($risposta) < 3) {
            $rispostaErr = 'La risposta alla domanda di sicurezza deve contenere almeno 3 caratteri';
        }
        else if (strlen($risposta) > 20) {
            $rispostaErr = 'La risposta alla domanda di sicurezza deve contenere al massimo 20 caratteri';
        }
        // validazione della domanda di sicurezza (nessun carattere speciale)
        else if (preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $risposta)) {
            $rispostaErr = 'La risposta alla domanda di sicurezza non deve contenere caratteri speciali';
        }

        if ($rispostaErr != '')
            throw new Exception("Riposta alla domanda di sicurezza non valida");
    }

    $sql = "SELECT * FROM Utente WHERE Username = :user LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':user', $user);
    $statement->execute();
    $result = $pdo->query($sql);

    if ($result->rowCount() == 1) {
        $loginErr = "Username già in uso";
        throw new Exception("Username già in uso");
    }

    $sql = "SELECT * FROM Utente WHERE Mail = :mail LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':mail', $mail);
    $statement->execute();
    $result = $pdo->query($sql);

    if ($result->rowCount() == 1) {
        $loginErr = "Mail già in uso";
        throw new Exception("Mail già in uso");
    }

    $salt = generateRandomSalt();
    $sql = "INSERT INTO Utente (Username, Mail, Password, Salt, Domanda, Riposta) VALUES (:user, :mail, :pwd, :salt, :domanda, :risposta)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':user', $user);
    $statement->bindValue(':mail', $mail);
    $statement->bindValue(':pwd', md5($pwd . $salt));
    $statement->bindValue(':salt', $salt);
    $statement->bindValue(':domanda', $domanda);
    $statement->bindValue(':risposta', $risposta);
    $statement->execute();

    header("Location: ../html/login.html");
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}


?>