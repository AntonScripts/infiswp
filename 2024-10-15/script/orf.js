function toggleText(index) {
  const text = document.getElementById('hidden-text-' + index);
  if (text.style.display === "none" || text.style.display === "") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}