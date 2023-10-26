<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

try {
    $sql = "SELECT * FROM partitesalvate WHERE TipoSalvataggio IS NOT NULL ORDER BY Punteggio DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        $response = [
            'length' => 0,
            'messaggio' => 'Non ci sono partite salvate'
        ];
    } 
    else {
        $response = [
            'length' => $stmt->rowCount(),
            'messaggio' => 'Partite salvate caricate con successo',
            'salvate' => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ];
    }
} 
catch (PDOException | Exception $e) {
    $response = [
        'length' => 0,
        'messaggio' => 'Errore: ' . $e->getMessage()
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;

?>