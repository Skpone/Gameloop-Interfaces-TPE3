"use strict";

let in_game = true;
const ELEM_CHARACTER = document.querySelector('#character');
const ELEM_SPEED_RANGE = document.querySelector('#speed-range');
const ELEM_PARALLAX = document.querySelector('#parallax-background');

/*pueden haber muchos personajes con solo cambiar el tipo (considerando que tienen las mismas dimensiones cada accion)*/
let character = new Character(ELEM_SPEED_RANGE.value, 2);
let parallax = new Parallax(ELEM_PARALLAX, ELEM_SPEED_RANGE.value);

parallax.animate();

let poolDeGameObjects = new ObjectPool(ELEM_SPEED_RANGE.value);

setInterval(function () {
  let object = poolDeGameObjects.obtainObject();
  poolDeGameObjects.executeObject(object);
}, (Math.floor((Math.random() * (3000 - 1000 + 1)) + 1000))/ELEM_SPEED_RANGE.value); //quiero que los gameobjects aparezcan entre 2 y 4 segundos (dividido por la speed)

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

// actualizar estado
function refresh_status() {
  //PD: luego divirlo o hacerlo en una sola funcion, por ahora seguir implementando
    let objectsEnEjecucion = poolDeGameObjects.enExecucion;
    objectsEnEjecucion.forEach(gameObject => {
      let characterStatus = character.status();
      let objectStatus = gameObject.status();
      if (!(characterStatus.right < objectStatus.left ||
        characterStatus.left > objectStatus.right ||
        characterStatus.bottom < objectStatus.top ||
        characterStatus.top > objectStatus.bottom)) {
        gameObject.hit(character);
    }
    });
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
