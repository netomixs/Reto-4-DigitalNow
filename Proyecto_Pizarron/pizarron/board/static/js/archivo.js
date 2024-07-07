var nombreArchivo = document.getElementById("campo-nombre");
var idBoard = -1;
var fileName=""
function guardarLocal() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;

  if (nombreArchivo.value != "") {
    link.download = nombreArchivo.value;
  } else {
    link.download = "dibujo.png";
  }
  link.click();
}
/**
 * Genera un dibujo en blanco
 */
function nuevo() {
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
  console.log(colores);
  
  idBoard = -1;
  panel.clearRect(0, 0, canvas.width, canvas.height);
  cargarColores();
  fileName="";
}
/**
 * Permite cargar una imagendesde archivcos
 */
async function getImageToSave() {
  const dataURL = canvas.toDataURL("image/png");
  fetch(dataURL)
    .then((res) => res.blob())
    .then((blob) => {
      var nombre = "";
      if (nombreArchivo.value != "") {
        nombre = nombreArchivo.value;
      } else {
        nombre = "dibujo.png";
      }
      if(fileName==""){
        fileName=getCurrentDate()+".png"
      }
      const file = new File([blob],fileName, {
        type: "image/png",
      });
      if (idBoard > 0) {
        console.log("Actualizar");
        
        actualizarBoard(file, nombre);
      } else {
        guardarBoard(file, nombre);
        console.log("Guardar");
      }
    });
}
/**
 * Guarda el dibujo actual. Si no existe manda solicitud de crear y si hay señales de existencia manda lasolicitud de actualizacion
 * @param {*} file
 * @param {*} nombre
 */
function guardarBoard(file, nombre) {
  const user = readFromLocalStorage("user");

 
  const formData = new FormData();
  formData.append("title", nombre);
  formData.append("paint", file);
  formData.append("autor", user.id);
  formData.append("colors",  JSON.stringify(colores));
  console.log(file);

  POST("board", formData).then(function (response) {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        idBoard=data.id
        fileName=file.name
      });
    } else {
      response.json().then((data) => {
        console.error(data);
      });
    }
  });
}
/**
 * Permite actualizar el dibujo actual
 * @param {*} file
 * @param {*} nombre
 */
function actualizarBoard(file, nombre) {
  const user = readFromLocalStorage("user");
 
  const formData = new FormData();
  formData.append("title", nombre);
  formData.append("paint", file);
  formData.append("colors",  JSON.stringify(colores));
  console.log(formData);

  POST("board/paint/" + idBoard, formData).then(function (response) {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
      });
    } else {
      response.json().then((data) => {
        console.log(data);
      });
    }
  });
}

/**
 * Cargar una imagen desde archivcos locales
 */
function cargarLocal() {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          cargarImage(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}
/*
 * Es usado para poner una imagen en Canvas
 */
function cargarImage(img) {
  panel.clearRect(0, 0, canvas.width, canvas.height);
  panel.drawImage(img, 0, 0, img.width, img.height);
}
/**
 * Obtener una cadena con la fecha actual
 * @returns
 */
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}
/**
 * Carga la lista de dibujos guardados
 */
function obtenerDibujos() {
  const user = readFromLocalStorage("user");
  var lista = document.getElementById("lista-dibujos");
  lista.innerHTML="";
  GET("board/" + user.id).then(function (response) {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        data.forEach((element) => {
          var elemntoLista = createListItem(element);
          lista.appendChild(elemntoLista);
        });
      });
    } else {
      response.json().then((data) => {
        console.log(data);
      });
    }
  });
}
/**
 * Crea cada elemnrto en el que se muestra cada dibujo en la lista
 * @param   element
 * @returns
 */
function createListItem(element) {
  // Crear elementos y configurar clases de Bootstrap
  const li = document.createElement("li");
  li.classList.add("list-group-item");

  const divOuter = document.createElement("div");
  divOuter.classList.add(
    "d-flex",
    "justify-content-between",
    "align-content-center",
    "align-items-center"
  );

  const divInner = document.createElement("div");
  divInner.classList.add(
    "d-flex",
    "justify-content-evenly",
    "align-items-center"
  );

  const spanNombre = document.createElement("span");
  spanNombre.textContent = element.title;

  const btnEditar = document.createElement("button");
  btnEditar.type = "button";
  btnEditar.classList.add("btn", "btn-link");
  btnEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';
  btnEditar.addEventListener("click", () => {
    cargarDibujoDeServidor(element);
  });

  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.classList.add("btn", "btn-danger");
  btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
  btnEliminar.addEventListener("click", () => {
    eliminarDibujo(element.id, li)
  });

  // Construir la estructura del DOM
  divInner.appendChild(spanNombre);
  divInner.appendChild(btnEditar);
  divOuter.appendChild(divInner);
  divOuter.appendChild(btnEliminar);
  li.appendChild(divOuter);

  return li;
}
/**
 * Remplaza los datos del board con los datos guardadso en l base de datos
 * @param   element
 */
function cargarDibujoDeServidor(element) {
  console.log(colores);
  
  colores =  element.colors;
  console.log(colores);
 
  nombreArchivo.value = element.title;
  cargarColores();
  idBoard = element.id;
  cargarImagenDesdeURL(element.paint)
    .then((imagen) => {
      cargarImage(imagen);
    })
    .catch((error) => {});
}
/**
 * Permite cargar una imagen desde un URl
 * @param {*} url
 * @returns
 */
function cargarImagenDesdeURL(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = url;
  });
}
function eliminarDibujo(id, li) {
  DELETE("board/paint/delete", id).then(function (response) {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        li.remove();
        if(idBoard==id){
          nuevo();
        }
      });
    } else {
      response.json().then((data) => {
        console.log(data);
      });
    }
  });
}
