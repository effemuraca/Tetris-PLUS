<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    session_start();
    $userJSON = json_decode(file_get_contents('php://input'), true);
    $user = $userJSON['username'];

    $sql = "SELECT Domanda FROM utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();

    if ($stmt->fetch(pdo::FETCH_ASSOC) == false) {
        throw new Exception('Domanda non trovata, controlla di aver inserito correttamente lo username');
    } 
    else {
        $response = [
            'stato' => true,
            'messaggio' => $stmt->fetch(pdo::FETCH_ASSOC)['Domanda']
        ];
    }

} 
catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => "Errore: " . $e->getMessage()
    ];
}
echo json_encode($response);
$pdo = null;
?>