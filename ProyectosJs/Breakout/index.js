var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var lienzoW = canvas.width;
var lienzoH = canvas.height;
var velocidadBarra = 10;
var velocidadX = 0;
var velocidadY = 1;
var plotaW = 5;
var isPausa = false;
window.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var vidasTxt = document.getElementById("vidas");
var puntosTxt = document.getElementById("puntos");
var vidas = 5;
var puntos=0;
let rightPressed = false;
let leftPressed = false;
var barra = new Figura(lienzoW / 2, lienzoH, lienzoW / 10, 2);
var pelota = new Figura(barra.x + barra.w / 2, barra.y - 10, plotaW, plotaW);
var muro = [];
crearMuro();
dibujarTodo();
function keyDownHandler(e) {
  if (e.code == "ArrowRight") {
    barra.x = barra.x + velocidadBarra;
    if (barra.x > canvas.width - barra.w / 3) {
      barra.x = 0;
    }
    dibujarTodo();
  }
  if (e.code == "ArrowLeft") {
    barra.x = barra.x - velocidadBarra;

    if (barra.x < barra.w / 3) {
      barra.x = canvas.width;
    }
    dibujarTodo();
  }
  if (e.code == "Space") {
    isPausa = !isPausa;
  }
  if (isPausa) {
    if (e.code == "ArrowLeft") {
      pelota.x = pelota.x - 1;
    }
    if (e.code == "ArrowRight") {
      pelota.x = pelota.x + 1;
    }
    if (e.code == "ArrowUp") {
      pelota.y = pelota.y - 1;
    }
    if (e.code == "ArrowDown") {
      pelota.y = pelota.y + 1;
    }
  }
}
function dibujarEscena() {
  vidasTxt.innerText = vidas;
  puntosTxt.innerText = puntos;
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.rect(1, 0, canvas.width - 2, canvas.height + 1);
  ctx.stroke();
  ctx.closePath();
}
function dibujarBarra() {
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(barra.x, 150 - barra.h, barra.w, barra.h);
  ctx.fill();
  ctx.closePath();
}
function dibujarTodo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarMuro();
  dibujarEscena();
  dibujarPelota();
  dibujarBarra();
}
function dibujarPelota() {
  ctx.beginPath();
  ctx.arc(pelota.x, pelota.y, pelota.w, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "blue";
  ctx.stroke();
  ctx.closePath();
}
intervalo = setInterval(() => {
  //mostrarDebug();

  if (isPausa == false && vidas > 0) {
    pelota.y = pelota.y - velocidadY;
    pelota.x = pelota.x - velocidadX;
  }

  if (pelota.y <= pelota.w + 1) {
    velocidadY = -velocidadY;
  }
  if (pelota.y > lienzoH + 10) {
    posicionarPelota();
    vidas--;
  }
  //Laterales IZQ
  if (pelota.x <= pelota.w + 1) {
    velocidadX = -velocidadX;
  }
  //Drcha
  if (pelota.x >= lienzoW) {
    velocidadX = Math.abs(velocidadX);
  }
  //Barra
  if (pelota.y == barra.y - (pelota.w + barra.h)) {
    //Golpea el centro
    if (pelota.x == barra.x + barra.w / 2) {
      velocidadY = velocidadY * -1;
      velocidadX = velocidadX * -1;
    }
    //Golpea lado IZQ
    if (pelota.x > barra.x - pelota.w && pelota.x < barra.x + barra.w / 2) {
      velocidadY = velocidadY * -1;
      velocidadX = velocidadX * -1;
      if (velocidadX == 0) {
        velocidadX = 0.2;
      } else if (velocidadX > 0) {
        velocidadX = velocidadX + 0.2;
        velocidadY = velocidadY - 0.2;
      } else if (velocidadX < 0) {
        velocidadX = velocidadX - 0.2;
      }
    }
    //Golpea lado DCha
    if (
      pelota.x > barra.x + barra.w / 2 &&
      pelota.x < barra.x + barra.w + pelota.w
    ) {
      velocidadY = Math.abs(velocidadY);
      velocidadY = velocidadY - 0.2;
      velocidadX = -velocidadX - 0.2;
    }
    //Colisiones con bloques
  }
  for (let index = 0; index < muro.length; index++) {
    elemento = muro[index];
    //Colision de bloques por arriba
    if (
      elemento.color != "red" &&
      pelota.x >= elemento.x &&
      pelota.x <= elemento.x + elemento.w &&
      pelota.y <= elemento.y &&
      pelota.y >= elemento.y - pelota.w
    ) {
      muro[index].color = "red";
      velocidadX = velocidadX * -1;
      velocidadY = velocidadY * -1;
      puntos++;
    }
    //Colision de bloque por abajo
    if (
      pelota.y <= elemento.y + elemento.h + pelota.w &&
      pelota.y >= elemento.y + elemento.h &&
      pelota.x >= elemento.x &&
      pelota.x <= elemento.x + elemento.w &&
      elemento.color != "red"
    ) {
      muro[index].color = "red";
      puntos++;
      velocidadY = -velocidadY;
      if (pelota.x > elemento.x + elemento.w / 2) {
        velocidadX = velocidadX * -1;
      }
    }
    //Colision de bloque por derecha
    if (
      pelota.y >= elemento.y &&
      pelota.y <= elemento.y + elemento.h &&
      pelota.x >= elemento.x + elemento.w &&
      pelota.x <= elemento.x + elemento.w + pelota.w &&
      elemento.color != "red"
    ) {
      muro[index].color = "red";
      puntos++;
      velocidadX = velocidadX * -1;
      if (pelota.y >= elemento.y + elemento.h / 2) {
        velocidadY = velocidadY * -1;
      }
    }
    //colicion de bloque por  izquierda
    if (
      pelota.y >= elemento.y &&
      pelota.y <= elemento.y + elemento.h &&
      pelota.x <= elemento.x &&
      pelota.x >= elemento.x - pelota.w &&
      elemento.color != "red"
    ) {
      muro[index].color = "red";
      puntos++;
      velocidadX = velocidadX * -1;
      if (pelota.y >= elemento.y + elemento.h / 2) {
        velocidadY = velocidadY * -1;
      }
    }
  }
  if (vidas <= 0) {
    clearInterval(intervalo); // Detener el setInterval
    alert("Juego terminado");
  }
  dibujarTodo();

  // mostrarDebug();
}, 10);
function posicionarPelota() {
  barra = new Figura(lienzoW / 2, lienzoH, lienzoW / 10, 2);
  pelota = new Figura(barra.x + barra.w / 2, barra.y - 10, plotaW, plotaW);
  velocidadX = 0;
  velocidadY = 1;
}
function keyUpHandler(e) {
  if (e.code == "Space") {
    isPausable = false;
  }
}
function crearMuro() {
  var bloqueW = 20;
  var bloqueH = 10;
  var ancho = lienzoW / bloqueW;
  var alto = 6;
  ancho = Math.round(ancho - 1);

  for (let j = 0; j < alto; j++) {
    for (let i = 0; i < ancho; i++) {
      var bloque = new Figura(
        bloqueW * i + i + 3,
        j * bloqueH + j + 2,
        bloqueW,
        bloqueH
      );
      bloque.color = "green";
      muro.push(bloque);
    }
  }
}
function dibujarMuro() {
  muro.forEach((element) => {
    //  console.log(element);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.w, element.h);
    ctx.stroke();
    ctx.closePath();
  });
}
function mostrarDebug() {
  var pelotaText = document.getElementById("pelota");
  pelotaText.innerText = JSON.stringify(pelota);
  var MuroText = document.getElementById("bloques");
  MuroText.innerText = JSON.stringify(
    "XV=" + velocidadX + " - YV=" + velocidadY
  );
}
