var isActive = false;
var micButton = document.getElementById("checkbox");
var reconocimiento = new webkitSpeechRecognition();
var cajaResultado = document.getElementById("caja");

reconocimiento.lang = "es-ES";
reconocimiento.interimResults = true;

reconocimiento.onresult = function (event) {
  var texto = "";
  var resultados = event.results;
  console.log(resultados);
  for (var i = event.resultIndex; i < resultados.length; ++i) {
    texto += resultados[i][0].transcript;
  }
  cajaResultado.innerHTML = texto;
};
function grabar() {
  if (micButton.checked) {
    texto = "";
    cajaResultado.innerHTML = texto;
    reconocimiento.start();

    reconocimiento.onerror = function (event) {
      console.error("Error en el reconocimiento de voz:", event.error);
      if (event.error == "no-speech") {
        texto = "No puede escucharte correctamente.";
        cajaResultado.innerHTML = texto;
      }
    };
    reconocimiento.onend = function () {
      micButton.checked = false;
      console.log("Reconocimiento de voz finalizado");
    };
  } else {
    if (reconocimiento) {
      reconocimiento.stop();
      console.log("Reconocimiento de voz detenido");
    }
    true;
  }
}
