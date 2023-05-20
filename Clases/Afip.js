class Afip extends GameObject{
    constructor(speed){
        super(speed);
        /*instanciarlo implica crear el div*/
        this.elemAfip = document.createElement('div');
    }

    status(){
        return this.personaje.getBoundingClientRect();
    }

    reset(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemAfip.classList.add('afip'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.elemGameContainer.appendChild(this.elemAfip); /*lo ponemos en el juego*/
        this.elemAfip.style.animation = ``;//agregar animación (que aparezca y si vaya moviendo linealmente hasta el final izq de la patalla) dependiendo la speed
        //seguir
        //agregar event listener con animation end que cuando termine la animación pase algo en el object pool (o mejor no, lo administro todo desde el object pool, dsp de cierto tiempo se resetea)
    }
}