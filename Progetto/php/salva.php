<?php declare(strict_types=1);

$tipoSalvataggio = $partita = $partita2 = $punteggio = '';

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
if (session_status() == PHP_SESSION_NONE)
    session_start();

try {
    $salvaJSON = json_decode(file_get_contents('php://input'), true);
    $tipoSalvataggio = $salvaJSON['tipoSalvataggio'];
    $partita = $salvaJSON['partita'];
    $punteggio = $salvaJSON['punteggio'];
    $partita2 = $salvaJSON['partitaDoppia'];

    if (($tipoSalvataggio != 0 && $tipoSalvataggio != 1)) {
        throw new Exception("Tipo di salvataggio richiesto");
    }

    if (empty($partita)) {
        throw new Exception("Partita richiesta");
    }
    $partitaStringa = json_encode($partita);

    if (empty($punteggio)) {
        throw new Exception("Punteggio richiesto");
    }

    if (empty($partita2) && $partita2 != 0) {
        throw new Exception("Seconda partita richiesta");
    }
    $partitaStringa2 = json_encode($partita2);


    $user = $_SESSION['username'];
    if (empty($user)) {
        throw new Exception("Utente non loggato");
    }

    $sql = "INSERT INTO partitesalvate(Username, StringaPartita, PartitaDoppia, Data, Punteggio, TipoSalvataggio) VALUE (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->bindValue(2, $partitaStringa);
    $stmt->bindValue(3, $partitaStringa2);
    $stmt->bindValue(4, date("Y-m-d"));
    $stmt->bindValue(5, $punteggio);
    $stmt->bindValue(6, $tipoSalvataggio);
    $stmt->execute();

    $response = [
        'stato' => true,
        'messaggio' => 'Salvataggio effettuato con successo'
    ];
} catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => $e->getMessage()
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;
?>