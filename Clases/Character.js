class Character {
    constructor(elemCharacter, speed, tipo){
        this.elemCharacter = elemCharacter;/*el elemento html que representa al character*/
        this.speed = speed; /*el speed determina a que velocidad van las animaciones*/
        this.tipo = tipo;
    }

    idle(){
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/idle.png) left center`;
        this.elemCharacter.style.animation = `idle ${1/this.speed}s steps(4) infinite`;
    }

    run(){
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/run.png) left center`;
        this.elemCharacter.style.animation = `run ${1/this.speed}s steps(6) infinite`;
    }

    hurt(){
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/hurt.png) left center`;
        this.elemCharacter.style.animation = `hurt ${1/this.speed}s steps(2) 1`;
    }

    death(){
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/death.png) left center`;
        this.elemCharacter.style.animation = `death 1s steps(6) 1`;
    }

    jump(){
        this.elemCharacter.style.background = `url(./Archivos/Character${this.tipo}/jump.png) left center`;
        this.elemCharacter.style.animation = `jump ${1/this.speed}s steps(4) 1`;
    }
}