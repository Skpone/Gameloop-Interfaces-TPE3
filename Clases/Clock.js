class Clock extends GameObject{
    constructor(gameContainer, speed){
        super(gameContainer, speed);
        /*instanciarlo implica crear el div*/
        this.elemClock = document.createElement('div');
        this.tipoDeObjecto = 'clock';

        this.clockSound = new Audio();
        this.clockSound.src = 'Archivos/Sounds/clockPick.mp3';
        this.clockSound.playbackRate = (0.8*speed);
    }

    status(){
        return this.elemClock.getBoundingClientRect();
    }

    execute(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemClock.classList.add('clock'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.gameContainer.appendChild(this.elemClock); /*lo ponemos en el juego*/
        this.elemClock.style.animation = `gameObject ${16.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemClock.addEventListener("animationend", () => {
            this.gameContainer.removeChild(this.elemClock);
            resolve();
          });
        });
    }

    hit(character) {
      this.clockSound.play();
      this.gameContainer.removeChild(this.elemClock);
      return true;
  }
}