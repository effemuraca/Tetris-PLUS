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

    $sql = "SELECT * FROM partitesalvate WHERE idSalvate = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $idPartita);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        throw new Exception("Partita non trovata");
    } 
    else {
        $response = [
            'stato' => true,
            'partita' => $stmt->fetch(pdo::FETCH_ASSOC)['StringaPartita']
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