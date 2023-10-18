<?php declare(strict_types=1);

$tipoSalvataggio = $boolSalvataggio = $partita = $punteggio = '';

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    if (isset($_SESSION['username']) == false) {
        header("Location:../html/login.html");
        throw new Exception("Utente non loggato");
    }

    $salvaJSON = json_decode(file_get_contents('php://input'), true);
    $tipoSalvataggio = $salvaJSON['tipoSalvataggio'];
    $partita = $salvaJSON['stringaPartita'];
    $punteggio = $salvaJSON['punteggio'];

    if (empty($tipoSalvataggio)) {
        throw new Exception("Tipo di salvataggio richiesto");
    }

    if ($tipoSalvataggio == "privato") {
        $boolSalvataggio = 0;
    } 
    else if ($tipoSalvataggio == "pubblico") {
        $boolSalvataggio = 1;
    } 
    else {
        throw new Exception("Tipo di salvataggio non valido");
    }

    if (empty($partita)) {
        throw new Exception("Partita richiesta");
    }

    if (empty($punteggio)) {
        throw new Exception("Punteggio richiesto");
    }

    $sql = "INSERT INTO partitesalvate(Username, StringaPartita, TipoSalvataggio, Data) VALUE (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $_SESSION['username']);
    $stmt->bindValue(2, $partita);
    $stmt->bindValue(3, $boolSalvataggio);
    $stmt->bindValue(4, date("Y-m-d"));
    $stmt->execute();
    unset($_SESSION['stringaJSON']);
} 
catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
}
$pdo = null;
?>