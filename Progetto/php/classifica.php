<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {s


} catch (PDOException $e) {
    echo "Errore: " . $e->getMessage();
    die();
}




?>  