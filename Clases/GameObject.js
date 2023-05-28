class GameObject{
    constructor(speed){
        this.speed = speed;
        this.elemGameContainer = document.querySelector('#game-container');
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