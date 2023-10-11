<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ferdinando Muraca">
    <title>Partite Salvate</title>
    <link rel="icon" href="../images/tetris.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/tetris.css" type="text/css">
    <link rel="stylesheet" href="../css/tabella.css" type="text/css">
</head>

<body>
    <nav>
        <a href="modalità.html">
            <button>
                <img src="../images/modalità.png">
            </button>
        </a>
    </nav>
    <main>
        <?php
            include "../php/salvate.php";
        ?>
    </main>
    <script src="../js/gioca_partita_salvata.js"></script>
</body>

</html>