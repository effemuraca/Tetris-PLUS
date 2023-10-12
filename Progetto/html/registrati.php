<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ferdinando Muraca">
    <title>Registrati</title>
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
        <form action="#" method="post" autocomplete="on" id="richiedi_registrazione">
            <fieldset>
                <legend>
                    Registrati:
                </legend>
                <p class="username">
                    <label for="username">
                        Username:
                    </label>
                    <br>
                    <input type="text" id="username" name="username" required minlength="3" maxlength="20">
                </p>
                <p class="mail">
                    <label for="mail">
                        Mail:
                    </label>
                    <br>
                    <input type="email" id="mail" name="mail" required minlength="6" maxlength="30">
                </p>
                <p class="password">
                    <label for="pwd">
                        Password:
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
                <p class="domanda">
                    <label for="domanda">
                        Scegli una domanda di sicurezza:
                    </label>
                    <select id="domanda" name="domanda" required>
                        <option value="nonno materno">
                            Qual &egrave; il nome del tuo nonno materno?
                        </option>
                        <option value="auto">
                            Qual &egrave; il nome della tua prima auto?
                        </option>
                        <option value="scuola">
                            Qual &egrave; il nome delle tue scuole superiori?
                        </option>
                    </select>
                </p>
                <p class="risposta">
                    <label for="risposta">
                        Risposta:
                    </label>
                    <br>
                    <input type="text" id="risposta" name="risposta" required minlength="3" maxlength="30">
                </p>
                <p id="errore_registrazione">
                </p>
                <input type="submit" value="Conferma">
                <a href="login.php">
                    Hai gi&agrave; un account? Accedi
                </a>
            </fieldset>
        </form>
    </main>
    <script src="../js/login.js"></script>
</body>

</html>