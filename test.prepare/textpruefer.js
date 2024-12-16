const readline = require('readline');

// Interface für Benutzereingaben
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Funktion, die überprüft, ob der Satz mit "da" oder "damit" beginnt
function checkSentence(sentence) {
  if (sentence.toLowerCase().startsWith("da") || sentence.toLowerCase().startsWith("damit")) {
    console.log("Der Satz beginnt mit 'da' oder 'damit'.");
    // Hier kannst du die gewünschte Aktion ausführen
  } else {
    console.log("Der Satz beginnt nicht mit 'da' oder 'damit'.");
  }
}

// Hauptfunktion, die die Eingabe vom Benutzer verarbeitet
function askQuestion() {
  rl.question("Gib einen Satz ein: ", (antwort) => {
    checkSentence(antwort); // Überprüft den Satz

    rl.question("Möchtest du einen weiteren Satz eingeben? (ja/nein): ", (wiederholen) => {
      if (wiederholen.toLowerCase() === "ja") {
        askQuestion(); // Wiederhole die Eingabeaufforderung
      } else {
        console.log("Das Programm wird beendet.");
        rl.close(); // Beende das readline-Interface
      }
    });
  });
}

askQuestion(); // Starte die Eingabeaufforderung


//8. String-Methoden: .startsWith() und .endsWith()
//Diese prüfen, ob ein String mit einem bestimmten Präfix oder Suffix beginnt/endet.
//
//javascript
//Copy code
//let text = "Willkommen in JavaScript!";
//
//console.log(text.startsWith("Will")); // true
//console.log(text.endsWith("Script!")); // true