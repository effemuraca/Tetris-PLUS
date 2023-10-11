<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    session_start();
    if (empty($_SESSION['username'])) {
        header("Location:../html/login.php");
        throw new Exception("Utente non loggato");
    }

    $punt = json_decode(file_get_contents('php://input'), true);
    $punteggio = $punt['punteggio'];

    $stmt = $pdo->prepare("INSERT INTO PartiteSalvate (Username, Data, Punteggio) VALUES (:user, :data, :punteggio)");
    $stmt->bindParam(':user', $_SESSION['username']);
    $data = date("Y-m-d");
    $stmt->bindParam(':data', $data);
    // al posto dei puntini ci va il punteggio
    $stmt->bindParam(':punteggio', $punteggio);
    $stmt->execute();

} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}
?>