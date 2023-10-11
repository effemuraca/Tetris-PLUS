<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $sql = "SELECT (Username, Data, Punteggio FROM PartiteSalvate WHERE StringaPartita IS NULL LIMIT 20 ORDER BY Punteggio DESC";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $result = $pdo->query($sql);
    $i = 1;
    if ($result->rowCount() == 0) {
        echo "<p>Non ci sono partite in classifica</p>";
    } else {
        echo '<table id="classifica">';
        echo "<thead><tr><td>Posizione</td><td>Username</td><td>Data Partita</td><td>Punteggio</td></tr></thead>";
        echo '<tbody id="body_classifica">';
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr><td>" . $i . "</td><td>" . $row["Username"] . "</td><td>" . $row["Data"] . "</td><td>" . $row["Punteggio"] . "</td></tr>";
            $i++;
        }
        echo "</table>";
    }
    echo "</tbody>";
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo $e->getMessage();
    die();
}


?>