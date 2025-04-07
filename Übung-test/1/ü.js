/*function übung() {
  document.body.style.backgroundColor = '#' + Math.random().toString(16).slice(2, 8);
  console.log(Math.random());
}
*/
function übung2() {
  const bcolor = ["red", "green", "blue"]
  const randomcolor = Math.floor(Math.random() * 3)
  document.querySelector("button").style.backgroundColor = bcolor[randomcolor];
}

function auslesen() {
  const eingabe = document.querySelector("input").value;
  if (eingabe == "") {
    alert("Bitte geben Sie etwas ein!");
  }
  else if (eingabe == "Hallo") {
    alert("Hallo zurück!");
  }
}