<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    if (empty($_POST['username'])) {
        throw new Exception("Username richiesto");
    } else
        $user = $_POST['username'];

    $sql = "SELECT Domanda FROM Utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();

    if ($stmt->fetch(pdo::FETCH_ASSOC) == false) {
        $response = [
            'stato' => false,
            'messaggio' => 'Domanda non trovata, controlla di aver inserito correttamente lo username'
        ];
    } else {
        $response = [
            'stato' => true,
            'messaggio' => $stmt->fetch(pdo::FETCH_ASSOC)['Domanda']
        ];
    }
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}