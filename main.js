"use strict";

let in_game = true;
let player = document.querySelector('#player');

function animacionPersonaje(e) {
    let steps;
    switch (e.code) {
        case "Space":
            console.log("se apreto espacio");
            steps = 4; /*steps que necesito para saltar*/
            player.style.background = 'url(./sprites/Character1/Biker_jump.png) left center';
            player.style.animation = `jump 1s steps(${steps}) infinite`;
            break;
        case "Backspace":
            console.log("se apreto backspace");
            steps = 6;
            player.style.background = 'url(./sprites/Character1/Biker_run.png) left center';
            player.style.animation = `run 1s steps(${steps}) infinite`;
            break;
        default:
            console.log("otra tecla");
            break;
    }
}

//procesar el input del usuario
function process_user_input() {
  document.addEventListener("keydown", (e) => {
    animacionPersonaje(e);
  });
}

function refresh_status() {
  // actualizar estado
}

function rendering() {
  // dibujar juego
}

function gameLoop() {
  console.log("Bucle en ejecucion.");
  process_user_input();
  refresh_status();
  rendering();

  if (in_game) {
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
