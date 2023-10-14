<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    session_start();
    if (isset($_SESSION['username']) == false) {
        header("Location:../html/login.html");
        throw new Exception("Utente non loggato");
    }

    $punt = json_decode(file_get_contents('php://input'), true);
    $punteggio = $punt['punteggio'];

    $sql = "INSERT INTO partitesalvate(Username, Data, Punteggio) VALUE (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $_SESSION['username']);
    $data = date("Y-m-d");
    $stmt->bindParam(2, $data);
    $stmt->bindParam(3, $punteggio);
    $stmt->execute();

} 
catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
}
$pdo = null;
?>