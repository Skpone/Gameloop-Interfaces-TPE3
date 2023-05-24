class Thief extends GameObject{
    constructor(speed){
        super(speed);
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
        this.elemGameContainer.appendChild(this.elemThief); /*lo ponemos en el juego*/
        this.elemThief.style.animation = `gameObject ${16.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemThief.addEventListener("animationend", () => {
            this.elemGameContainer.removeChild(this.elemThief);
            resolve();
          });
        });
    }

    hit(character) {//terminar de implementar
      character.hurt();//si el character está saltando, entonces no procede a lastimar
      if(character.estado == 'hurt'){//si se lastimó al character
        return true;
      }
      return false;
  }
}