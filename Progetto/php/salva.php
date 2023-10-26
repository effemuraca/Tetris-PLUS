<?php declare(strict_types=1);

$tipoSalvataggio = $partita = $punteggio = $salvataggioDoppio = '';

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
    $salvataggioDoppio = $salvaJSON['salvataggioDoppio'];

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

    $user = $_SESSION['username'];
    if (empty($user)) {
        throw new Exception("Utente non loggato");
    }

    $sql = "INSERT INTO partitesalvate(Username, StringaPartita, TipoSalvataggio, Data, Punteggio) VALUE (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->bindValue(2, $partitaStringa);
    $stmt->bindValue(3, $tipoSalvataggio);
    $stmt->bindValue(4, date("Y-m-d"));
    $stmt->bindValue(5, $punteggio);
    $stmt->execute();

    if ($salvataggioDoppio == true) {
        // si suppone che la partita associata a quella da salvare sia l'ultima salvata dall'utente loggato
        $sql = "SELECT idSalvate FROM partitesalvate WHERE idSalvate = (SELECT MAX(idSalvate) FROM partitesalvate) AND Username = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $user);
        $stmt->execute();
        $idSalvata = $stmt->fetch(PDO::FETCH_ASSOC)['idSalvate'];
        if (empty($idSalvata)) {
            throw new Exception("Errore nel salvataggio della partita");
        }

        // recupero l'id della partita che sto salvando
        $sql = "SELECT idSalvate FROM partitesalvate WHERE StringaPartita = ? AND Username = ? AND TipoSalvataggio = ? AND Data = ? AND Punteggio = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $partitaStringa);
        $stmt->bindValue(2, $user);
        $stmt->bindValue(3, $tipoSalvataggio);
        $stmt->bindValue(4, date("Y-m-d"));
        $stmt->bindValue(5, $punteggio);
        $stmt->execute();
        $partitaAttuale = $stmt->fetch(PDO::FETCH_ASSOC)['idSalvate'];
        if (empty($partitaAttuale)) {
            throw new Exception("Errore nel salvataggio della partita");
        }
     
        
        //inserisco nella nella partita che sto salvando l'id della partita salvata associata
        $sql = "INSERT INTO partitesalvate(idPartitaCompagno) VALUE (?) WHERE idSalvate = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $idSalvata);
        $stmt->bindValue(2, $partitaAttuale);
        $stmt->execute(); 
    }

    $response = [
        'stato' => true,
        'messaggio' => 'Salvataggio effettuato con successo'
    ];
} 
catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => $e->getMessage()
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;
?>