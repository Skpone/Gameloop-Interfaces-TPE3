"use strict";

let in_game = true;
const ELEM_CHARACTER = document.querySelector('#character');
const ELEM_SPEED_RANGE = document.querySelector('#speed-range');
const ELEM_PARALLAX = document.querySelector('#parallax-background');
const ELEM_TIMER = document.querySelector('#timer');
const ELEM_DOLLARS = document.querySelector('#dollars');

/*pueden haber muchos personajes con solo cambiar el tipo (considerando que tienen las mismas dimensiones cada accion)*/
let character = new Character(ELEM_SPEED_RANGE.value, 1);
let parallax = new Parallax(ELEM_PARALLAX, ELEM_SPEED_RANGE.value);
let dollars = 0; //cantidad de dólares
let time = 100; //tiempo (con 100 segundos default)

parallax.animate();

let poolDeGameObjects = new ObjectPool(ELEM_SPEED_RANGE.value);

//counter-timing
setInterval(() => {
  if(time == 0){//se terminó el tiempo
    //terminar el juego
  }else{
    time = time -1;
  }
}, (1000/ELEM_SPEED_RANGE.value));

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
        let hit = gameObject.hit(character);
        if(hit){
          switch (gameObject.tipoDeObjecto) {
            case "thief":
              if(dollars >= (1*ELEM_SPEED_RANGE.value)){
                dollars = dollars - (1*ELEM_SPEED_RANGE.value);
              }else{
                dollars = dollars - dollars;
              }
              break;
            case "clock":
              time = time + 15;
              break;
            case "dollar":
              dollars = dollars + 100;
              break;
            case "peso":
              dollars = dollars + 1;
              break;
            case "afip":
              //llamar a un método que "finalize" el juego
              break;
            default:
              break;
          }
        }
    }
    });

}

// dibujar juego
function rendering() {
  //renderizar tiempo restante y dólares
  ELEM_TIMER.innerHTML = `Tiempo: ${time}`;
  ELEM_DOLLARS.innerHTML = `Dólares: ${dollars}`;
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
