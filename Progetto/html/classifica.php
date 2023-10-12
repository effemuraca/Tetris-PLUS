<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ferdinando Muraca">
    <title>Classifica</title>
    <link rel="icon" href="../images/tetris.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/main.css" type="text/css">
    <link rel="stylesheet" href="../css/tabella.css" type="text/css">
</head>

<body>
    <nav class="menu">
        <img src="../images/menu.png" id="hamburger" alt="menu">
        <ul>
            <li>
                <a href="index.html">
                    Home
                    <img src="../images/home.png" alt="documento">
                </a>
            </li>
            <li>
                <a href="login.php">
                    Gioca
                    <img src="../images/modalità.png" alt="joypad">
                </a>
            </li>
            <li class="active">
                <a href="classifica.php">
                    Classifica
                    <img src="../images/classifica.png" alt="medaglia">
                </a>
            </li>
            <li>
                <a href="documentazione.html">
                    Documentazione
                    <img src="../images/documentazione.png" alt="documento">
                </a>
            </li>
        </ul>
        <footer>
            Ferdinando Muraca, A.A. 2022/23
        </footer>
    </nav>
    <br>
    <main>
        <?php
            include "../php/classifica.php";
        ?>
    </main>
</body>

</html>