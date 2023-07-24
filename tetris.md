# Specifiche e regolamento di Tetris PLUS

## Introduzione
Questo documento offre una guida completa per gli sviluppatori interessati a implementare una versione modificata del classico gioco Tetris utilizzando HTML, CSS, JavaScript, PHP e un database SQL. La documentazione copre tutti gli aspetti dello sviluppo, inclusa la logica di gioco, le funzionalità aggiuntive, la gestione del back-end e la comunicazione con il database. Seguendo questa guida, gli sviluppatori saranno in grado di creare un'esperienza di gioco coinvolgente e arricchita da nuove funzionalità.

## Regole del gioco
La versione modificata del Tetris manterrà le regole di base del gioco originale, ma includerà alcune variazioni e nuove funzionalità. Di seguito sono elencate le regole principali del gioco:
            
              Scopo del gioco
L'obiettivo del Tetris è di completare righe orizzontali sul campo di gioco, utilizzando blocchi di varie forme, chiamati "tetromini". Una riga viene completata quando non ci sono spazi vuoti tra i blocchi.
Comandi di gioco: Il giocatore può controllare il movimento e la rotazione dei tetromini utilizzando i seguenti comandi:
- Freccia sinistra: Muovere il tetromino verso sinistra.
- Freccia destra: Muovere il tetromino verso destra.
- Freccia giù: Far cadere il tetromino più velocemente.
- Freccia su: Ruotare il tetromino in senso orario.
- Barra spaziatrice: Far cadere immediatamente il tetromino fino alla fine del campo di gioco.

          Campo di gioco
Il campo di gioco è una griglia rettangolare, di solito 10 colonne per 20 righe, dove i tetromini cadono dall'alto. I tetromini possono muoversi solo lateralmente all'interno del campo di gioco e cadono verticalmente verso il basso.
Fine del gioco: Il gioco termina quando i tetromini raggiungono la parte superiore del campo di gioco e non possono più cadere.

          Punteggio
I punti vengono assegnati per ogni riga completata. Più righe vengono completate contemporaneamente, più punti si ottengono. Ad esempio, completando una riga si guadagnano 100 punti, completando due righe contemporaneamente si guadagnano 300 punti e così via.
All’aumentare del punteggio, inoltre, la difficoltà aumenta: la velocità di caduta dei tetromini aumenta e il numero di blocchi speciali negativi cresce.

## Nuove funzionalità
Nella versione modificata del Tetris, verranno introdotte nuove funzionalità per rendere il gioco ancora più interessante:
                  
              Blocchi speciali
Saranno introdotti nuovi tipi di blocchi speciali con abilità uniche. Gli sviluppatori dovranno implementare la logica di ogni blocco speciale, ad esempio:
- Block Destroyer: Un blocco in grado di distruggere tutti i blocchi nella sua stessa riga.
- Color Changer: Un blocco in grado di cambiare il colore di tutti i blocchi della stessa forma nel campo di gioco.
- Line Filler: Un blocco che completa automaticamente una riga nel campo di gioco.
- Time Stopper: Un blocco che all’impatto con altri tetromini o con il terreno interrompe per un tempo stabilito la naturale caduta dei tetromini, facendo in modo che questa sia legata solo al movimento del giocatore
- Time Accelerator: Un blocco che all’impatto con altri tetromini o con il terreno velocizza la normale caduta al terreno dei tetromini
- Mist Block: Un blocco che all’impatto con altri tetromini o con il terreno nasconde le ultime x file del tabellone, impedendo la visione della parte più bassa.
- Steel Block: Un tetromino speciale, identificato da un colore grigio metallo, che non può essere eliminato, neanche se si completa la fila in cui è presente

  
      	Nuove modalità:
- Modalità multiplayer: Verrà implementata una modalità multiplayer che consentirà ai giocatori di sfidarsi in tempo reale. Gli sviluppatori dovranno gestire la comunicazione tra i giocatori, sincronizzando lo stato del gioco tra i client e il server.
- Modalità a tempo: Sarà aggiunta una modalità a tempo, dove i giocatori dovranno completare il maggior numero di righe possibile entro un limite di tempo. Gli sviluppatori dovranno implementare il timer e gestire la terminazione del gioco quando il tempo scade.
- Classifica dei migliori giocatori: Sarà inclusa una classifica dei migliori giocatori per entrambe le modalità di gioco, singolo giocatore e multiplayer. Gli sviluppatori dovranno creare un sistema per salvare i punteggi nel database SQL e recuperarli per mostrare la classifica.

## Architettura del progetto
Il progetto sarà suddiviso in tre componenti principali:
- Front-end: La parte front-end sarà sviluppata utilizzando HTML, CSS e JavaScript. Questo componente gestirà l'interfaccia utente del gioco, la logica di gioco, la gestione degli input dell'utente e la comunicazione con il server attraverso richieste AJAX.
- Back-end: Il back-end sarà implementato utilizzando PHP. Sarà responsabile di gestire la registrazione e l'autenticazione degli utenti, salvare i punteggi nel database SQL e fornire le risposte alle richieste AJAX dal front-end.
- Database SQL: Utilizzeremo un database SQL (come MySQL) per memorizzare i dati dei giocatori, compresi i punteggi e le informazioni di login.



