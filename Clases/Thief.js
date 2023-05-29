class Thief extends GameObject{
    constructor(gameContainer, speed){
        super(gameContainer, speed);
        /*instanciarlo implica crear el div*/
        this.elemThief = document.createElement('div');
        this.tipoDeObjecto = 'thief';
    }

    status(){
        return this.elemThief.getBoundingClientRect();
    }

    execute(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemThief.classList.add('thief'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.gameContainer.appendChild(this.elemThief); /*lo ponemos en el juego*/
        this.elemThief.style.animation = `gameObject ${16.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemThief.addEventListener("animationend", () => {
            this.gameContainer.removeChild(this.elemThief);
            resolve();
          });
        });
    }

    hit(character) {
      character.hurt();//si el character está saltando, entonces no procede a lastimar
      if(character.estado == 'hurt'){//si se lastimó al character
        return true;
      }
      return false;
  }
}