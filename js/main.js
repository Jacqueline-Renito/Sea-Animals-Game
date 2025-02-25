// 🎵 Cargar la canción de fondo
const musicaFondo = new Audio("../sounds/fondo.wav"); // Asegúrate de que la ruta sea correcta
musicaFondo.loop = true;         // 🔁 Repetir la canción
musicaFondo.volume = 0.05;        // 🔉 Volumen bajo

// 🎮 Variables del modal y botón
const modal = document.getElementById("modalInstrucciones");
const btn = document.getElementById("btnInstrucciones");
const closeBtn = document.querySelector(".close");

var animales = ["ballena", "cangrejo", "delfin", "orca", "pez", "tortuga"];
var errorMsg = ["Oops! Try again! 🐡", "Almost there! Keep trying! 🐚", "Not quite. You can do it! 🐠"];
var congratulationsMsg = ["Great job! 🐬 You got it right!", "Perfect match! 🌟", "Splashtastic! 🐳"];
let puntaje = 0;
let tiempo = 0;
let cronometroInterval;

document.addEventListener("DOMContentLoaded", function () {
    colocarAnimales(animales);
    iniciarCronometro();

    const nombre = localStorage.getItem("playerName") || "Jugador";
    puntaje = parseInt(localStorage.getItem("playerScore")) || 0;

    document.getElementById("btnInicio").addEventListener("click", () => {
        finalizarJuego();
        window.location.href = "index.html";
    });
    musicaFondo.play().catch(() => {
        console.log("⚠️ Autoplay bloqueado, se iniciará al interactuar.");
      });
});

// 🎚️ Alternar sonido al presionar el botón
document.getElementById("btnAudio").addEventListener("click", () => {
    if (musicaFondo.paused) {
      musicaFondo.play();
      document.getElementById("btnAudio").textContent = "🔊"; // Icono de sonido activo
    } else {
      musicaFondo.pause();
      document.getElementById("btnAudio").textContent = "🔇"; // Icono de sonido apagado
    }
  });

function mezclarArreglo(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function colocarAnimales(animales) {
    mezclarArreglo(animales);

    const contenedor = document.getElementById("imagenes");
    contenedor.innerHTML = "";
    contenedor.style.display = "flex";
    contenedor.style.justifyContent = "center";
    contenedor.style.alignItems = "center";
    contenedor.style.flexWrap = "wrap";
    contenedor.style.height = "100vh";
    contenedor.style.margin = "0";

    animales.forEach((animal) => {
        const animalContainer = document.createElement("div");
        animalContainer.classList.add("animal-container");
        animalContainer.style.display = "flex";
        animalContainer.style.flexDirection = "column";
        animalContainer.style.alignItems = "center";
        animalContainer.style.gap = "10px";
        animalContainer.style.margin = "20px";
        animalContainer.innerHTML = `
        <img src="images/${animal}.png" data-name="${animal}" class="animal-img" draggable="false" style="width: 160px; height: auto;">
        <div class="cajaAnimal" data-animal="${animal}" style="width: 160px; height: 50px; border-bottom: 2px solid #555; display: flex; align-items: center; justify-content: center;" ondragover="allowDrop(event)" ondrop="drop(event)"></div>
    `;
        contenedor.appendChild(animalContainer);
    });

    const nombres = document.getElementById("arrastrables");
    const animalesMezclados = [...animales];
    mezclarArreglo(animalesMezclados);

    nombres.innerHTML = "";
    nombres.style.display = "flex";
    nombres.style.flexDirection = "row";
    nombres.style.justifyContent = "flex-end";
    nombres.style.alignItems = "center";
    nombres.style.gap = "20px";
    nombres.style.position = "absolute";
    nombres.style.top = "20px";
    nombres.style.right = "20px";
    nombres.style.transform = "none";

    animalesMezclados.forEach((animal) => {
        const textoAnimal = document.createElement("div");
        textoAnimal.classList.add("textoAnimal");
        textoAnimal.id = animal;
        textoAnimal.draggable = true;
        textoAnimal.textContent = animal;
        textoAnimal.style.padding = "15px 20px";
        textoAnimal.style.backgroundColor = "#f0f0f0";
        textoAnimal.style.borderRadius = "10px";
        textoAnimal.style.cursor = "grab";
        textoAnimal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        textoAnimal.style.fontSize = "20px";
        textoAnimal.style.fontWeight = "bold";

        textoAnimal.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
        });

        nombres.appendChild(textoAnimal);
    });
}

function allowDrop(e) {
    e.preventDefault();
}

function iniciarCronometro() {
    cronometroInterval = setInterval(() => {
        tiempo++;
        const minutos = String(Math.floor(tiempo / 60)).padStart(2, "0");
        const segundos = String(tiempo % 60).padStart(2, "0");
        document.getElementById("cronometro").innerText = `⏱️ ${minutos}:${segundos}`;
    }, 1000);
}

// 🛑 Detener cronómetro
function detenerCronometro() {
    clearInterval(cronometroInterval);
}

// 💾 Guardar resultado
function guardarResultado() {
    const nombre = localStorage.getItem("playerName") || "Jugador";
    localStorage.setItem("playerName", nombre);
    localStorage.setItem("playerScore", puntaje);
    localStorage.setItem("playerTime", tiempo);
}

// 🎯 Finalizar el juego
function finalizarJuego() {
    detenerCronometro();
    guardarResultado();
    alert(`🎉 ¡Felicidades! Puntaje final: ${puntaje} | Tiempo: ${formatearTiempo(tiempo)}`);
    window.location.href = "resultados.html";
    puntaje = 0;
    tiempo = 0;
}

// 🏁 Verificar si el juego ha terminado
function verificarFinJuego() {
    const zonas = document.querySelectorAll(".cajaAnimal");
    const completado = Array.from(zonas).every((zona) => {
        return zona.children.length > 0 && zona.firstElementChild.classList.contains("textoAnimal");
    });

    if (completado) {
        finalizarJuego();
    }
}

// ⏳ Formatear tiempo
function formatearTiempo(segundosTotales) {
    const minutos = String(Math.floor(segundosTotales / 60)).padStart(2, "0");
    const segundos = String(segundosTotales % 60).padStart(2, "0");
    return `${minutos}:${segundos}`;
}

// 🖱️ Función de drop actualizada
function drop(e) {
    e.preventDefault();
    const nombreAnimal = e.dataTransfer.getData("text/plain");
    const zonaObjetivo = e.target.getAttribute("data-animal");

    if (nombreAnimal === zonaObjetivo) {
        const elemento = document.getElementById(nombreAnimal);
        e.target.appendChild(elemento);
        reproducirSonido(nombreAnimal);
        actualizarPuntaje(100);
        e.target.style.borderBottom = "hidden";
    } else {
        reproducirSonido("error");
        actualizarPuntaje(-50);
        reproducirError();
    }

    // ✅ Llamada directa para verificar finalización
    setTimeout(verificarFinJuego, 100); // Pequeño retraso para permitir actualización del DOM
}

// 🔊 Reproducir sonido
function reproducirSonido(animal) {
    const sonido = new Audio(`sounds/${animal}.mp3`);
    sonido.play();
}

// ⭐ Actualizar puntaje
function actualizarPuntaje(valor) {
    puntaje += valor;
    document.getElementById("puntos").innerText = `⭐ Score: ${puntaje}`;
    localStorage.setItem("playerScore", puntaje);
}

function mostrarMensajeError(mensaje) {
    const mensajeElemento = document.getElementById("mensajeError");
    mensajeElemento.textContent = mensaje;
    mensajeElemento.style.opacity = "1";
    mensajeElemento.style.transform = "translateX(0)";
  
    // ⏳ Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      mensajeElemento.style.opacity = "0";
      mensajeElemento.style.transform = "translateX(100%)";
    }, 3000);
  }
  
  // 🎯 Llama a esta función cuando haya un error
  function reproducirError() {
    reproducirSonido("error");
    let errorM = obtenerNumeroAleatorio(0,2);
    mostrarMensajeError(errorMsg[errorM]);
  }
  
  // 🔓 Abrir el modal al hacer clic en el botón
btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
  
  // 🔒 Cerrar el modal al hacer clic en la X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // 🔒 Cerrar el modal al hacer clic fuera del contenido
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function obtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }