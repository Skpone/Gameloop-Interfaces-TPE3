class Character {
    constructor(gameContainer, speed, tipo){
        this.speed = speed;
        this.elemCharacter = document.createElement('div');/*el elemento html que representa al character*/
        gameContainer.appendChild(this.elemCharacter);
        this.elemCharacter.classList.add('character');
        this.tipo = tipo;
        this.estado = 'undefined'; //estado por defecto del character
        this.run();
    }

    run(){
        if(this.estado != 'jump'){
            this.estado = 'run';
            this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/run.png) left center`;
            this.elemCharacter.style.animation = `run ${1/this.speed}s steps(6) infinite`;
        }
    }

    hurt(){
        if (this.estado == "run") { //solo lastimar cuando se está corriendo porque el único que lastima es el thief (qué está en el suelo)
          this.estado = 'hurt';
          this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/hurt.png) left center`;
          this.elemCharacter.style.animation = `hurt ${0.25/this.speed}s steps(2) 1`;

          const backToRun = () => {
            this.estado = 'undefined';
            this.run();
            this.elemCharacter.removeEventListener("animationend", backToRun);
          };

          this.elemCharacter.addEventListener("animationend", backToRun);
        }
    }

    jump(){
        if(this.estado == 'run'){
            this.estado = 'jump';
            this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/jump.png) left center`;
            this.elemCharacter.style.animation = `jump ${1.5/this.speed}s steps(4) 1`;

            const backToRun = () => {
                this.estado = 'undefined';
                this.run();
                this.elemCharacter.removeEventListener("animationend", backToRun);
            };
    
            this.elemCharacter.addEventListener("animationend", backToRun); 
        }
    }

    status(){
        return this.elemCharacter.getBoundingClientRect();
    }
}