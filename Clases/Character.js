class Character {
    constructor(elemCharacter, tipo){
        this.elemCharacter = elemCharacter;/*el elemento html que representa al character*/
        this.tipo = tipo;
    }

    idle(){
        this.elemCharacter.style.background = `url(./sprites/Character${this.tipo}/idle.png) left center`;
        this.elemCharacter.style.animation = 'idle 1s steps(4) infinite';
    }

    run(){
        this.elemCharacter.style.background = `url(./sprites/Character${this.tipo}/run.png) left center`;
        this.elemCharacter.style.animation = 'run 1s steps(6) infinite';
    }

    hurt(){
        this.elemCharacter.style.background = `url(./sprites/Character${this.tipo}/hurt.png) left center`;
        this.elemCharacter.style.animation = 'hurt 1s steps(2) infinite';
    }

    death(){
        this.elemCharacter.style.background = `url(./sprites/Character${this.tipo}/death.png) left center`;
        this.elemCharacter.style.animation = 'death 1s steps(6) infinite';
    }

    jump(){
        this.elemCharacter.style.background = `url(./sprites/Character${this.tipo}/jump.png) left center`;
        this.elemCharacter.style.animation = `jump 1s steps(4) infinite`;
    }
}