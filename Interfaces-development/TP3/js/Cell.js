class Cell{

    constructor(posX, posY, width, height, fill, ctx){
        this.posX=posX;
        this.posY=posY;
        this.width=width;
        this.height=height;
        this.fill=fill;
        this.ctx=ctx;
        this.chip=null;
    }

    /**
     * Inicio tablero seteando fondo y casilleros vacios
     */
    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(this.posX,this.posY, this.width, this.height);

        this.ctx.beginPath();
        this.ctx.arc(this.posX+this.width/2, this.posY+this.height/2, this.width/2*0.8, 0, 2*Math.PI);
        this.ctx.fillStyle= 'black';
        this.ctx.fill();
    }
    
    setChip(chip){
        chip.posX=this.posX+this.width/2;
        chip.posY=this.posY+this.height/2;
        chip.radius=this.width/2*0.8;
        this.chip=chip;
        this.chip.draw();
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getWidth(){
        return this.width;
    }

    getChip(){
        return this.chip;
    }
}