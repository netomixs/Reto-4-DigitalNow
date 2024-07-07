const loginModal = new bootstrap.Modal(document.getElementById("login-modal"));
const GuadarModal = new bootstrap.Modal(
  document.getElementById("guardado-modal")
);
const abrirModal = new bootstrap.Modal(
  document.getElementById("archivo-modal")
);
function mostrarModal() {
  loginModal.show();
}
document.addEventListener("DOMContentLoaded", loginView);
function login() {
  const campos = document.querySelectorAll(".is-invalid");
  campos.forEach(function (e) {
    e.classList.remove("is-invalid");
  });
  var username = document.getElementById("usuario-input");
  var password = document.getElementById("password-input");
  var labe = document.getElementById("passwor-label");
  labe.innerText = "Completa este campo";
  if (username.value != "") {
    if (password.value != "") {
      var data = { username: username.value, password: password.value };

      var formData = new FormData();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      console.log(formData);
      POST("login", formData).then(function (response) {
        console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            saveToLocalStorage("user", data);
            loginView();
            loginModal.hide();
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            password.classList.add("is-invalid");
            var labe = document.getElementById("passwor-label");
            labe.innerText = data.message;
          });
        }
      });
    } else {
      password.classList.add("is-invalid");
    }
  } else {
    username.classList.add("is-invalid");
  }
}
//
function loginView() {
  var loginButton = document.getElementById("login-button");
  var folderButton = document.getElementById("folder-button");
  const user = readFromLocalStorage("user");
  if (user) {
    labelUser = document.getElementById("user-name");
    labelUser.innerText = user.username;
    loginButton.style.visibility = "hidden";
    folderButton.style.visibility = "visible";
  } else {
    loginButton.style.visibility = "visible";
    folderButton.style.visibility = "hidden";
  }
}
//Guardar en el localStorage
function saveToLocalStorage(key, value) {
  const objectJson = JSON.stringify(value);
  localStorage.setItem(key, objectJson);
}

// Función para leer datos de localStorage
function readFromLocalStorage(key) {
  let value = localStorage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch (e) {}
  return value;
}

// Función para borrar datos de localStorage
function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}
//Inicia el guardado del board o muestra el login si es necesario
function guardarOrLogin() {
  const user = readFromLocalStorage("user");
  if (user) {
    getImageToSave();
    GuadarModal.show();
  } else {
    loginModal.show();
  }
}
function abrirrOrLogin() {
  const user = readFromLocalStorage("user");
  if (user) {
    obtenerDibujos();
    abrirModal.show();
  } else {
    loginModal.show();
  }
}
//Log-out
function salir() {
  deleteFromLocalStorage("user");
  loginView();
}

const csrftoken = getCookie("csrftoken");
