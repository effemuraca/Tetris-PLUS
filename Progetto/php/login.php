<?php declare(strict_types=1);
    $user = $pwd = '';
    $userErr = $pwdErr = $loginErr = '';

    // nel login non mi interessa cosa l'utente inserisce nei campi, perche tanto io controllo solo se il suo user e 
    // la sua pw coincidono con quelli nel db
    if ($_SESSION['username'] != null)
        header('Location: ../html/modalità.html');

    if (empty($_POST['username']))
        $userErr = "L'username è richiesto";
    else
        $user = $_POST['user'];

    if (empty($_POST['pwd']))
        $pwdErr = 'La password è richiesta';
    else
        $pwd = $_POST['pwd'];

    // connessione al server tramite PDO 
    try {
        $c_str = "mysql:host=localhost;dbname=muraca";
        $pdo = new PDO($c_str, 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM utenti WHERE username = :user AND password = :pwd LIMIT 1";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(':user', $user);
        $statement->bindValue(':pwd', $pwd);
        $statement->execute();
        $result = $pdo->query($sql);

        if ($result->rowCount() == 1) {
            // login effettuato con successo
            // inizializzazione della sessione
            session_start();
            // salvataggio dell'username nella sessione
            $_SESSION['username'] = $user;
            // reindirizzamento alla pagina principale
            header('Location: ../html/modalità.html');
        }
        else
            // login fallito
            $loginErr = 'Username o password errati <a href="recupera.html" id="reimposta_pw"> reimposta password </a>';

        //chiusura della connessione con il database
        $pdo = null;
    }

    catch (PDOException $e) {
        echo "Errore: " . $e->getMessage();
        die();
    }
?>