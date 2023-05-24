class ObjectPool {
  //el encargado de crear, ejecutar y reutilizar los GameObjects
  constructor(speed) {
    this.speed = speed;
    this.pool = []; //arrayList donde guardamos los gameObjects
    this.maxSize = 25;
  }

  // Función para tomar un objeto del pool
  obtainObject() {
    if (this.pool.length > 0) {
      // Si hay objetos disponibles en el pool, tomar uno random, cosa de que luego no se repitan patrones
      let randomIndex = Math.floor(Math.random() * this.pool.length);
      let randomElement = this.pool[randomIndex];
      this.pool.splice(randomIndex, 1);
      return randomElement;
    }

    // Si no hay objetos disponibles, crear uno nuevo
    let opciones = ["Dollar", "Clock", "Thief", "Afip", "Peso"];
    let random;

    if (Math.random() < 0.7) {
      //if para que haya mas probabilidad de que salgan dollars, clocks y thiefs
      random = Math.floor(Math.random() * 3);
    } else if (Math.random() < 0.9) {
      //probabilidad media baja (entre 0.7 y 0.9 (no inclusive) de que salga la afip).
      random = 3;
    } else {
      random = 4; //muy poca probabilidad de que salgan pesos
    }

    switch (opciones[random]) {
      case "Afip":
        return new Afip(this.speed);
        break;
      case "Clock":
        return new Clock(this.speed);
        break;
      case "Dollar":
        return new Dollar(this.speed);
        break;
      case "Peso":
        return new Peso(this.speed);
        break;
      case "Thief":
        return new Thief(this.speed);
        break;
      default:
        return new Dollar(this.speed);
        break;
    }
  }

  // Función para devolver un objeto al pool
  async executeObject(object) {
    await object.execute(); //ejecutar el gameObject

    if (this.pool.length < this.maxSize) {
      // Si el pool no ha alcanzado su tamaño máximo, devolver el objeto al pool
      this.pool.push(object);
    }
  }
}