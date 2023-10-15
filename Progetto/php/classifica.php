<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $sql = "SELECT Username, Data, Punteggio FROM partitesalvate  WHERE StringaPartita IS NULL ORDER BY Punteggio DESC LIMIT 20";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        $response = [
            'length' => 0,
            'messaggio' => 'Non ci sono partite in classifica'
        ];
    } 
    else {
        $response = [
            'length' => $stmt->rowCount(),
            'messaggio' => 'Classifica caricata con successo',
            'classifica' => $stmt->fetchAll(PDO::FETCH_ASSOC)
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