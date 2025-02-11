document.getElementById("eingabe").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      zeigeEingabe();
  }
});

function zeigeEingabe() {
  let eingabe = document.getElementById("eingabe").value;
  if (eingabe.toLowerCase() === "hallo") {
      document.getElementById("ausgabe").innerText = "Du hast eingegeben: " + eingabe;
  } else {
      document.getElementById("ausgabe").innerText = "";
  }
}