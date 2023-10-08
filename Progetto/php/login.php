<?php declare(strict_types=1);
$user = $pwd = '';
$userErr = $pwdErr = $loginErr = '';

$c_str = "mysql:host=localhost;dbname=muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function generateRandomSalt()
{
    return base64_encode(random_bytes(8));
}

try {
    // nel login non mi interessa cosa l'utente inserisce nei campi, perche tanto io controllo solo se il suo user e 
    // la sua pw coincidono con quelli nel db
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

    $sql = "SELECT salt FROM utenti WHERE username = :user LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':user', $user);
    $statement->execute();
    $result = $pdo->query($sql);
    if ($result->rowCount() == 1) {
        $salt = $result->fetchColumn();
        $sql = "SELECT * FROM utenti WHERE username = :user AND password = :pwd LIMIT 1";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(':user', $user);
        $statement->bindValue(':pwd', md5($pwd . $salt));
        $statement->execute();
        $result = $pdo->query($sql);
        // login effettuato con successo
        // inizializzazione della sessione
        session_start();
        // salvataggio dell'username nella sessione
        $_SESSION['username'] = $user;
        // reindirizzamento alla pagina principale
        header('Location: ../html/modalità.html');
    } else {
        // login fallito
        $loginErr = 'Username o password errati <a href="recupera.html" id="reimposta_pw"> reimposta password </a>';
        throw new Exception("Username o password errati");
    }
    //chiusura della connessione con il database
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}
?>