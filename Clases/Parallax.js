class Parallax{
    constructor(elemParallax, speed){
        this.elemParallax = elemParallax;
        this.speed = speed;

        this.image0 = this.elemParallax.querySelector('#image-0');
        this.image1 = this.elemParallax.querySelector('#image-1');
        this.image2 = this.elemParallax.querySelector('#image-2');
        this.image3 = this.elemParallax.querySelector('#image-3');
        this.image4 = this.elemParallax.querySelector('#image-4');
        this.image5 = this.elemParallax.querySelector('#image-5');
        this.image6 = this.elemParallax.querySelector('#image-6');
    }

    execute(){
        this.image0.style.animation = `parallax ${27/this.speed}s linear infinite`;
        this.image1.style.animation = `parallax ${25/this.speed}s linear infinite`;
        this.image2.style.animation = `parallax ${23/this.speed}s linear infinite`;
        this.image3.style.animation = `parallax ${21/this.speed}s linear infinite`;
        this.image4.style.animation = `parallax ${19/this.speed}s linear infinite`;
        this.image5.style.animation = `parallax ${17/this.speed}s linear infinite`;
        this.image6.style.animation = `parallax ${15/this.speed}s linear infinite`;
    }
}