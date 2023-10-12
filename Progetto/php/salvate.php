<?php declare(strict_types=1);

session_start();
$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $sql = "SELECT idSalvate, Username, Data, TipoSalvataggio, Punteggio FROM PartiteSalvate ORDER BY Punteggio DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        echo "<p>Non ci sono partite salvate</p>";
    } else {
        echo '<table">';
        echo "<thead><tr><td>Username</td><td>Data Partita</td><td>Tipo Salvataggio</td><td>Punteggio</td><td>Gioca Partita</td></tr></thead>";
        echo '<tbody>';
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if ($row["TipoSalvataggio"] == "pubblica") {
                echo "<tr><td id='" . $index . "'>" . $row["idSalvate"] . "</td><td>" . $row["Username"] . "</td><td>" . $row["Data"] . "</td><td>" . $row["TipoSalvataggio"] . "</td><td>" . $row["Punteggio"] . "<td class='bottone'><button class='bot_partita' value='" . $index . "'>Gioca</button></td></tr>";
            } else if ($row["Username"] == $_SESSION["username"]) {
                echo "<tr><td id='" . $index . "'>" . $row["idSalvate"] . "</td><td>" . $row["Username"] . "</td><td>" . $row["Data"] . "</td><td>" . $row["TipoSalvataggio"] . "</td><td>" . $row["Punteggio"] . "<td class='bottone'><button class='bot_partita' value='" . $index . "'>Gioca</button></td></tr>";
                $index++;
            }
        }
        echo "</tbody>";
        echo "</table>";
    }
    $pdo = null;
} catch (PDOException | Exception $e) {
    echo $e->getMessage();
    die();
}


?>