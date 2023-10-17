<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

try {

    if (isset($_SESSION['username']) == false) {
        header("Location:../html/login.html");
        throw new Exception("Utente non loggato");
    }

    $punteggio = file_get_contents('php://input');

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