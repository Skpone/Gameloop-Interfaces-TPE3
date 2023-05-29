class Parallax{ /*Esta clase del parallax existe para la funcionalidad del speed*/
    constructor(gameContainer, speed){
        this.speed = speed;

        //creamos div para guardar cada imagen
        this.parallaxContainer = document.createElement('div');
        gameContainer.appendChild(this.parallaxContainer);//lo ponemos dentro del game-container

        //creamos los divs para cada imagen
        this.image0 = this.initializeImageWithNumber(0);
        this.image1 = this.initializeImageWithNumber(1);
        this.image2 = this.initializeImageWithNumber(2);
        this.image3 = this.initializeImageWithNumber(3);
        this.image4 = this.initializeImageWithNumber(4);
        this.image5 = this.initializeImageWithNumber(5);
        this.image6 = this.initializeImageWithNumber(6);

    }

    initializeImageWithNumber(number){
        let newImage = document.createElement('div');
        this.parallaxContainer.appendChild(newImage);
        newImage.classList.add('images');
        newImage.id = `image-${number}`;
        return newImage;
    }

    animate(){
        this.image0.style.animation = `parallax ${27/this.speed}s linear infinite`;
        this.image1.style.animation = `parallax ${25/this.speed}s linear infinite`;
        this.image2.style.animation = `parallax ${23/this.speed}s linear infinite`;
        this.image3.style.animation = `parallax ${21/this.speed}s linear infinite`;
        this.image4.style.animation = `parallax ${19/this.speed}s linear infinite`;
        this.image5.style.animation = `parallax ${17/this.speed}s linear infinite`;
        this.image6.style.animation = `parallax ${15/this.speed}s linear infinite`;
    }
}