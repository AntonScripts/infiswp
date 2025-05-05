import { fragen } from "./fragen.js";

const frageText = document.getElementById("frage-text");
const optionenContainer = document.getElementById("optionen-container");
const weiterBtn = document.getElementById("weiter-btn");

let aktuelleFrageIndex = 0;
let antwortRichtig = false;

function ladeFrage() {
  const frage = fragen[aktuelleFrageIndex];
  frageText.textContent = frage.frage;
  optionenContainer.innerHTML = "";
  weiterBtn.disabled = true;
  antwortRichtig = false;

  frage.optionen.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");

    button.addEventListener("click", () => überprüfeAntwort(button, frage.antwort));
    optionenContainer.appendChild(button);
  });
}

function überprüfeAntwort(button, richtigeAntwort) {
  const alleOptionen = document.querySelectorAll(".option");

  if (button.textContent === richtigeAntwort) {
    button.classList.add("correct");
    antwortRichtig = true;
    weiterBtn.disabled = false;
    alleOptionen.forEach((btn) => (btn.disabled = true));
  } else {
    button.classList.add("incorrect");
    button.disabled = true;
  }
}

weiterBtn.addEventListener("click", () => {
  if (!antwortRichtig) return;
  aktuelleFrageIndex++;
  if (aktuelleFrageIndex < fragen.length) {
    ladeFrage();
  } else {
    frageText.textContent = "Du hast alle Fragen beantwortet!";
    optionenContainer.innerHTML = "";
    weiterBtn.style.display = "none";
  }
});

ladeFrage();
