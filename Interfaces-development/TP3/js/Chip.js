"use strict"

class Chip{
    constructor(posX, posY, radius, img, fillColor, context, borderColor, borderWidth){
        this.previousX = null;
        this.previousY = null;
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.img = img;
        this.fillColor = fillColor;
        this.ctx = context;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.setDefaultStyle();
    }

    getResaltado(){
        return this.borderColor;
    }

    setResaltado(resaltado){//TODO spanglish
        this.borderColor = resaltado;
        this.borderWidth = 3;
    }

    setFillColor(color){
        this.fillColor=color;
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x*_x + _y*_y) < this.radius;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setPosX(x){
        this.posX=x;
    }
    setPosY(y){
        this.posY=y;
    }

    getImg(){
        return this.img;
    }

    getPreviousX(){
        return this.previousX;
    }

    setPreviousX(x){
        this.previousX=x;
    }

    getPreviousY(){
        return this.previousY;
    }

    setPreviousY(y){
        this.previousY=y;
    }

    setPosition(x,y){
        this.setPosX(x);
        this.setPosY(y);
    }

    /* draw(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();

        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = this.borderWidth;//TODO usar esto en lugar de "set resaltado" para cambiar la ficha jugada en el tablero
        this.ctx.stroke();

        this.ctx.clip();
        this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        this.ctx.restore();

        this.ctx.closePath();
    } */
    

    setDefaultStyle() {
        this.borderColor = "rgba(0, 0, 0, 0.6)";
        this.borderWidth = 3;
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.fillColor;
    
        // Dibujar el fondo de la ficha
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    
        // Crear una sombra más oscura para el chip
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8';  // Cambiar el valor de opacidad
        this.ctx.shadowBlur = 8;  // Aumentar la intensidad de la sombra
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
    
        // Dibujar el chip con un gradiente para dar una sensación de profundidad
        let gradient = this.ctx.createRadialGradient(
            this.posX - this.radius, this.posY - this.radius, 0,
            this.posX, this.posY, this.radius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');  // Color de fondo con sombra
    
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.stroke();
    
        this.ctx.clip();
        this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
    
        this.ctx.restore();
        this.ctx.closePath();
    }
    
    
}