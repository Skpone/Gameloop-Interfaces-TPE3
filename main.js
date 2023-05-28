"use strict";

let in_game = true;
const ELEM_CHARACTER = document.querySelector('#character');
const ELEM_SPEED_RANGE = document.querySelector('#speed-range');
const ELEM_PARALLAX = document.querySelector('#parallax-background');
const ELEM_TIMER = document.querySelector('#timer');
const ELEM_DOLLARS = document.querySelector('#dollars');

/*pueden haber muchos personajes con solo cambiar el tipo (considerando que tienen las mismas dimensiones cada accion)*/
let gameManager = new GameManager(ELEM_PARALLAX, ELEM_SPEED_RANGE.value, 2);

let dollars = 0; //cantidad de dólares
let time = 100; //tiempo (con 100 segundos default)

//counter-timing
setInterval(() => {
  if(time == 0){//se terminó el tiempo
    //terminar el juego
  }else{
    time = time -1;
  }
}, (1000/ELEM_SPEED_RANGE.value));

//spawnear gameObjects
setInterval(function () {
  gameManager.spawnGameObject();
}, (Math.floor((Math.random() * (3000 - 1000 + 1)) + 1000))/ELEM_SPEED_RANGE.value); //quiero que los gameobjects aparezcan entre 2 y 4 segundos (dividido por la speed)



function process_user_input() {
  document.addEventListener("keydown", (e) => {
    gameManager.actionCharacter(e);
  });
}


function refresh_status() {
    let gameObject = gameManager.findGameObjectInCollision();
    if(gameObject != null){
      if(gameManager.hitWithGameObject(gameObject)){ //si por x razon dependiendo del gameObject se realizó el hit al character
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
}


function rendering() {
  //renderizar tiempo restante y dólares
  ELEM_TIMER.innerHTML = `Tiempo: ${time}`;
  ELEM_DOLLARS.innerHTML = `Dólares: ${dollars}`;
}

function gameLoop() {
  process_user_input();
  refresh_status();
  rendering();

  if (in_game) {
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
