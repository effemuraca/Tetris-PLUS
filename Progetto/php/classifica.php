<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $sql = "SELECT Username, Data, Punteggio FROM partitesalvate  WHERE StringaPartita IS NULL ORDER BY Punteggio DESC LIMIT 20";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $i = 1;
    if ($stmt->rowCount() == 0) {
        echo "<p class='db_vuoto'>Non ci sono partite in classifica</p>";
    } 
    else {
        echo '<table id="classifica">';
        echo "<thead><tr><td>Posizione</td><td>Username</td><td>Data Partita</td><td>Punteggio</td></tr></thead>";
        echo '<tbody id="body_classifica">';
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr><td>" . $i . "</td><td>" . $row["Username"] . "</td><td>" . $row["Data"] . "</td><td>" . $row["Punteggio"] . "</td></tr>";
            $i++;
        }
        echo "</table>";
    }
    echo "</tbody>";
} 
catch (PDOException | Exception $e) {
    echo $e->getMessage();
}

$pdo = null;
?>