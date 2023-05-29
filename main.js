"use strict";

let in_game = false;

/*//////////////////////////////////////GAME CONTAINER//////////////////////////////////////*/
const ELEM_CHARACTER = document.querySelector('#character');
const ELEM_PARALLAX = document.querySelector('#parallax-background');
const ELEM_TIMER = document.querySelector('#timer');
const ELEM_DOLLARS = document.querySelector('#dollars');
const ELEM_DOLLARS_GOAL = document.querySelector('#dollars-goal');
/*//////////////////////////////////////GAME CONTAINER//////////////////////////////////////*/

/*//////////////////////////////////////MENUS//////////////////////////////////////*/
const ELEM_MAIN_MENU = document.querySelector('#main-menu');
const ELEM_HOW_TO_PLAY = document.querySelector('#how-to-play');
const ELEM_MENU_END_WIN = document.querySelector('#menu-end-win');
const ELEM_MENU_END_LOSE = document.querySelector('#menu-end-lose');

/*/////////////////////////////////BUTTONS/////////////////////////////////*/
const ELEM_MAIN_MENU_BUTTONS = document.querySelectorAll('.main-menu-button');
const ELEM_PLAY_BUTTON = document.querySelector('#play-button');
const ELEM_HOW_TO_PLAY_BUTTON = document.querySelector('#how-to-play-button');
/*/////////////////////////////////BUTTONS/////////////////////////////////*/

/*/////////////////////////////////OTROS/////////////////////////////////*/
const ELEM_CHARACTER_SELECT = document.querySelector('#character-select');
const ELEM_DOLLARS_GOAL_SELECT = document.querySelector('#dollars-goal-select');
const ELEM_SPEED_RANGE = document.querySelector('#speed-range');
/*/////////////////////////////////OTROS/////////////////////////////////*/

/*//////////////////////////////////////MENUS//////////////////////////////////////*/

let dollars = null; //cantidad de dólares
let time = null; //tiempo (con 100 segundos default)
let gameManager = null; //lo declaramos acó para qué todas las funciones la puedan usar
let timerInterval = null;
let spawnInterval = null;

function initializeGame(){
  dollars = 0; //dollars iniciales
  time = 100; //tiempo (con 100 segundos default)

  in_game = true;
  ELEM_DOLLARS_GOAL.innerHTML = `Meta: (${ELEM_DOLLARS_GOAL_SELECT.value})`;

  /*pueden haber muchos personajes con solo cambiar el tipo (considerando que tienen las mismas dimensiones cada accion)*/
  gameManager = new GameManager(ELEM_PARALLAX, ELEM_SPEED_RANGE.value, ELEM_CHARACTER_SELECT.value);
  
  //counter-timing
  timerInterval = setInterval(() => {
    if (time == 0) {//se terminó el tiempo
      gameManager.purgeCharacter();//limpiamos
      //quitamos los intervalos para que no se superpongan
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      ELEM_MENU_END_LOSE.classList.add('display');
    }else{
      time = time - 1;
    }
  }, 1000 / ELEM_SPEED_RANGE.value);

  //spawnear gameObjects
  spawnInterval = setInterval(function () {
    gameManager.spawnGameObject();
  }, Math.floor(Math.random()*(3000 - 1000 + 1) + 1000)/ELEM_SPEED_RANGE.value); //quiero que los gameobjects aparezcan entre 2 y 4 segundos (dividido por la speed)

  gameLoop();
}

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
            if(dollars >= ELEM_DOLLARS_GOAL_SELECT.value){ //SI SE LLEGO A LA META
              gameManager.purgeCharacter(); //limpiamos
              //quitamos los intervalos para que no se superpongan
              clearInterval(timerInterval);
              clearInterval(spawnInterval);
              ELEM_MENU_END_WIN.classList.add('display'); //GANO EL JUEGO
            }
            break;
          case "peso":
            dollars = dollars + 1;
            break;
          case "afip":
            gameManager.purgeCharacter(); //limpiamos
            //quitamos los intervalos para que no se superpongan
            clearInterval(timerInterval);
            clearInterval(spawnInterval);
            ELEM_MENU_END_LOSE.classList.add('display');
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

/*//////////////////////////////////////EVENT LISTENERS//////////////////////////////////////*/
ELEM_MAIN_MENU_BUTTONS.forEach((button) => {
  button.addEventListener('click', () => {
    ELEM_MAIN_MENU.classList.add('display');
    ELEM_HOW_TO_PLAY.classList.remove('display');
    ELEM_MENU_END_WIN.classList.remove('display');
    ELEM_MENU_END_LOSE.classList.remove('display');
  });
})

ELEM_HOW_TO_PLAY_BUTTON.addEventListener('click', () => {
    ELEM_MAIN_MENU.classList.add('display');
    ELEM_HOW_TO_PLAY.classList.add('display');
    ELEM_MENU_END_WIN.classList.remove('display');
    ELEM_MENU_END_LOSE.classList.remove('display');
})

ELEM_PLAY_BUTTON.addEventListener('click', () =>{
  ELEM_MAIN_MENU.classList.remove('display');
  //arrancar el juego
  initializeGame();
})
/*//////////////////////////////////////EVENT LISTENERS//////////////////////////////////////*/