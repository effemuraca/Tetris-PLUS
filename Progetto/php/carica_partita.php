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

    $id = json_decode(file_get_contents('php://input'), true);
    $idPartita = $id['idPartita'];

    $sql = "SELECT * FROM PartiteSalvate WHERE idSalvate = :id LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindParam(':id', $idPartita);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    // se result è vuoto non esiste la partita
    if ($result == null) {
        echo "Partita non trovata";
        throw new Exception("Partita non trovata");
    } else {
        $stringaJSON = $result['StringaPartita'];
        echo $stringaJSON;

    }

} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}
?>