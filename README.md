# washop
Ionic 4 mobile app, per la pulizia a domicilio di indumenti. cross-platform (android ios)

L'applicazione si presenta come utile esperimento per testare le potenzialità di Ionic 

# come funziona

L'applicazione funzionalmente si utilizza come un semplicissimo catalogo di oggetti disponibili per il ritiro, si può scegliere
la quantità di tali oggetti e visualizzarne il prezzo per singolo elemento.

![alt text](https://github.com/lorenzocastorina/washop/blob/master/screenshots/home.png?raw=true)

Per poter effettuare operazioni di prenotazione o aggiunta al carrello è necessario la registrazione o il login da parte 
dell'utente (rendendo cosi possibile ad un utente novizio visualizzare l'app come guest)

![alt text](https://github.com/lorenzocastorina/washop/blob/master/screenshots/login.png?raw=true)

Nell'applicazione è presente anche uno switch per la dark mode in modo automatico, disponibile sia per andorid che ios, basandosi
sulle impostazioni del dispositivo stesso.

![alt text](https://github.com/lorenzocastorina/washop/blob/master/screenshots/white.png?raw=true)

![alt text](https://github.com/lorenzocastorina/washop/blob/master/screenshots/other.png?raw=true)

# come farla funzionare

Per far partire l'applicazione bisogna avere i seguenti requisiti: 

* Node.js, possibilmente la versione [consigliata](https://nodejs.org/it/)
* Visual Studio Code, o un qualsiasi text editor

Scaricare la repo ed aprire il terminale spostandosi all'interno della cartella principale del progetto

Una volta all'interno della cartella digitare i seguenti comandi: 
```
npm install
npm update  
ng serve
```

Una volta fatto il progetto partirà e sarà possibile visualizzarlo all'indirizzo [localhost:8080](http://localhost:8080/)


potrebbe essere possibile dover utilizzare tale comando in caso di errore:

`npm i @angular-devkit/build-angular@0.803.24`

o

`npm install --save-dev @angular-devkit/build-angular`
