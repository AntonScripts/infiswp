const state = {
    guthaben: 0,
    einnahmen: 0,
    ziel: null,
    anzahlPersonen: 1,
    fahrpreis: 0,
    ausgabe: "Bitte wählen Sie ein Ziel",
};

const zieleUndPreise = {
    Bregenz: 90,
    Eisenstadt: 13,
    Graz: 40,
    Innsbruck: 80,
    Klagenfurt: 60,
    Linz: 40,
    Salzburg: 60,
    "St. Pölten": 15,
};

const einwerfenInput = document.getElementById("einwerfenBetrag");
const einwerfenButton = document.getElementById("einwerfenButton");
const zielSelect = document.getElementById("ziel");
const anzahlPersonenInput = document.getElementById("anzahlPersonen");
const fahrpreisSpan = document.getElementById("fahrpreis");
const guthabenSpan = document.getElementById("guthaben");
const ticketAusgabeTextarea = document.getElementById("ticketAusgabe");
const einnahmenSpan = document.getElementById("einnahmen");
const ticketKaufenButton = document.getElementById("ticketKaufen");
const resetBtn = document.getElementById("reset");

// Aktualisierung des Fahrpreises
function updateFahrpreis() {
    if (state.ziel) {
        state.fahrpreis = zieleUndPreise[state.ziel] * state.anzahlPersonen;
    } else {
        state.fahrpreis = 0;
    }
}

// UI aktualisieren
function render() {
    ticketAusgabeTextarea.textContent = state.ausgabe;
    guthabenSpan.textContent = `${state.guthaben} €`;
    fahrpreisSpan.textContent = `${state.fahrpreis} €`;
    einnahmenSpan.textContent = `${state.einnahmen} €`;
}

// Geld einwerfen
function onEinwurf() {
    const geld = einwerfenInput.valueAsNumber;

    if (isNaN(geld) || geld <= 0) {
        state.ausgabe = "Bitte einen gültigen Betrag eingeben!";
    } else {
        state.guthaben += geld;
        state.ausgabe = "Geld eingeworfen!";
    }

    einwerfenInput.value = "";
    render();
}

// Ziel auswählen
function onZielSelect() {
    state.ziel = zielSelect.value;
    updateFahrpreis();
    state.ausgabe = `Ziel gesetzt: ${state.ziel}`;
    render();
}

// Anzahl der Personen ändern
function onAnzahlChange() {
    state.anzahlPersonen = anzahlPersonenInput.valueAsNumber;
    updateFahrpreis();
    render();
}

// Ticket kaufen
function onTicketKaufen() {
    if (!state.ziel) {
        state.ausgabe = "Bitte wählen Sie ein Ziel!";
    } else if (state.guthaben < state.fahrpreis) {
        state.ausgabe = "Nicht genug Guthaben!";
    } else {
        const restgeld = state.guthaben - state.fahrpreis;
        state.einnahmen += state.fahrpreis;
        state.guthaben = 0;

        state.ausgabe = `=== Fahrkarte nach ${state.ziel} ===\n` +
                        `Einzelpreis: ${zieleUndPreise[state.ziel]} €\n` +
                        `Anzahl der Fahrgäste: ${state.anzahlPersonen}\n` +
                        `Summe: ${state.fahrpreis} €\n` +
                        `Gegeben: ${state.fahrpreis + restgeld} €\n` +
                        `Restgeld: ${restgeld} €\n` +
                        `============================`;
    }

    render();
}

// Neuer Kunde (Reset)
function onReset() {
    state.guthaben = 0;
    state.anzahlPersonen = 1;
    state.ziel = null;
    state.fahrpreis = 0;
    state.ausgabe = "Bitte wählen Sie ein Ziel";
    anzahlPersonenInput.value = 1;
    render();
}

// Event-Listener
einwerfenButton.addEventListener("click", onEinwurf);
zielSelect.addEventListener("change", onZielSelect);
anzahlPersonenInput.addEventListener("change", onAnzahlChange);
ticketKaufenButton.addEventListener("click", onTicketKaufen);
resetBtn.addEventListener("click", onReset);

// Ziele in Dropdown einfügen
zielSelect.innerHTML = Object.keys(zieleUndPreise)
    .map((ziel) => `<option value="${ziel}">${ziel}</option>`)
    .join("\n");

render();
