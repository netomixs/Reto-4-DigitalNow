class Tarifa {
  constructor(LimiteInferior, LimiteSuperior, cuota, excedente) {
    this.LimiteInferior = LimiteInferior;
    this.LimiteSuperior = LimiteSuperior;
    this.CuotaFija = cuota;
    this.Excedente = excedente;
  }
}

function TarifasAnual() {
  var tabla = [];
  tabla.push(new Tarifa(0.01, 8952.49, 0.0, 1.92));
  tabla.push(new Tarifa(8952.5, 75984.55, 171.88, 6.4));
  tabla.push(new Tarifa(75984.56, 133536.07, 4461.94, 10.88));
  tabla.push(new Tarifa(133536.08, 155229.8, 10723.55, 16.0));
  tabla.push(new Tarifa(155229.81, 185852.57, 14194.54, 17.92));
  tabla.push(new Tarifa(185852.58, 374837.88, 19682.13, 21.36));
  tabla.push(new Tarifa(374837.89, 590795.99, 60049.4, 23.52));
  tabla.push(new Tarifa(590796.0, 1127926.84, 110842.74, 30.0));
  tabla.push(new Tarifa(1127926.85, 1503902.46, 271981.99, 32.0));
  tabla.push(new Tarifa(1503902.47, 4511707.37, 392294.17, 34.0));
  tabla.push(new Tarifa(4511707.38, Infinity, 1414947.85, 35.0));
  return tabla;
}
function TarifasSemanal() {
  const tabla = [
    new Tarifa(0.01, 171.78, 0.0, 1.92),
    new Tarifa(171.79, 1458.03, 3.29, 6.4),
    new Tarifa(1458.04, 2562.35, 85.61, 10.88),
    new Tarifa(2562.36, 2978.64, 205.8, 16.0),
    new Tarifa(2978.65, 3566.22, 272.37, 17.92),
    new Tarifa(3566.23, 7192.64, 377.65, 21.36),
    new Tarifa(7192.65, 11336.57, 1152.27, 23.52),
    new Tarifa(11336.58, 21643.3, 2126.95, 30.0),
    new Tarifa(21643.31, 28857.78, 5218.92, 32.0),
    new Tarifa(28857.79, 86573.34, 7527.59, 34.0),
    new Tarifa(86573.35, Infinity, 27150.83, 35.0),
  ];
  return tabla;
}

function TarifaMensual() {
  const tablaMensual = [
    new Tarifa(0.01, 746.04, 0.0, 1.92),
    new Tarifa(746.05, 6332.05, 14.32, 6.4),
    new Tarifa(6332.06, 11128.01, 371.83, 10.88),
    new Tarifa(11128.02, 12935.82, 893.63, 16.0),
    new Tarifa(12935.83, 15487.71, 1182.88, 17.92),
    new Tarifa(15487.72, 31236.49, 1640.18, 21.36),
    new Tarifa(31236.5, 49233.0, 5004.12, 23.52),
    new Tarifa(49233.01, 93993.9, 9236.89, 30.0),
    new Tarifa(93993.91, 125325.2, 22665.17, 32.0),
    new Tarifa(125325.21, 375975.61, 32691.18, 34.0),
    new Tarifa(375975.62, Infinity, 117912.32, 35.0),  
  ];
  return tablaMensual;
}
