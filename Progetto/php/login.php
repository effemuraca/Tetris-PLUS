<?php declare(strict_types=1);

$user = $pwd = '';

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    // nel login non mi interessa cosa l'utente inserisce nei campi, perche tanto io controllo solo se il suo user e 
    // la sua pw coincidono con quelli nel db
    if (isset($_SESSION['username'])) {
        header('Location: ../html/modalità.html');
        throw new Exception("Utente già loggato");
    }

    $loginJSON = json_decode(file_get_contents('php://input'), true);
    $user = $loginJSON['username'];
    $pwd = $loginJSON['password'];

    if (empty($user)) {
        throw new Exception("Username richiesto");
    }

    if (empty($pwd)) {
        throw new Exception("Password richiesta");
    }

    $sql = "SELECT * FROM utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();


    if ($stmt->rowCount() == 1) {
        // controllo se la password inserita dall'utente coincide con quella nel database
        $row = $stmt->fetch(pdo::FETCH_ASSOC);
        if (password_verify($pwd, $row['Password'])) {
            // login effettuato con successo
            // inizializzazione della sessione
            session_start();
            // salvataggio dell'username nella sessione
            $_SESSION['username'] = $user;
            $response = [
                'stato' => true,
                'messaggio' => 'Login effettuato con successo'
            ];
        } else {
            // login fallito
            throw new Exception("Password errata, riprova");
        }
    } else {
        // login fallito
        throw new Exception("Username errato, riprova");
    }
} catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => 'Errore: ' . $e->getMessage()
    ];
}
header('Content-Type: application/json');
echo json_encode($response);
//chiusura della connessione con il database
$pdo = null;
?>