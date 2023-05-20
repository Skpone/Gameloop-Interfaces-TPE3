class Character /*extends GameObject, HACER EL CHARACTER GAMEOBJECT???*/ {
    constructor(elemCharacter, speed, tipo){
        this.speed = speed;
        this.elemCharacter = elemCharacter;/*el elemento html que representa al character*/
        this.tipo = tipo;
        this.estado = 'run'; //estado por defecto del character
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
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/hurt.png) left center`;
        this.elemCharacter.style.animation = `hurt ${0.3/this.speed}s steps(2) 1`;

        const backToRun = () => {
            this.estado = 'none';
            this.run();
            this.elemCharacter.removeEventListener("animationend", backToRun);
        };

        this.elemCharacter.addEventListener("animationend", backToRun); 
    }

    death(){
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/death.png) left center`;
        this.elemCharacter.style.animation = `death ${6/this.speed}s steps(6) 1`;

        const backToRun = () => {
            this.estado = 'none';
            this.run();
            this.elemCharacter.removeEventListener("animationend", backToRun);
        };

        this.elemCharacter.addEventListener("animationend", backToRun);
    }

    jump(){
        if(this.estado == 'run'){
            this.estado = 'jump';
            this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/jump.png) left center`;
            this.elemCharacter.style.animation = `jump ${1.5/this.speed}s steps(4) 1`;

            const backToRun = () => {
                this.estado = 'none';
                this.run();
                this.elemCharacter.removeEventListener("animationend", backToRun);
            };
    
            this.elemCharacter.addEventListener("animationend", backToRun); 
        }
    }

    status(){
        return this.personaje.getBoundingClientRect();
    }
}