<?php declare(strict_types=1);
include_once("classi.php");

$c_str = "mysql:host=localhost;dbname=muraca";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);




?>  