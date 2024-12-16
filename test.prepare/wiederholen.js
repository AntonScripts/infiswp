const readline = require('readline');

// Interface für Benutzereingaben
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Funktion, die die Zahl hoch ihrer eigenen Zahl berechnet
function hoch() {
  rl.question("Welche Zahl wählst du?  ", (zahl) => {
    console.log(`Deine Zahl hoch deiner Zahl lautet: ${zahl ** zahl}`);
    askAgain(); // Frage nach der Wiederholung
  });
}

// Funktion, um zu fragen, ob der Benutzer die Funktion wiederholen möchte
function askAgain() {
  rl.question("Möchtest du die Funktion erneut ausführen? (ja/nein): ", (antwort) => {
    if (antwort.toLowerCase() === "ja") {
      hoch(); // Wiederhole die Funktion hoch()
    } else {
      console.log("Das Programm wird beendet.");
      rl.close(); // Beende das readline-Interface
    }
  });
}

// Funktion, die die Hauptlogik des Programms steuert
async function run() {
  hoch(); // Die Funktion hoch() wird zuerst ausgeführt

  // Der Rest der Logik wird innerhalb von askAgain() behandelt, daher keine weitere Schleife erforderlich
}

run();
