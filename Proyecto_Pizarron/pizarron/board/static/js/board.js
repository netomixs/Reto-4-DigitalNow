const canvas = document.getElementById("canvas");
const panel = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function (e) {
  info.X = e.clientX - rect.x;
  info.Y = e.clientY - rect.y;
  if (info.isDibujar) {
    dibujar();
  }
});
canvas.addEventListener("mousedown", function (e) {

  info.isDibujar = true;
  info.brocha = obtenerValorRadio();

  mouseControl();
});
canvas.addEventListener("mouseup", function (e) {
 
  info.isDibujar = false;
  mouseControl();
});
setInterval(() => {
  if (info.isDibujar) {
    dibujar();
  }
}, 1);
function dibujar() {
  if (info.brocha == "aerosol") {
    aerosol();
  }
  if (info.brocha == "lapiz") {
    lapiz();
  }
  if (info.brocha == "borrador") {
    borrador();
  }
  if(info.brocha == "pincel"){
    pincel() 
  }
  if(info.brocha == "brochaCaligrafia"){
    brochaCaligrafia();
  }
  if(info.brocha == "lapizCaligrafia"){
    lapizCaligrafia();
  }
}
function lapizCaligrafia() {
    let size=info.size*10;
    panel.beginPath();
    panel.moveTo(info.X-size, info.Y-size);  
    panel.lineTo(info.X+size, info.Y+size);  
    panel.lineWidth = 4;  
    panel.strokeStyle = info.colorSeleccionado;  
    panel.stroke();  
}
function brochaCaligrafia() {
    let size=info.size*10;
    panel.beginPath();
    panel.moveTo(info.X+size, info.Y-size);  
    panel.lineTo(info.X-size, info.Y+size);  
    panel.lineWidth = 4;  
    panel.strokeStyle = info.colorSeleccionado;  
    panel.stroke();  
}
function pincel() {
    let size=info.size*10;
    panel.beginPath();
    panel.fillStyle = info.colorSeleccionado;
    panel.arc(info.X, info.Y, size/2, 0, 2 * Math.PI, false);
    panel.fill();
}
function lapiz() {
  let size = info.size * 10;
  pixel(info.X - size / 2, info.Y - size / 2, info.colorSeleccionado, size);
}
function borrador() {
  let size = info.size * 10;
  pixel(info.X- size / 2, info.Y- size / 2, "#FFFFFF", size);
}
function aerosol() {
  let size = info.size * 10;
  let cuadradoX = marcaRandom(info.X, info.X - size, info.X + size);
  let cuadradoY = marcaRandom(info.Y, info.Y - size, info.Y + size);
  console.log(cuadradoX);

  if (isPointInCircle(cuadradoX, cuadradoY, info.X, info.Y, size)) {
    pixel(cuadradoX, cuadradoY, info.colorSeleccionado, 2);
  }
}
function marcaRandom(centro, min, max) {
  const randomFloat = Math.random();
  const scaledValue = randomFloat * (max - min) + min;
  return scaledValue;
}
function pixel(x, y, color, size) {
  panel.fillStyle = color;
  panel.fillRect(x, y, size, size);
}

function isPointInCircle(x, y, centerX, centerY, radius) {
  let distSquared = (x - centerX) ** 2 + (y - centerY) ** 2;
  let radiusSquared = radius ** 2;
  return distSquared <= radiusSquared;
}
function obtenerValorRadio() {
  let radios = document.getElementsByName("pincel");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
}
