document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formName");
    const nameInput = document.getElementById("idName");
    const jugarBtn = document.getElementById("btnPlay");

    jugarBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const name = nameInput.value.trim();

        if (name === "") {
            alert("Ups! You forgot to enter your name.");
            return;
        }

        //Guarda el nombre en Local Storage
        localStorage.setItem("playerName", name);
        localStorage.setItem("playerScore", 0); // Puntaje inicial en 0

        alert(`¡Hi ${name}! Let's start.`);
        window.location.href = "juego.html"; // Redirige a la pantalla del juego
    });
});
