class Dollar extends GameObject{
    constructor(speed){
        super(speed);
        /*instanciarlo implica crear el div*/
        this.elemDollar = document.createElement('div');
    }

    status(){
        return this.elemDollar.getBoundingClientRect();
    }

    execute(){
        /*acá es donde nos aseguramos de que aparezca (y vuelva a aparecer) desde el lado derecho de la pantalla*/
        this.elemDollar.classList.add('dollar'); /*le damos sus características para que se vea y pueda aparecer correctamente desde la derecha*/
        this.elemGameContainer.appendChild(this.elemDollar); /*lo ponemos en el juego*/
        this.elemDollar.style.animation = `gameObject ${18.60/this.speed}s linear 1`;//se va moviendo linealmente hasta el final izq de la patalla) dependiendo la speed

        return new Promise((resolve) => {
          this.elemDollar.addEventListener("animationend", () => {
            this.elemGameContainer.removeChild(this.elemDollar);
            resolve();
          });
        });
    }

    hit(character) {//terminar de implementar

      this.elemGameContainer.removeChild(this.elemDollar);
      return ;
  }
}