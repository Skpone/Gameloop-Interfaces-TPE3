class GameObject{
    constructor(gameContainer, speed){
        this.speed = speed;
        this.gameContainer = gameContainer;
        this.tipoDeObjecto = 'undefined';
    }
    status() {
        return ;
    }
    execute() {
        return ;
    }
    hit(character) {
        return ; //retorna true o false dependiendo de si se cumplieron los criterios del hit dependiendo de la clase
    }
}