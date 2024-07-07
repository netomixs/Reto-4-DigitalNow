
var info = new Info();
info.colorSeleccionado = "#FF0000";
info.brocha = "";
info.size = 1;
info.isDibujar = false;
info.isEspecial = false;
mouseControl()
colores = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#FFA500",
  "#FFA500",
  "#FFC0CB",
  "#00FF7F",
  "#000000",
];
//Metodo que genera el panel de colores en base a los colores por defecto y los colores usados por el usuario
cargarColores();
seleccionarSizePincel();
function cargarColores() {
  var coloresPanel = document.getElementById("color-container");
  coloresPanel.innerHTML = "";
  colores.forEach((element) => {
    var input = generarColor(element);
    coloresPanel.appendChild(input);
  });
  var selectorColor = document.createElement("input");
  selectorColor.classList.add("color-input");
  selectorColor.type = "color";
  selectorColor.addEventListener("change", function (event) {
    var selectedColor = event.target.value;
    var index = buscar(colores, selectedColor);
    info.colorSeleccionado = selectedColor;
    if (index == -1) {
      colores.push(selectedColor);
    }
    cargarColores();
  });
  //Se agrega el selector de colores como ultimo elemento de la cuadricula
  var label = document.createElement("label");
  label.classList.add("radio-label");
  label.appendChild(selectorColor);
  coloresPanel.appendChild(label);
}
//Genera el radio input para mostrar el  color de las list
function generarColor(color) {
  var input = document.createElement("input");
  input.classList.add("radio-input");
  input.type = "radio";
  input.name = "color";
  input.value = color;
  if (color == info.colorSeleccionado) {
    input.checked = true;
  }
  input.onclick = function () {
    info.colorSeleccionado = input.value;
  };
  var div = document.createElement("div");
  div.classList.add("color");
  div.style.backgroundColor = color;
  var label = document.createElement("label");
  label.classList.add("radio-label");
  label.appendChild(input);
  label.appendChild(div);
  return label;
}
//Metodo de busqueda lineal para saber si el color ya esta disponible
function buscar(lista, elemento) {
  for (var i = 0; i < lista.length; i++) {
    if (lista[i] == elemento) {
      return i;
    }
  }
  return -1;
}
function seleccionarSizePincel() {
  var selector = document.getElementById("selector-pincel-size");
  info.size = selector.value;
  var label = document.getElementById("size-label-pincel");
  label.textContent = info.size;
  selector.oninput = function () {
 
    info.size = selector.value;
    label.textContent = info.size;
  };
}

function mouseControl() {
    var infoLabel=document.getElementById("info");
    infoLabel.innerHTML=info.toHTML( info);
 
}
