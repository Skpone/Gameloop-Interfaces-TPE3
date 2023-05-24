class Afip extends GameObject{
    constructor(speed){
        super(speed);
        /*instanciarlo implica crear el div*/
        this.elemAfip = document.createElement('div');
    }

    status(){
        return this.elemAfip.getBoundingClientRect();
    }

    execute(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemAfip.classList.add('afip'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.elemGameContainer.appendChild(this.elemAfip); /*lo ponemos en el juego*/
        this.elemAfip.style.animation = `gameObject ${18.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemAfip.addEventListener("animationend", () => {
            this.elemGameContainer.removeChild(this.elemAfip);
            resolve();
          });
        });
    }
}