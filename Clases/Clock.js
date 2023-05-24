class Clock extends GameObject{
    constructor(speed){
        super(speed);
        /*instanciarlo implica crear el div*/
        this.elemClock = document.createElement('div');
    }

    status(){
        return this.personaje.getBoundingClientRect();
    }

    execute(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemClock.classList.add('clock'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.elemGameContainer.appendChild(this.elemClock); /*lo ponemos en el juego*/
        this.elemClock.style.animation = `gameObject ${16.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemClock.addEventListener("animationend", () => {
            resolve();
          });
        });
    }
}