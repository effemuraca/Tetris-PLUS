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
        <form action="#" method="post" autocomplete="on" richiedi_recupero>
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
                <p id="domanda_personale">
                </p>
                <p class="risposta_account">
                    <label for="risposta_account">
                        Risposta:
                    </label>
                    <br>
                    <input type="text" id="risposta_account" name="risposta_account" required minlength="3"
                        maxlength="30">
                </p>
                <p id="errore_recupero">
                </p>
                <input type="submit" value="Conferma">
            </fieldset>
        </form>
    </main>
</body>

</html>