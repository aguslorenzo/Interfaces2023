"use strict";
class Game {

    constructor(player1, player2, board, rounds,width,height,background,img1,img2,context){
        this.player1=player1;
        this.player2=player2;
        this.board=board;
        this.rounds=rounds;
        this.width=width;
        this.height=height;
        this.background=background;
        this.ctx=context;
        this.currentTurn=player1;
        this.winner=null;
        this.img1=img1;
        this.img2=img2;
        this.deal(img1,img2);

        // Definir el tiempo inicial (en segundos)
        this.initialTime = 300; // 5 minutos
        this.currentTime = this.initialTime;

        // Obtener una referencia al elemento del temporizador
        this.countdownTimer = document.querySelector("#countdown-timer");
        this.countdownTimer.style.display="block";
        this.countdownTimer.style.left= (this.width+25)+"px";
        // Iniciar el temporizador
        this.startTimer();

        this.playersTurn = document.querySelector("#players-turn");
        this.playersTurn.style.display="block";
        this.playersTurn.style.left=(this.width-244)+"px"
    }

    deal(img1,img2){
        let borderWidth = 2;
        let borderColor = "#976600";
        this.player1.emptyChips();
        this.player2.emptyChips();
        for(let i=0;i<this.rounds;i++){
            let chip1 = new Chip(this.board.getWidth()+125, this.height-(10*(i+1))-60, 40, img1,"#BDE34D", ctx, borderColor, borderWidth);
            this.player1.addChip(chip1);
        }
        for(let i=0;i<this.rounds;i++){
            let chip2 = new Chip(this.board.getWidth()+225, this.height-(10*(i+1))-60, 40, img2,"#19ADED", ctx, borderColor, borderWidth);
            this.player2.addChip(chip2);
        }
    }

    checkTurn(chip){
        if(chip.getImg()===game.currentTurn.getChips()[0].getImg()){
            return true;
        }
        else{
            return false;
        };
    }

    changeTurn(){
        if(this.winner==null){
            this.playersTurn.style.display="block";
            if(this.currentTurn==this.player1){
                this.player1.useChip();
                this.currentTurn= this.player2;
            }
            else{
                this.player2.useChip();
                this.currentTurn= this.player1;
            }
            this.playersTurn.innerHTML="Turno: "+this.currentTurn.getUsername();
        }       
    }

    checkPlay(droppedChip){
        let validX=droppedChip.getPosX()>0 && droppedChip.getPosX()<this.board.getWidth();
        let validY=droppedChip.getPosY()>0 && droppedChip.getPosY()<(this.height-this.board.getHeight());
        if(validX&&validY&&this.winner==null){
            let firstRow=this.board.getRow(0);
            for(let i=0;i<firstRow.length;i++){
                let cellEnd = firstRow[i].getPosX()+firstRow[i].getWidth();
                if(droppedChip.getPosX()<cellEnd){
                    let value= this.board.placeChip(droppedChip,i);
                    if(value!=-1){
                        if(value==1){
                            this.winner=this.currentTurn;
                        }
                        this.changeTurn();
                        this.draw();
                        return true;
                    }
                    else{
                        droppedChip.setPosX(droppedChip.getPreviousX());
                        droppedChip.setPosY(droppedChip.getPreviousY());
                        this.draw();
                        return false;
                    }
                }
            }
        }
        else{
            droppedChip.setPosX(droppedChip.getPreviousX());
            droppedChip.setPosY(droppedChip.getPreviousY());
            this.draw();
            return false;
        }
    }


    draw(currentChip){
        clearCanvas();
        this.ctx.fillStyle='#19ADED';
        this.ctx.fillRect(0,0,this.board.getWidth(),this.board.getHeight());
        this.ctx.fill();
        this.drawIndicator();
        this.board.draw();
        this.ctx.drawImage(this.background, this.board.width,0);

        for(let i=0;i<this.player1.getChips().length;i++){
            let chip = this.player1.getChips()[i];
            chip.setFillColor("#BDE34D");
            chip.draw();
        }

        for(let i=0;i<this.player2.getChips().length;i++){
            let chip = this.player2.getChips()[i];
            chip.setFillColor("#BDE3FF");
            chip.draw();
        }

        if(currentChip!=null){
            currentChip.draw();
        }
        if(this.winner!=null){
            this.drawWinnerMessage();
        }
    }
    
    drawIndicator(){
        let firstRow = this.board.getRow(0);
        let arrow = document.querySelector("#arrow-down");
        for(let i=0;i<firstRow.length;i++){
            let cell= firstRow[i];
            let posX= cell.getPosX()+cell.getWidth()/2-arrow.width/2;
            this.ctx.drawImage(arrow,posX,50);
        }
    }

    drawWinnerMessage() {
        let victoryDiv = document.querySelector("#victory-screen");
        victoryDiv.style.display="block";
        let status = document.querySelector("#game-result");
        status.innerHTML="Ganaste!"
        let winnerP = document.querySelector("#winner");
        winnerP.innerHTML=winnerP.innerHTML+this.winner.getUsername()+"!";
        victoryDiv.style.top=this.height/2+"px";
        victoryDiv.style.left=this.width/2+"px";
    }

    drawTie(){
        let victoryDiv = document.querySelector("#victory-screen");
        victoryDiv.style.display="block";
        let gameResult = document.querySelector("#game-result");
        gameResult.innerHTML = "Empate";
        let winnerP = document.querySelector("#winner");
        winnerP.innerHTML="";
/*         let timeP = document.querySelector("#time-elapsed");
        timeP.innerHTML = "Se acabó el timepo"; */
        victoryDiv.style.top=this.height/2+"px";
        victoryDiv.style.left=this.width/2+"px";
    }
   

    startTimer() {
        // Llama a updateTimer inicialmente para que el temporizador se muestre de inmediato.
        this.updateTimer();

        // Llama a updateTimer cada segundo para mantener el contador actualizado.
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        if (this.winner) {
            // Detén el temporizador si hay un ganador.
            clearInterval(this.timerInterval);
            return;
        }

        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        this.countdownTimer.textContent = formattedTime;

        if (this.currentTime === 0) {
            this.drawTie();
        }

        if (this.currentTime > 0) {
            this.currentTime--;
        }
    }

    reset(){
        this.winner=null;
        this.deal(this.img1,this.img2);
        this.board.initialize();
        this.draw();
        this.currentTime=this.initialTime;
        this.startTimer();
    }
}