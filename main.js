"use strict";

let in_game = true;
let elemCharacter = document.querySelector('#character');
let speedRange = document.querySelector('#speed-range');
/*pueden haber muchos personajes con solo cambiar el tipo (considerando que tienen las mismas dimensiones cada accion)*/
let character = new Character(elemCharacter, speedRange.value, 2);

character.idle();//solo para arrancar la animacion cuando arranca la pagina, dsp sacar

function animacionPersonaje(e) {
    switch (e.code) {
      case "Space":
        character.jump();
        break;
      case "Backspace":
        character.hurt();
        break;
      case "KeyR":
        character.run();
        break;
      case "KeyI":
        character.idle();
        break;
      case "KeyD":
        character.death();
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
