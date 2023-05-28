class Character /*extends GameObject, HACER EL CHARACTER GAMEOBJECT???*/ {
    constructor(speed, tipo){
        this.speed = speed;
        this.elemGameContainer = document.querySelector('#game-container');
        this.elemCharacter = document.createElement('div');/*el elemento html que representa al character*/
        this.elemGameContainer.appendChild(this.elemCharacter);
        this.elemCharacter.classList.add('character');
        this.tipo = tipo;
        this.estado = 'blank'; //estado por defecto del character
        this.run();
    }

    idle(){//es un estado que creo que no necesito, decidir si sacarlo
        this.estado = 'idle';
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/idle.png) left center`;
        this.elemCharacter.style.animation = `idle ${1/this.speed}s steps(4) infinite`;
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

    death(){//es un estado que le veo la necesidad, decidir si sacarlo
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/death.png) left center`;
        this.elemCharacter.style.animation = `death ${6/this.speed}s steps(6) 1`;

        const finish = () => {
            this.finish();
            this.elemCharacter.removeEventListener("animationend", finish);
        };

        this.elemCharacter.addEventListener("animationend", finish);
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

    finish(){
        this.estado = 'finished';
        this.elemGameContainer.removeChild(this.elemCharacter);
    }

    status(){
        return this.elemCharacter.getBoundingClientRect();
    }
}