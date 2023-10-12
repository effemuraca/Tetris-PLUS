<?php declare(strict_types=1);

$tipoSalvataggio = '';
$tipoSalvataggioErr = '';

$c_str = "mysql:host=localhost;dbname=Muraca_635455";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    if (isset($_SESSION['username']) == false) {
        header("Location:../html/login.php");
        throw new Exception("Utente non loggato");
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json_data = file_get_contents('php://input');
        if ($json_data === false)
            throw new Exception("Errore nella lettura della stringa JSON");
        else {
            $decodifica = json_decode($json_data, true);
            if ($decodifica === null)
                throw new Exception("Errore nella decodifica della stringa JSON");
            else
                $_SESSION['stringaJSON'] = $json_data;

        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (empty($GET['tipo_salvataggio'])) {
            $tipoSalvataggioErr = "La scelta del tipo di salvataggio è richiesto";
            throw new Exception("La scelta del tipo di salvataggio richiesto");
        } else
            $tipoSalvataggio = $_GET['tipo_salvataggio'];
    }
    $sql = "INSERT INTO PartiteSalvate(Username, StringaPartita, TipoSalvataggio, Data) VALUE (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $_SESSION['username']);
    $stmt->bindParam(2, $_SESSION['stringaJSON']);
    $stmt->bindParam(3, $tipoSalvataggio);
    $data = date("Y-m-d");
    $stmt->bindParam(4, $data);
    $stmt->execute();
    unset($_SESSION['stringaJSON']);
} catch (PDOException | Exception $e) {
    echo "Errore: " . $e->getMessage();
    die();
}
?>