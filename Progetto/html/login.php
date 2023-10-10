<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ferdinando Muraca">
    <title>Login</title>
    <link rel="icon" href="../images/tetris.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/tetris.css" type="text/css">
    <link rel="stylesheet" href="../css/login.css" type="text/css">
    <script src="../js/login.js"></script>
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
        <form action="../php/login.php" method="post" autocomplete="on">
            <fieldset>
                <legend>
                    Login:
                </legend>
                <p class="username">
                    <label for="username">
                        Username:
                    </label>
                    <br>
                    <input type="text" id="username" name="username" required minlength="3" maxlength="20">
                </p>
                <p class="password">
                    <label for="pwd">
                        Password:
                    </label>
                    <br>
                    <input type="password" id="pwd" name="pwd" required minlength="8" maxlength="20">
                </p>
                <p id="errore">
                    Username o password errati,
                    <a href="recupera.html">
                        reimposta password
                    </a>
                </p>
                <p>
                    <?php
                        if ($userErr) {
                            echo $userErr;
                        }
                        if ($pwdErr) {
                            echo $pwdErr;
                        }
                        if ($loginErr) {
                            echo $loginErr;
                        }  
                    ?>
                </p>
                <input type="submit" value="Conferma">
                <a href="registrati.html">
                    Non hai un account? Registrati
                </a>
            </fieldset>
        </form>
    </main>
</body>

</html>