const ul = document.querySelector("ul")

for (let i = 1; i <= 10; i++) {
  li = document.createElement("li")
  li.innerText=i
  ul.appendChild(li)
}
