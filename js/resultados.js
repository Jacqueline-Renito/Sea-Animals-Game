document.addEventListener("DOMContentLoaded", function () {
    const nombre = localStorage.getItem("playerName") || "Jugador";
    const puntaje = localStorage.getItem("playerScore") || 0;
    const tiempoSegundos = parseInt(localStorage.getItem("playerTime")) || 0;

    const minutos = String(Math.floor(tiempoSegundos / 60)).padStart(2, '0');
    const segundos = String(tiempoSegundos % 60).padStart(2, '0');
    const tiempo = `${minutos}:${segundos}`;

    const tabla = document.getElementById("tablaResultados");
    const fila = `
      <tr>
        <td>${nombre}</td>
        <td>${puntaje}</td>
        <td>${tiempo}</td>
      </tr>
    `;
    tabla.innerHTML = fila;
});