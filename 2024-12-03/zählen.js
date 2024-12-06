function zählen() { 
  let str = ""; // Deklaration und Initialisierung von str

  for (let i = 1; i <= 10; i++) { // Schleifenbedingung bis einschließlich 10
    str = str + i; // Zahlen an die Zeichenkette anhängen
    console.log(i); // Ausgabe der aktuellen Zahl
  }

  console.log("Endgültige Zeichenkette: " + str); // Ausgabe der gesamten Zeichenkette
}


