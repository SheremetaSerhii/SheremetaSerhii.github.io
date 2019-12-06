const
    RIGHT = 0,
    DOWN = 1,
    LEFT = 2,
    UP = 3;
//////////////// SCREEN CLASS ////////////////
function gameScreenClass(canvasObj) {

    // declare inner variables
    const BACKGROUND_COLOR = "rgb(117, 131, 105)";
    const CELL_COLOR = ["rgb(111,123,100)", "rgb(47,47,47)"];
    let screenArr;
    let ctx; //canvas context

    //clear screen array
    this.clear = function () {
        for (let i = 0; i < 10; i++) {
            screenArr[i].fill(false);
        }
    }

    //draw tile
    let drawTile = function (x, y, fill) {
        ctx.fillStyle = CELL_COLOR[fill];
        ctx.fillRect(x, y, 30, 30);
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(x + 4, y + 4, 22, 22);
        ctx.fillStyle = CELL_COLOR[fill];
        ctx.fillRect(x + 7, y + 7, 16, 16);
    }

    //fill tile
    this.fillTile = function (x, y) {
        screenArr[x][y] = true;
    }

    //get tile
    this.getTile = function (x, y) {
        return screenArr[x][y];
    }

    //draw screen
    this.draw = function () {
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                drawTile(4 + x * 32, 4 + y * 32, Number(screenArr[x][y]));
            }
        }
    }

    //do this things during object creation
    screenArr = new Array(10);
    for (let i = 0; i < 10; i++) {
        screenArr[i] = new Array(20);
    }
    this.clear();
    if (canvasObj.getContext) {
        ctx = canvasObj.getContext("2d");
        // temp
        /*for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                screenArr[x][y] = Math.floor(Math.random() * 10) == 0;
            }
        }*/
        // temp
    }
    else {
        alert("Your browser does not support canvas.");
    }

}
////////////////////////////////////////////////

let scoreVal = 0,
    hiScoreVal = 0,
    scoreObj = document.getElementById("score"),
    hiScoreObj = document.getElementById("hiScore");
let snake = {
    segments: [],
    direction: RIGHT,
    timer: 0,
    speed: 26
};
let frog = {
    pos: [0, 0],
    state: true,
    timer: 0
}
let gameScreen = new gameScreenClass(document.getElementById("mainCanvas"));
gameScreen.draw();

function drawSnake() {
    for (let i = 0; i < snake.segments.length; i++) {
        gameScreen.fillTile(snake.segments[i][0], snake.segments[i][1]);
    }
}

function createSnakeInPosition(pos) {
    for (let i = 0; i < 3; i++) {
        snake.segments.push([pos[0] + i, pos[1]]);
    }
    snake.timer = 0;
    snake.speed = 0;
    drawSnake();
}

function keyInput(event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.code) {
        case "ArrowRight":
            if (snake.direction != LEFT) {
                snake.direction = RIGHT;
            }
            break;
        case "ArrowDown":
            if (snake.direction != UP) {
                snake.direction = DOWN;
            }
            break;
        case "ArrowLeft":
            if (snake.direction != RIGHT) {
                snake.direction = LEFT;
            }
            break;
        case "ArrowUp":
            if (snake.direction != DOWN) {
                snake.direction = UP;
            }
            break;
    }
}

function moveSnake() {
    if (snake.timer >= 30 - snake.speed) {
        snake.timer = 0;
        let tempArr = snake.segments[snake.segments.length - 1];
        let newPos = [tempArr[0], tempArr[1]];
        let i = snake.direction & 1;
        let j = 9 + i * 10;
        newPos[i] += snake.direction < LEFT ? 1 : -1;
        if (newPos[i] < 0) {
            newPos[i] = j;
        }
        else if (newPos[i] > j) {
            newPos[i] = 0;
        }
        snake.segments.shift();
        snake.segments.push(newPos);
    }
    drawSnake();
    snake.timer++;
}

function eatFrog(pos) {
    snake.segments.push(pos);
    if (snake.speed < 26) {
        snake.speed++;
    }
    generateNewFrogPosition();
}

function drawFrog() {
    if (frog.timer % 10 == 0) {
        frog.state = !frog.state;
        if (frog.timer == 20) {
            frog.timer = 0;
        }
    }
    if (frog.state) {
        gameScreen.fillTile(frog.pos[0], frog.pos[1]);
    }
    frog.timer++
}

function generateNewFrogPosition() {
    let runCycle = true;
    let newPosX, newPosY;
    while (runCycle) {
        newPosX = Math.floor(Math.random() * 10);
        newPosY = Math.floor(Math.random() * 20);
        runCycle = gameScreen.getTile(newPosX, newPosY);
    }
    frog.pos = [newPosX, newPosY];
    drawFrog();
}

function gameUpdate() {
    gameScreen.clear();
    moveSnake();
    drawFrog();
    gameScreen.draw();
}

createSnakeInPosition([3, 9]);
generateNewFrogPosition();
gameScreen.draw();
document.addEventListener("keydown", keyInput, false);
setInterval(gameUpdate, 10);