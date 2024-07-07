class Info {
  constructor() {
    this.colorSeleccionado = "#FF0000";
    this.brocha = "";
    this.size = 1;
    this.isDibujar = false;
    this.isEspecial;
    this.X = 0;
    this.Y = 0;
  }
  toHTML(jsonData) {
    let html = "";

    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        const value = jsonData[key];
        html += `<div class="  ">${key}: <span class="info-valor">${value}</span></div>`;
      }
    }
    return html;
  }
}
