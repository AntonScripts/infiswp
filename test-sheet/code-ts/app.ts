// Importiert die Funktion "assert" aus einer Standardbibliothek. Diese wird hier jedoch nicht verwendet.
import { assert } from "@std/assert";

// Definiert den Pfad zum Verzeichnis, in dem die Nmap-Daten gespeichert sind.
const dataPath = './nmap-datenfiles';

// Diese Funktion wandelt den Dateinamen (z. B. "2023_12_01_12_30") in ein Date-Objekt um, das ein Datum und eine Uhrzeit repräsentiert.
function parseDate(dateStr) {
    // Teilt den Dateinamen bei jedem Unterstrich ("_") in einzelne Teile auf.
    const p = dateStr.split('_');
    // Setzt die Teile zusammen in ein Format, das JavaScript als Datum versteht.
    return new Date(`${p[0]}:${p[1]}:${p[2]}+${p[3]}:${p[4]}`);
}

// Hauptfunktion, die alle wichtigen Schritte ausführt.
async function main() {
    const csvFilePath = './output.csv'; // Der Pfad zur Ausgabedatei (CSV)

    try {
        // Öffnet oder erstellt die CSV-Datei zum Schreiben.
        const file = await Deno.create(csvFilePath);
        // Erstellt einen Encoder, um Text in die richtige Schreibweise für Dateien umzuwandeln.
        const encoder = new TextEncoder();
        
        // Schreibt die Kopfzeile der CSV-Datei ("date,host,mac") als erste Zeile.
        await file.write(encoder.encode("date,host,mac\n"));

        // Liest alle Dateien im angegebenen Verzeichnis (dataPath).
        for await (const dirEntry of Deno.readDir(dataPath)) {
            // Überspringt alles, was keine Datei ist (z. B. Ordner).
            if (!dirEntry.isFile) continue;

            let date; // Variable für das Datum.
            try {
                // Versucht, das Datum aus dem Dateinamen zu parsen.
                date = parseDate(dirEntry.name);
            } catch (err) {
                // Gibt eine Fehlermeldung aus, wenn das Datum nicht gelesen werden kann.
                console.error('Error parsing date:', dirEntry.name, err.message);
                continue; // Springt zur nächsten Datei.
            }

            // Erstellt den vollständigen Pfad zur Datei.
            const filePath = `${dataPath}/${dirEntry.name}`;
            // Liest den Inhalt der Datei als Text und teilt ihn in einzelne Zeilen.
            const lines = (await Deno.readTextFile(filePath)).split('\n');

            // Verarbeitet jede Zeile der Datei.
            for (const line of lines) {
                // Überspringt leere Zeilen oder unwichtige Zeilen (z. B. Statusmeldungen von Nmap).
                if (line.trim() === '' || line.startsWith('Starting Nmap') ||
                    line.startsWith('Nmap done') || line.startsWith('Host is up')) {
                    continue; // Springt zur nächsten Zeile.
                }
                // Extrahiert den Hostnamen aus Zeilen, die mit "Nmap scan report for " beginnen.
                if (line.startsWith('Nmap scan report for ')) {
                    var host = line.split(' ')[4].replace(/\r/g, ''); // Entfernt auch unsichtbare Zeichen.
                }
                // Extrahiert die MAC-Adresse aus Zeilen, die mit "MAC Address: " beginnen.
                if (line.startsWith('MAC Address: ')) {
                    const mac = line.split(' ')[2].toLowerCase(); // Konvertiert die MAC-Adresse in Kleinbuchstaben.
                    // Erstellt eine CSV-Zeile mit Datum, Host und MAC-Adresse.
                    const row = `${date.toISOString()},${host},${mac}\n`;

                    // Schreibt die Zeile in die CSV-Datei.
                    await file.write(encoder.encode(row));
                }
            }
        }

        // Schließt die Datei, nachdem alles geschrieben wurde.
        file.close();
        console.log(`CSV file written to ${csvFilePath}`);
    } catch (err) {
        // Gibt eine Fehlermeldung aus, falls ein Fehler auftritt.
        console.error('Error processing files:', err);
    }
}

// Führt die Hauptfunktion aus. "await" bedeutet, dass der Code wartet, bis die Funktion fertig ist.
await main();
