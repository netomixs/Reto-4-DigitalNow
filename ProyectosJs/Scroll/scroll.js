var pantalla = document.getElementById("container");
var page = 0;
for (let index = 0; index < 10; index++) {
  pantalla.append(crearCard());
}
/**
 * Genera el eveto de scroll
 */
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log(this.window);
    for (let index = 0; index < 5; index++) {
      pantalla.append(crearCard());
    }
  }
});
/**
 * Genera el card que se ma a mostrar como item
 * @returns Card
 */
function crearCard() {
  page++;
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = `Targeta Numero: ${page}`;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent =
    " ";

  const colorBox = document.createElement("div");
  colorBox.className = "color-box";
  var color = getRandomColor();
  colorBox.style.backgroundColor = color;
  colorBox.innerText = color;

  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(cardText);
  cardBodyDiv.appendChild(colorBox);
  cardDiv.appendChild(cardBodyDiv);
  return cardDiv;
}
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
