<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ferdinando Muraca">
    <title>Recupera</title>
    <link rel="icon" href="../images/tetris.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Eczar&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap"
        rel="stylesheet">
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
                <p class="mail">
                    <label for="mail">
                        Mail:
                    </label>
                    <br>
                    <input type="email" id="mail" name="mail" required minlength="6" maxlength="30">
                </p>
                <p class="nuova_password">
                    <label for="pwd">
                        Nuova Password:
                    </label>
                    <br>
                    <input type="password" id="pwd" name="pwd" required minlength="8" maxlength="20">
                </p>
                <p class="risposta_account">
                    <label for="risposta_account">
                        Inserisci la risposta alla domanda di sicurezza: <!-- da mettere quella giusta con js-->
                    </label>
                    <br>
                    <input type="text" id="risposta_account" name="risposta_account" required minlength="3" maxlength="30">
                </p>
                <p>
                    <?php
                        if ($userErr) {
                            echo $userErr;
                        }
                        if ($pwdErr) {
                            echo $pwdErr;
                        }
                        if ($domandaErr) {
                            echo $domandaErr;
                        }
                        if ($loginErr) {
                            echo $loginErr;
                        }
                    ?>
                </p>
                <input type="submit" value="Conferma">
            </fieldset>
        </form>
    </main>
</body>

</html>