"use strict"

class Board {

    constructor(rows, columns, posX, posY, width, height, background,context){
        this.rows=rows;
        this.columns=columns;
        this.matrix = [];
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.width = width;
        this.ctx = context;
        this.background=background;
        this.minToWin=rows-2;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getColumns(){
        return this.columns;
    }

    getRow(row){
        if (row<this.rows){
            return this.matrix[row];
        }
    }

    initialize(){
        this.ctx.drawImage(this.background, this.posX,this.posY);
        let gap = this.width*0.01;
        let cellWidth = (this.width-(this.columns-1)*gap)/(this.columns);
        let cellHeight = (this.height-(this.rows-1)*gap)/(this.rows);
        for (var i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for (var j = 0; j < this.columns; j++) {
                let x = j * (cellWidth + gap)+this.posX;
                let y = i * (cellHeight + gap)+this.posY;
                let cell = new Cell(x, y, cellWidth, cellHeight, 'transparent', ctx);
                this.matrix[i][j] = cell;
                cell.draw();
            }
          }
    }

    /* draw(){
        this.ctx.drawImage(this.background, this.posX, this.posY);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                if(this.matrix[i][j].getChip()!=null){
                    this.matrix[i][j].getChip().draw();
                }
                else{
                    this.matrix[i][j].draw();
                }
            }
        }
    } */

    draw() {
        this.ctx.save();
    
        // Crear una sombra para el tablero
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8';  // Cambiar el valor de opacidad
        this.ctx.shadowBlur = 8;  // Aumentar la intensidad de la sombra
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
    
        // Dibujar el tablero con un gradiente para dar una sensación de profundidad
        let gradient = this.ctx.createLinearGradient(this.posX, this.posY, this.posX, this.posY + this.height);
        gradient.addColorStop(0, '#000000');  // Cambia este color para el fondo
        gradient.addColorStop(1, '#333333');  // Cambia este color para el borde del tablero
    
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    
        // Dibuja la imagen de fondo del tablero
        this.ctx.drawImage(this.background, this.posX, this.posY, this.width, this.height);
    
        // Dibuja las celdas con el color del tablero
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                if (this.matrix[i][j].getChip() != null) {
                    this.matrix[i][j].getChip().draw();
                } else {
                    this.matrix[i][j].draw();
                }
            }
        }
    
        this.ctx.restore();
    }    

    restore(){
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                if(this.matrix[i][j].getChip()!=null){
                    this.matrix[i][j].getChip().setDefaultStyle();
                }
                else{
                    this.matrix[i][j].draw();
                }
            }
        }
    }

    placeChip(chip,column){
        for(let i=this.rows-1;i>=0;i--){
            if(this.matrix[i][column].getChip()==null){
                chip.setDefaultStyle();
                this.matrix[i][column].setChip(chip);
                if(this.check(i,column,chip)){
                    return 1;
                }
                else{
                    return 0
                }
            }
        }
        return -1; //NOTA: si ya está llena la columna
    }

    check(row, column, chip) {
        if(this.checkHorizontal(row,column,chip)>=this.minToWin){
            return true;
        }
        else{
            this.restore();
            if(this.checkVertical(row,column,chip)>=this.minToWin){
                return true;
            }
            else{
                this.restore();
                if(this.checkDiagonal(row,column,chip)>=this.minToWin){
                   return true;
                }
                else{
                    this.restore();
                }
            }
        }
        return false;
    }
    
    checkHorizontal(row,column,chip){
        let count = 1;
        chip.setResaltado('red');
        // Comprueba hacia la derecha
        let i = column + 1;
        while (i < this.columns) {
            let current = this.matrix[row][i].getChip();
            if (current === null || current.getImg() !== chip.getImg()) {
                break;
            }
            this.matrix[row][i].getChip().setResaltado('red');
            count++;
            i++;
        }
    
        // Comprueba hacia la izquierda
        i = column - 1;
        while (i >= 0) {
            let current = this.matrix[row][i].getChip();
            if (current === null || current.getImg() !== chip.getImg()) {
                break;
            }
            this.matrix[row][i].getChip().setResaltado('red');
            count++;
            i--;
        }
        return count;
    }

    checkVertical(row,column,chip){
        let count = 1;
        chip.setResaltado('red');
        // Comprueba hacia abajo
        let i = row + 1;
        while (i < this.rows) {
            let current = this.matrix[i][column].getChip();
            if (current === null || current.getImg() !== chip.getImg()) {
                break;
            }
            this.matrix[i][column].getChip().setResaltado('red');
            count++;
            i++;
        }
        // Hacia arriba no comprobamos porque esta siempre vacio.
        return count;
    }

    checkDiagonal(row,column,chip){
        let count= 1;
        chip.setResaltado('red');
        let i=row+1;
        let j=column+1;

        while(i<this.rows && j<this.columns){
            let current = this.matrix[i][j].getChip();
            if (current === null || current.getImg() !== chip.getImg()){ //TODO implementar equals en chip.
                break;
            }
            this.matrix[i][j].getChip().setResaltado('red');
            count++;
            i++;
            j++;
        }

        i=row-1;
        j=column-1;
        while(i>0 && j>0){
            let current = this.matrix[i][j].getChip();
            if (current === null || current.getImg() !== chip.getImg()){ //TODO implementar equals en chip.
                break;
            }
            this.matrix[i][j].getChip().setResaltado('red');
            count++;
            i--;
            j--;
        }

        if(count>=this.minToWin){
            return count;
        }

        count=1;
        i=row-1;
        j=column+1;
        while(i>0 && j<this.columns){
            let current = this.matrix[i][j].getChip();
            if (current === null || current.getImg() !== chip.getImg()){ //TODO implementar equals en chip.
                break;
            }
            this.matrix[i][j].getChip().setResaltado('red');
            count++;
            i--;
            j++;
        }

        i=row+1;
        j=column-1;
        while(i<this.rows && j>0){
            let current = this.matrix[i][j].getChip();
            if (current === null || current.getImg() !== chip.getImg()){ //TODO implementar equals en chip.
                break;
            }
            this.matrix[i][j].getChip().setResaltado('red');
            count++;
            i++;
            j--;
        }


        return count;
    }
}