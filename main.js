"use strict";

let in_game = false;

/*//////////////////////////////////////GAME CONTAINER//////////////////////////////////////*/
const ELEM_GAME_CONTAINER = document.querySelector('#game-container');
const ELEM_PARALLAX = ELEM_GAME_CONTAINER.querySelector('#parallax-background');
/*//////////////////////////////////////GAME CONTAINER//////////////////////////////////////*/

/*//////////////////////////////////////TRACKING//////////////////////////////////////*/
const ELEM_TRACKING = document.querySelector('#tracking');
const ELEM_TIMER = ELEM_TRACKING.querySelector('#timer');
const ELEM_DOLLARS = ELEM_TRACKING.querySelector('#dollars');
const ELEM_DOLLARS_GOAL = ELEM_TRACKING.querySelector('#dollars-goal');
/*//////////////////////////////////////TRACKING//////////////////////////////////////*/

/*//////////////////////////////////////MENUS//////////////////////////////////////*/
const ELEM_MENUS = document.querySelector('#menus');
const ELEM_MAIN_MENU = ELEM_MENUS.querySelector('#main-menu');
const ELEM_HOW_TO_PLAY = ELEM_MENUS.querySelector('#how-to-play');
const ELEM_MENU_END_WIN = ELEM_MENUS.querySelector('#menu-end-win');
const ELEM_MENU_END_LOSE = ELEM_MENUS.querySelector('#menu-end-lose');

/*/////////////////////////////////BUTTONS/////////////////////////////////*/
const ELEM_MAIN_MENU_BUTTONS = ELEM_MENUS.querySelectorAll('.main-menu-button');
const ELEM_PLAY_BUTTON = ELEM_MENUS.querySelector('#play-button');
const ELEM_HOW_TO_PLAY_BUTTON = ELEM_MENUS.querySelector('#how-to-play-button');
/*/////////////////////////////////BUTTONS/////////////////////////////////*/

/*/////////////////////////////////OTROS/////////////////////////////////*/
const ELEM_CHARACTER_SELECT = ELEM_MENUS.querySelector('#character-select');
const ELEM_DOLLARS_GOAL_SELECT = ELEM_MENUS.querySelector('#dollars-goal-select');
const ELEM_SPEED_RANGE = ELEM_MENUS.querySelector('#speed-range');
/*/////////////////////////////////OTROS/////////////////////////////////*/

/*//////////////////////////////////////MENUS//////////////////////////////////////*/

let dollars = null; //cantidad de dólares
let time = null; //tiempo (con 100 segundos default)
let gameManager = null; //lo declaramos acó para qué todas las funciones la puedan usar
let timerInterval = null;
let spawnInterval = null;

//AUDIOS QUE MANEJAMOS ACA EN EL MAIN
let audioHimno = new Audio();
audioHimno.src = 'Archivos/Sounds/Himno.mp3';

let audioCumbia = new Audio();
audioCumbia.src = 'Archivos/Sounds/Cumbia.mp3';
audioCumbia.loop = true;//cuando reproduzca este audio lo quiero infinito, hasta que lo pause

//AUDIOS QUE MANEJAMOS EN EL MAIN

function initializeGame(){
  dollars = 0; //dollars iniciales
  time = 100; //tiempo (con 100 segundos default)
  audioHimno.pause();//en caso de que se vuelva a jugar se pausa el himno
  audioCumbia.play();//arranca la musica

  in_game = true;
  ELEM_DOLLARS_GOAL.innerHTML = `Meta: (${ELEM_DOLLARS_GOAL_SELECT.value})`;

  /*pueden haber muchos personajes con solo cambiar el tipo (considerando que tienen las mismas dimensiones cada accion)*/
  gameManager = new GameManager(ELEM_GAME_CONTAINER, ELEM_SPEED_RANGE.value, ELEM_CHARACTER_SELECT.value);
  
  //counter-timing
  timerInterval = setInterval(() => {
    if (time == 0) {//se terminó el tiempo
      cleanGameContainer();//limpiamos
      //quitamos los intervalos para que no se superpongan
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      ELEM_MENU_END_LOSE.classList.add('display');
      audioCumbia.pause();
      audioHimno.play();
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

function cleanGameContainer(){//limpia todos los elementos del gameContainer para que los elementos viejos no interfieran con los nuevos si se llega a instanciar el juego
  while(ELEM_GAME_CONTAINER.firstChild){
      ELEM_GAME_CONTAINER.removeChild(ELEM_GAME_CONTAINER.firstChild);
  };
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
              cleanGameContainer(); //limpiamos
              //quitamos los intervalos para que no se superpongan
              clearInterval(timerInterval);
              clearInterval(spawnInterval);
              ELEM_MENU_END_WIN.classList.add('display'); //GANO EL JUEGO
              audioCumbia.pause();
              audioHimno.play();
            }
            break;
          case "peso":
            dollars = dollars + 1;
            break;
          case "afip":
            cleanGameContainer(); //limpiamos
            //quitamos los intervalos para que no se superpongan
            clearInterval(timerInterval);
            clearInterval(spawnInterval);
            ELEM_MENU_END_LOSE.classList.add('display');
            audioCumbia.pause();
            audioHimno.play();
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