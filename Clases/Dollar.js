class Dollar extends GameObject{
    constructor(gameContainer, speed){
        super(gameContainer, speed);
        /*instanciarlo implica crear el div*/
        this.elemDollar = document.createElement('div');
        this.tipoDeObjecto = 'dollar';

        this.dollarSound = new Audio();
        this.dollarSound.src = 'Archivos/Sounds/collectDollar.mp3';
        this.dollarSound.playbackRate = (0.8*speed);
    }

    status(){
        return this.elemDollar.getBoundingClientRect();
    }

    execute(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemDollar.classList.add('dollar'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.gameContainer.appendChild(this.elemDollar); /*lo ponemos en el juego*/
        this.elemDollar.style.animation = `gameObject ${18.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemDollar.addEventListener("animationend", () => {
            this.gameContainer.removeChild(this.elemDollar);
            resolve();
          });
        });
    }

    hit(character) {
      this.dollarSound.play();
      this.gameContainer.removeChild(this.elemDollar);
      return true;
  }
}