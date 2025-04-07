document.getElementById("clicker").addEventListener("click", function() {
  if (document.getElementById("clicker").style.backgroundColor == "red") {
    document.getElementById("clicker").style.backgroundColor = "";
  }
  else {
    document.getElementById("clicker").style.backgroundColor = "red";
  }
  });