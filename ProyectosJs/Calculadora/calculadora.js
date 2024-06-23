var neto = 0;
var ISR = 0;
var IMSS = 0;
var sueldo = 0;
var modalidad = "S";
 
function calcular() {
  var campoSueldo = document.getElementById("ingresosinput");
  var regimens = document.getElementsByName("flexRadioDefault");
  for (const opcion of regimens) {
    if (opcion.checked) {
      modalidad = opcion.value;
      break;
    }
  }
 
  if (campoSueldo.value.length > 0) {
    campoSueldo.classList.remove("is-invalid");
    campoSueldo.classList.add("is-valid");
    sueldo = campoSueldo.value;
  
    console.log(  calcularISR(sueldo, modalidad));
    ISR=calcularISR(sueldo, modalidad);
    neto=sueldo-ISR;
    ocultarDetalles();
  } else {
    campoSueldo.classList.remove("is-valid");
    campoSueldo.classList.add("is-invalid");
  }
}
function calcularISR(sueldo, modalidad) {
    var tabla=[];
  if (modalidad == "S") {
    tabla=TarifasSemanal();
  }
  if (modalidad == "M") {
    tabla=TarifaMensual();
  }
  if (modalidad == "A") {
    tabla=TarifasAnual();
  }
  for (let index = 0; index < tabla.length; index++) {
   var celda= tabla[index];
 
    if(tabla[index].LimiteSuperior>= sueldo ){
        var base=sueldo- celda.LimiteInferior;
      
        console.log(base);
        var resultado=base/100*celda.Excedente;
        console.log(base/100);
        resultado=resultado+celda.CuotaFija;
        return resultado;
 
    }
  }
  return 0;
}
ocultarDetalles();
function ocultarDetalles() {
  var card = document.getElementById("Detalles");
  if (sueldo > 0) {
    card.hidden = false;
  } else {
    card.hidden = true;
  }
  mostrarDatos();
}
function mostrarDatos() {
  var txtISR = document.getElementById("txt-ISR");
  //var txtIMSS = document.getElementById("txt-imss");
  var txtNeto = document.getElementById("txt-neto");
  var txtBruto = document.getElementById("txt-sueldo");
  txtISR.innerHTML ="$ "+ ISR.toFixed(2);
  //txtIMSS.innerHTML = IMSS;
  txtNeto.innerHTML = "$ "+ neto.toFixed(2);
  txtBruto.innerText = "$ "+ sueldo;
}


