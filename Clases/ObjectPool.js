class ObjectPool {//el encargado de crear, ejecutar y reutilizar los GameObjects
    constructor(speed) {
        this.speed = speed;
        this.pool = []; //arrayList donde guardamos los gameObjects
        this.maxSize = 13;
    }

    // Función para tomar un objeto del pool
    obtainObject() {
        if (this.pool.length > 0) {
            // Si hay objetos disponibles en el pool, tomar uno
            return this.pool.pop();
        }
        // Si no hay objetos disponibles, crear uno nuevo
        let opciones = ['Afip','Clock','Dollar','Peso','Thief'];
        let random = Math.floor(Math.random()*5);
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
    executeObject(object) {
        object.execute(); //ejecutar el gameObject
        setTimeout(function () {
            if (this.pool.length < this.maxSize) {
                // Si el pool no ha alcanzado su tamaño máximo, devolver el objeto al pool
                this.pool.push(object);
            }
        },(25000/this.speed)); //esperamos el tiempo máximo estimado para que cuando termine de ejecutarse se vuelva a agregar a la lista

    }
}