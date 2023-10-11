<?php declare(strict_types=1);

$user = $pwd = '';
$userErr = $pwdErr = $loginErr = '';

$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    // nel login non mi interessa cosa l'utente inserisce nei campi, perche tanto io controllo solo se il suo user e 
    // la sua pw coincidono con quelli nel db
    session_start();
    if ($_SESSION['username'] != null) {
        header('Location: ../html/modalità.html');
        throw new Exception("Utente già loggato");
    }

    if (empty($_POST['username'])) {
        $userErr = "L'username è richiesto";
        throw new Exception("Username richiesto");
    } else
        $user = $_POST['user'];

    if (empty($_POST['pwd'])) {
        $pwdErr = 'La password è richiesta';
        throw new Exception("Password richiesta");
    } else
        $pwd = $_POST['pwd'];

    $sql = "SELECT * FROM Utente WHERE Username = :user LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':user', $user);
    $statement->execute();
    $result = $pdo->query($sql);

    if ($result->rowCount() == 1) {
        // controllo se la password inserita dall'utente coincide con quella nel database
        $row = $result->fetch(PDO::FETCH_ASSOC);
        if (password_verify($pwd, $row['Password'])) {
            // login effettuato con successo
            // inizializzazione della sessione
            session_start();
            // salvataggio dell'username nella sessione
            $_SESSION['username'] = $user;
            // reindirizzamento alla pagina principale
            header('Location: ../html/modalità.html');
        } else {
            // login fallito
            $loginErr = 'Password errata <a href="recupera.html" id="reimposta_pw"> reimposta password </a> o riprova';
            throw new Exception("Password errata");
        }
    } else {
        // login fallito
        $loginErr = 'Username non trovato <a href="registrati.php" id="registrati"> registrati </a> o riprova';
        throw new Exception("Username non trovato");
    }
    //chiusura della connessione con il database
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}
?>