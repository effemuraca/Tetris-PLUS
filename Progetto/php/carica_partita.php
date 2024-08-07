<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

try {
    if (isset($_SESSION['username']) == false) {
        header("Location:../html/login.php");
        throw new Exception("Utente non loggato");
    }

    $idJSON = json_decode(file_get_contents('php://input'), true);
    $idPartita = $idJSON['idPartita'];

    $sql = "SELECT StringaPartita, PartitaDoppia FROM partitesalvate WHERE idSalvate = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $idPartita);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        throw new Exception("Partita non trovata");
    } 
    else {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $partita = $row['StringaPartita'];
        $partitaDoppia = $row['PartitaDoppia'];
        $response = [
            'stato' => true,
            'partita' => $partita,
            'partitaDoppia' => $partitaDoppia 
        ];
    }

} 
catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'error' => $e->getMessage()
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;
?>