let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let boardWidth = 800;
let boardHeigth = 600;

let background = new Image();
background.src = './images/gameboard3.png';

let gameBackground = new Image();
gameBackground.src = './images/lateralbackground.png';

let player1 = new Player("Jugador 1");
let player2 = new Player("Jugador 2");

let isMouseDown = false;
let lastClickedChip = null;
let board = "";
let game = "";

setVariables();

function setVariables() {
    const checkboxesPlayer1 = document.querySelectorAll('.character-selection-p1 .checkbox');
    const checkboxesPlayer2 = document.querySelectorAll('.character-selection-p2 .checkbox');
    checkboxesPlayer1.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            checkboxesPlayer1.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
            disableCheckboxesForPlayer2(this.id);
        });
    });

    checkboxesPlayer2.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            checkboxesPlayer2.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
            disableCheckboxesForPlayer1(this.id);
        });
    });
}

function disableCheckboxesForPlayer2(checkboxId) {
    const checkboxesPlayer2 = document.querySelectorAll('.character-selection-p2 .checkbox');
    checkboxesPlayer2.forEach(checkbox => {
        if (checkbox.id === checkboxId) {
            checkbox.disabled = true;
        } else {
            checkbox.disabled = false;
        }
    });
}

function disableCheckboxesForPlayer1(checkboxId) {
    const checkboxesPlayer1 = document.querySelectorAll('.character-selection-p1 .checkbox');
    checkboxesPlayer1.forEach(checkbox => {
        if (checkbox.id === checkboxId) {
            checkbox.disabled = true;
        } else {
            checkbox.disabled = false;
        }
    });
}

let replayButton = document.querySelector("#play-again");
replayButton.addEventListener("click", function () {
    let victoryDiv = document.querySelector("#victory-screen");
    let winner = document.querySelector("#winner");
    winner.innerHTML= "¡Felicidades ";
    victoryDiv.style.display = "none";
    game.reset();
})

let landingButton = document.querySelector("#landing");
landingButton.addEventListener("click", function () {
    location.reload();
})

/**
 * Esto captura el click en el boton de la pantalla inicial de seleccion de personajes, y completa las variables
 * del tablero y fichas conforme haya sido seleccionado
 * */
let playButton = document.querySelector("#play");
playButton.addEventListener("click", function () {
    let connectAmmount = document.querySelector("#game-type");

    let rows = parseInt(connectAmmount.value) + 2;
    let columns = parseInt(connectAmmount.value) + 3;
    let bothSelected = 0;

    board = new Board(rows, columns, 0, canvasHeight - boardHeigth, boardWidth, boardHeigth, background, ctx);
    board.initialize();

    const checkboxesPlayer1 = document.querySelectorAll('.character-selection-p1 .checkbox');
    let img1 = ""; // Variable para almacenar la imagen seleccionada por el jugador 1

    checkboxesPlayer1.forEach(checkbox => {
        if (checkbox.checked) {
            let value = document.querySelector("#" + checkbox.id + "-img");
            img1 = value; // Almacena la imagen seleccionada por el jugador 1
            bothSelected += 1;
        }
    });

    const checkboxesPlayer2 = document.querySelectorAll('.character-selection-p2 .checkbox');
    let img2 = ""; // Variable para almacenar la imagen seleccionada por el jugador 2

    checkboxesPlayer2.forEach(checkbox => {
        if (checkbox.checked) {
            //juego de id's para asociar la imagen seleccionada al checkbox que haya sido clickeado ultimo
            let value = document.querySelector("#" + checkbox.id + "-img");
            img2 = value; // Almacena la imagen seleccionada por el jugador 2
            bothSelected += 1;
        }
    });

    let gamePreview = document.querySelector("#game-preview");

    //esta comprobación es para no dejar iniciar el juego si no hay 1 ficha seleccionada por jugador
    if (bothSelected === 2) {
        gamePreview.style.display = "none";
        canvas.style.display = "block";
        game = new Game(player1, player2, board, rows * columns / 2, canvasWidth, canvasHeight, gameBackground, img1, img2, ctx);
        game.draw();
        let timer = document.querySelector("#countdown-timer");
        timer.style.display = "block"
    }
});

function onMouseDown(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    isMouseDown = true;

    if (lastClickedChip != null) {
        lastClickedChip.setResaltado(false);
        lastClickedChip = null;
    }
    let clickFig = findClickedChip(x, y);
    if (clickFig != null) {
        if (game.checkTurn(clickFig)) {
            clickFig.setResaltado("#483100");
            lastClickedChip = clickFig;
            clickFig.setPreviousX(clickFig.getPosX());
            clickFig.setPreviousY(clickFig.getPosY());
            clickFig.draw();
        }

    }
}

function onMouseUp(e) {
    isMouseDown = false;
    if (lastClickedChip != null) {
        if (game.checkPlay(lastClickedChip)) {
            lastClickedChip = null; //NOTA: ya se agregó al tablero, entonces "vacio" ultima, sino: bug
        }
    }
}


function onMouseMove(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    if (isMouseDown && lastClickedChip != null) {
        lastClickedChip.setPosition(x, y);
        game.draw(lastClickedChip);
    }
}

function onMouseLeave(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    if (x < 0 || x > canvasWidth || y < 0 || y > canvasHeight) {
        if (lastClickedChip != null) {
            lastClickedChip.setPosX(lastClickedChip.getPreviousX());
            lastClickedChip.setPosY(lastClickedChip.getPreviousY());
            isMouseDown = false;
            lastClickedChip.setResaltado(false)
            game.draw();
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

let reset = document.querySelector('#reset');
reset.addEventListener("click", function () {
    game.reset();
})


function findClickedChip(x, y) {

    let chips = game.player1.getChips();
    for (let i = chips.length - 1; i >= 0; i--) {
        let chip = chips[i];
        if (chip.isPointInside(x, y)) {
            return chip;
        }
    }
    chips = game.player2.getChips();
    for (let i = chips.length - 1; i >= 0; i--) {
        let chip = chips[i];
        if (chip.isPointInside(x, y)) {
            return chip;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseleave', onMouseLeave, false);