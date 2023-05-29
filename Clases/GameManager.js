class GameManager {
  constructor(gameContainer, speed, characterType) {
    this.gameSpeed = speed;
    this.character = new Character(gameContainer, this.gameSpeed, characterType);
    this.poolDeGameObjects = new ObjectPool(gameContainer, this.gameSpeed);
    this.parallax = new Parallax(gameContainer, this.gameSpeed);
    this.parallax.animate();
  }

  spawnGameObject() {
    let object = this.poolDeGameObjects.obtainObject();
    this.poolDeGameObjects.executeObject(object);
  }

  actionCharacter(e) {
    switch (e.code) { //e.code = tecla que se presionó
      case "Space":
        this.character.jump();
        break;
    }
  }

  findGameObjectInCollision() {
    let objectsEnEjecucion = this.poolDeGameObjects.enExecucion;

    for (let gameObject of objectsEnEjecucion) {
      if (this.checkCollision(this.character, gameObject)) {
        return gameObject;
      }
    }

    return null;
  }

  checkCollision(character, gameObject) {
    let characterStatus = character.status();
    let objectStatus = gameObject.status();

    if(!(characterStatus.right < objectStatus.left || characterStatus.left > objectStatus.right || characterStatus.bottom < objectStatus.top || characterStatus.top > objectStatus.bottom)){
      return true;
    }else{
      return false;
    }
  }

  hitWithGameObject(gameObject){
    return gameObject.hit(this.character);
  }

}