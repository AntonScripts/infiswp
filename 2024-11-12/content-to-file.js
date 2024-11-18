const inputDir = 'nmap-datenfiles';
const outputFilePath = './output.csv'; 
const headers = ["Datum_mit_Uhrzeit_und_Zone", "MAC", "IP"];
function toCsvRow(data) {
    return data.map(item => `"${item}"`).join(",");
}
async function createCsv() {
    const rows = [headers.join(",")];
    try {
        for await (const file of Deno.readDir(inputDir)) {
            if (file.isFile) {
                const filePath = `${inputDir}/${file.name}`;
                const content = await Deno.readTextFile(filePath);
                const lines = content.split("\n").filter(line => line.trim() !== "");
                for (const line of lines) {
                    const [dateTime, mac, ip] = line.split(/\s+/);  
                    rows.push(toCsvRow([dateTime, mac, ip]));       
                }
            }
        }
        await Deno.writeTextFile(outputFilePath, rows.join("\n"));
        console.log("CSV-Datei erfolgreich erstellt:", outputFilePath);
    } catch (err) {
        console.error("Fehler beim Erstellen der CSV-Datei:", err);
    }
}
createCsv();