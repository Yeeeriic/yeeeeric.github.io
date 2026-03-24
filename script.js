// 🔐 LOGIN
function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    window.location.href = "home.html";
  } else {
    alert("Datos incorrectos");
  }
}

// PROTEGER HOME
if (window.location.pathname.includes("home.html")) {
  if (localStorage.getItem("login") !== "true") {
    window.location.href = "index.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

// 🔁 CAMBIAR TEXTO
function cambiar() {
  let t = document.getElementById("texto");
  t.innerText = t.innerText === "Disfruta del contenido"
    ? "🔥 Nuevo contenido"
    : "Disfruta del contenido";
}

// 🌙 MODO OSCURO
function modo() {
  document.body.classList.toggle("dark");
}

// 🎬 VIDEO
function verTrailer(src) {
  document.getElementById("videoModal").style.display = "block";
  document.getElementById("video").src = src;
}

function cerrarVideo() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("video").pause();
}

// ⭐ FAVORITOS
function guardarFavorito(nombre) {
  let lista = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!lista.includes(nombre)) {
    lista.push(nombre);
    localStorage.setItem("favoritos", JSON.stringify(lista));
    mostrarFavoritos();
  }
}

function mostrarFavoritos() {
  let contenedor = document.getElementById("favoritos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  let lista = JSON.parse(localStorage.getItem("favoritos")) || [];

  lista.forEach(p => {
    let div = document.createElement("div");
    div.className = "favorito";
    div.innerText = p;
    contenedor.appendChild(div);
  });
}

mostrarFavoritos();

// 🔍 BUSCADOR
function buscar() {
  let input = document.getElementById("buscador").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let texto = card.innerText.toLowerCase();
    card.style.display = texto.includes(input) ? "block" : "none";
  });
}

// 🎬 API REAL
async function cargarPeliculas() {
  let res = await fetch("https://api.tvmaze.com/shows");
  let data = await res.json();

  let contenedor = document.getElementById("peliculas");

  data.slice(0, 10).forEach(peli => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img class="poster" src="${peli.image?.medium}">
      <div class="info">
        <h3>${peli.name}</h3>
        <button onclick="verTrailer('https://www.w3schools.com/html/mov_bbb.mp4')">▶ Ver</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

cargarPeliculas();