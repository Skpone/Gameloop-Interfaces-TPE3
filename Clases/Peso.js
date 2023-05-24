class Peso extends GameObject{
    constructor(speed){
        super(speed);
        /*instanciarlo implica crear el div*/
        this.elemPeso = document.createElement('div');
    }

    status(){
        return this.elemPeso.getBoundingClientRect();
    }

    execute(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemPeso.classList.add('peso'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.elemGameContainer.appendChild(this.elemPeso); /*lo ponemos en el juego*/
        this.elemPeso.style.animation = `gameObject ${16.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemPeso.addEventListener("animationend", () => {
            this.elemGameContainer.removeChild(this.elemPeso);
            resolve();
          });
        });
    }
}