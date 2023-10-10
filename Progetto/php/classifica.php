<?php declare(strict_types=1);
include_once("classi.php");

$c_str = "mysql:host=localhost;dbname=muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $stmt = $pdo->prepare("SELECT (Username, Punteggio, Data) FROM utenti ORDER BY Punteggio DESC LIMIT 20");
    $stmt->execute();
    $classifica = $stmt->fetchAll(PDO::FETCH_ASSOC);
   // $myJSON = json_encode($classifica);
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}



?>  