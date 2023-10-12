<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ferdinando Muraca">
    <title>Recupera</title>
    <link rel="icon" href="../images/tetris.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/tetris.css" type="text/css">
    <link rel="stylesheet" href="../css/login.css" type="text/css">
</head>

<body>
    <nav>
        <a href="index.html">
            <button>
                <img src="../images/home.png">
            </button>
        </a>

    </nav>
    <main>
        <form action="../php/recupera.php" method="post" autocomplete="on">
            <fieldset>
                <legend>
                    Recupera account:
                </legend>
                <p class="username">
                    <label for="username">
                        Username:
                    </label>
                    <br>
                    <input type="text" id="username" name="username" required minlength="3" maxlength="20">
                </p>
                <p class="nuova_password">
                    <label for="pwd">
                        Nuova Password:
                    </label>
                    <br>
                    <input type="password" id="pwd" name="pwd" required minlength="8" maxlength="20">
                </p>
                <p class="password">
                    <label for="pwd2">
                        Inaerisci nuovamente la password:
                    </label>
                    <br>
                    <input type="password" id="pwd2" name="pwd2" required minlength="8" maxlength="20">
                </p>
                <p>
                    <?php
                    echo $domanda;
                    ?>
                </p>
                <p class="risposta_account">
                    <label for="risposta_account">
                        Risposta:
                    </label>
                    <br>
                    <input type="text" id="risposta_account" name="risposta_account" required minlength="3"
                        maxlength="30">
                </p>
                <p>
                    <?php
                    if (isset($_POST['username']) && $userErr) {
                        echo $userErr;
                    }
                    if (isset($_POST['pwd']) && $pwdErr) {
                        echo $pwdErr;
                    }
                    if (isset($_POST['pwd2']) && $pwd2Err) {
                        echo $pwd2Err;
                    }
                    if (isset($_POST['domanda']) && $domandaErr) {
                        echo $domandaErr;
                    }
                    if (isset($_POST['username']) && isset($_POST['pwd']) && isset($_POST['domanda']) && $loginErr) {
                        echo $loginErr;
                    }
                    if (isset($_POST['pwd']) && isset($_POST['pwd2']) && $passErr) {
                        echo $passErr;
                    }
                    ?>
                </p>
                <input type="submit" value="Conferma">
            </fieldset>
        </form>
    </main>
</body>

</html>