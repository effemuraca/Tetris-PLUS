<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    session_start();
    if (isset($_SESSION['username']) == false) {
        header("Location:../html/login.php");
        throw new Exception("Utente non loggato");
    }

    $id = json_decode(file_get_contents('php://input'), true);
    $idPartita = $id['idPartita'];

    $sql = "SELECT * FROM PartiteSalvate WHERE idSalvate = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $idPartita);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
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