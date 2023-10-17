<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ferdinando Muraca">
    <title>Singleplayer</title>
    <link rel="icon" href="../images/tetris.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/tetris.css" type="text/css">
    <link rel="stylesheet" href="../css/login.css" type="text/css">
    <link rel="stylesheet" href="../css/singleplayer.css" type="text/css">
</head>

<body>
    <nav>
        <a href="modalità.html">
            <button>
                <img src="../images/modalità.png">
            </button>
        </a>
        <button id="salvataggio">
            <img src="../images/salva.png">
        </button>
        <button id="regolamento">
            <img src="../images/info.png" alt="info">
        </button>
    </nav>
    <div id="core">
        <aside>
            <div id="prossimo_tetronimo">
                <p>
                    Prossimo tetromino:
                </p>
                <table id="prossimo_tetromino_tabellone">
                </table>
                <p id="prossimo_tetromino_nome">
                </p>
            </div>
            <div id="nome_giocatore">
                <img src="../images/account.png" id="icona_giocatore">
            </div>
        </aside>
        <main id="container_tabellone">
        </main>
        <div id="comandi">
            <button id="muovi_sx">
                <img src="../images/left-arrow.png">
            </button>
            <button id="muovi_dx">
                <img src="../images/right-arrow.png">
            </button>
            <button id="muovi_giu">
                <img src="../images/arrow-down.png">
            </button>
            <button id="ruota_sx">
                <img src="../images/rotate-left.png">
            </button>
            <button id="ruota_dx">
                <img src="../images/rotate-right.png">
            </button>
            <button id="pausa">
                <img src="../images/pause.png" id="immagine_pausa">
                <img src="../images/play.png" id="immagine_riprendi">
            </button>
        </div>
        <aside>
            <div id="punteggio">
                <p>
                    Punteggio:
                </p>
            </div>
        </aside>
    </div>
    <div id="container">
    <form action="../php/salva.php" method="get" autocomplete="on" id="salvataggio_popup">
            <fieldset id="form_salvataggio">
                <legend>
                    Salva la partita
                    <button id="chiudi_salvataggio" class="bottone_x">
                        X
                    </button>
                </legend>
                <p class="tipo_salvataggio">
                    <label for="tipo_salvataggio">
                        Che tipo di salvataggio vuoi per la partita?
                        <strong>
                            Le partite pubbliche possono essere giocate da tutti, mentre quelle private solo da te.
                        </strong>
                    </label>
                    <br>
                    <select id="tipo_salvataggio" required>
                        <option value="privato">
                            Salvataggio privato
                        </option>
                        <option value="pubblico">
                            Salvataggio pubblico
                        </option>
                    </select>
                </p>
                <br>
                <p>
                    <?php
                        if ( isset($tipoSalvataggio) && $tipoSalvataggioErr) {
                            echo $tipoSalvataggioErr;
                        }
                    ?>
                </p>
                <input type="submit" value="Conferma" id="bottone_salvataggio">
            </fieldset>
        </form>
        <div id="regolamento_popup">
            <h1>
                Regolamento del gioco
            </h1>
            <button id="chiudi_regolamento" class="bottone_x">
                X
            </button>
            <h2>
                Scopo del gioco
            </h2>
            <p>
                Lo scopo del gioco è totalizzare il punteggio maggiore possibile, cio è possibile completando righe di
                tetronimi, ovvero dei "pezzi" che cadono nel tabellone e sono muovibili a destra, sinistra e in basso
                dal giocatore utilizzando i tasti
                <strong>
                    D, A, S
                </strong>.
                <br>
                Inoltre, è possibile ruotare i tetronimi in senso orario o antiorario, rispettivamente con i tasti
                <strong>
                    E, Q
                </strong>.
                Durante la partita, è sempre possibile mettere in pausa il gioco, utilizzando la
                <strong>
                    barra spaziatrice
                </strong>.
                I tasti sono sostituiti da pulsanti nella versione mobile del gioco.
            </p>
            <h2>
                Novità
            </h2>
            <p>
                Tetris Plus aggiunge ai classici tetronimi anche dei blocchi speciali, ognuno con diverse funzioni e
                indicati da un blocco quadrato di dimensione 2x2 con sopra un'icona che li distingue.
                Qui di seguito vengono listati tutti i blocchi speciali e le loro funzioni:
            </p>
            <ul>
                <li>
                    <strong>
                        Block Destroyer
                    </strong>
                    <img src="../images/block_destroyer.png">
                    : Un blocco in grado di distruggere tutti i blocchi nella sua stessa riga.
                </li>
                <li>
                    <strong>
                        Dinamite
                    </strong>
                    <img src="../images/dinamite.png">
                    : Un blocco che elimina tutti i blocchi presenti fino a due blocchi di raggio dall'esplosione
                </li>
                <li>
                    <strong>
                        Time Resetter
                    </strong>
                    <img src="../images/time_resetter.png">
                    : Un blocco che all'impatto con altri tetromini o con il terreno interrompe per un tempo stabilito
                    la
                    naturale caduta dei tetromini, facendo in modo che questa sia legata solo al movimento del giocatore
                </li>
                <li>
                    <strong>
                        Time Accelerator
                    </strong>
                    <img src="../images/time_accelerator.png">
                    : Un blocco che all'impatto con altri tetromini o con il terreno velocizza la normale caduta al
                    terreno
                    dei tetromini
                </li>
                <li>
                    <strong>
                        Mist Block
                    </strong>
                    <img src="../images/mist_block.png">
                    : Un blocco che all'impatto con altri tetromini o con il terreno nasconde le ultime x file del
                    tabellone,
                    impedendo la visione della parte più bassa.
                </li>
            </ul>
        </div>
        <div id="game_over">
            <h1>
                Partita terminata
            </h1>
            <p id="info_go">
            </p>
            <div id="bottoni_fine_partita">
                <a href="modalità.html">
                    <button id="torna_modalità">
                        <img src="../images/modalità.png">
                    </button>
                </a>
                <a>
                    <button id="riprova">
                        <img src="../images/retry.png">
                    </button>
                </a>
            </div>
        </div>
    </div>
    <script src="../js/costanti.js"></script>
    <script src="../js/partita.js"></script>
    <script src="../js/tabellone.js"></script>
    <script src="../js/tetromino.js"></script>
    <script src="../js/funzioni_gioco.js"></script>
    <script src="../js/handler_gioco.js"></script>
</body>

</html>