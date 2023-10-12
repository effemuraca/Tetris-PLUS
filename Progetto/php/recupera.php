<?php declare(strict_types=1);

$user = $pwd = $pwd2 = $domanda = $risposta = '';
$userErr = $pwdErr = $pwd2Err = $passErr = $rispostaErr = $loginErr = '';
$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    // il controllo sulla presenza di username e password è già stato fatto in html, ma è qui ugualmente per sicurezza
    if (empty($_POST['username'])) {
        $userErr = "L'username è richiesto";
        throw new Exception("Username richiesto");
    } else
        $user = $_POST['username'];

    $sql = "SELECT * FROM Utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        /*
        qui manca tutta la parte in cui rimbalzo la richiesta ad html, che deve recuperare il resto dei dati
        l'idea è fare una roba con ajax che funziona cosi:
            - una volta messo il nome utente (onchange tipo) si cerca nel db una riga che contiene quel nome utente e si mostra
            - quando l'utente preme sul bottone (invia il form) ricontrollo che non abbia modificato il nome utente, in tal caso segnalo l'errore, altrimenti procedo
            con i controlli per il cambio della pw
        */

        // controllo se la risposta alla domanda di sicurezza inserita dall'utente coincide con quella nel database
        $row = $stmt->fetch(pdo::FETCH_ASSOC);
        if (password_verify($risposta, $row['Risposta'])) {
            // aggiornamento della password
            $sql = "UPDATE Utente SET Password = ? WHERE Username = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $user);
            $stmt->bindValue(2, password_hash($pwd, PASSWORD_DEFAULT));
            $stmt->execute();
            // login effettuato con successo
            // inizializzazione della sessione
            session_start();
            // salvataggio dell'username nella sessione
            $_SESSION['username'] = $user;
            // reindirizzamento alla pagina principale
            header('Location: ../html/modalità.html');
        } else {
            // risposta alla domanda di sicurezza errata
            $loginErr = 'Risposta alla domanda di sicurezza errata';
        }
    } else {
        // utente non trovato
        $loginErr = 'Username errato, <a href="registrati.php" id="registrati"> registrati </a> o riprova';
    }
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}


/*

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

    if (empty($_POST['risposta_account'])) {
        $rispostaErr = 'La risposta alla domanda di sicurezza è richiesta';
        throw new Exception("Risposta alla domanda di sicurezza richiesta");
    } else
        $risposta = $_POST['risposta_account'];*/
?>