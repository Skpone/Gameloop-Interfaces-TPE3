class Thief extends GameObject{
    constructor(speed){
        super(speed);
        /*instanciarlo implica crear el div*/
        this.elemThief = document.createElement('div');
    }

    status(){
        return this.personaje.getBoundingClientRect();
    }

    reset(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemThief.classList.add('thief'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.elemGameContainer.appendChild(this.elemThief); /*lo ponemos en el juego*/
        this.elemThief.style.animation = `gameObject ${25/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed
        
        //seguir
        //agregar event listener con animation end que cuando termine la animación pase algo en el object pool (o mejor no, lo administro todo desde el object pool, dsp de cierto tiempo se resetea)
    }
}