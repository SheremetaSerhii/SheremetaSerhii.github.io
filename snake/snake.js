const
    RIGHT = 0,
    DOWN = 1,
    LEFT = 2,
    UP = 3;
const
    GAME_SNAKE_ALIVE = 0;
GAME_SNAKE_DEAD = 1;
GAME_TRANSITION1 = 2;
GAME_TRANSITION2 = 3;
const MORTAL_SNAKE = true;
const SPEED_DIVIDER = 3;
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

    //clear tile
    this.clearTile = function (x, y) {
        screenArr[x][y] = false;
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
    speed: 0,
    steps: 0
};
let frog = {
    pos: [0, 0],
    state: true,
    timer: 0
}
let transition = 0;
let game = GAME_TRANSITION1;
let canReadKey = true;
let gameScreen = new gameScreenClass(document.getElementById("mainCanvas"));
gameScreen.draw();

function drawSnake() {
    gameScreen.clear();
    for (let i = 0; i < snake.segments.length; i++) {
        gameScreen.fillTile(snake.segments[i][0], snake.segments[i][1]);
    }
}

function createSnakeInPosition(pos) {
    snake.segments = [];
    for (let i = 0; i < 3; i++) {
        snake.segments.push([pos[0] + i, pos[1]]);
    }
    snake.direction = RIGHT;
    snake.timer = 0;
    snake.speed = 0;
    snake.steps = 0;
    drawSnake();
}

function keyInput(event) {
    if (canReadKey) {

        if (event.defaultPrevented) {
            return;
        }

        switch (event.code) {
            case "ArrowRight":
                if (snake.direction != LEFT && snake.direction != RIGHT) {
                    snake.direction = RIGHT;
                    canReadKey = false;
                }
                break;
            case "ArrowDown":
                if (snake.direction != UP && snake.direction != DOWN) {
                    snake.direction = DOWN;
                    canReadKey = false;
                }
                break;
            case "ArrowLeft":
                if (snake.direction != LEFT && snake.direction != RIGHT) {
                    snake.direction = LEFT;
                    canReadKey = false;
                }
                break;
            case "ArrowUp":
                if (snake.direction != UP && snake.direction != DOWN) {
                    snake.direction = UP;
                    canReadKey = false;
                }
                break;
        }

    }
}

function moveSnake() {
    if (snake.timer >= 30 - (snake.speed / SPEED_DIVIDER)) {
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
        if (!checkFrogEating(newPos)) {
            if (checkSelfEating(newPos)) {
                return false;
            }
            snake.steps++;
            snake.segments.shift();
            snake.segments.push(newPos);
            canReadKey = true;
        }
    }
    drawSnake();
    snake.timer++;
    return true;
}

function snakeDying() {
    transition++;
    if (transition >= 5) {
        transition = 0;
        if (snake.segments.length > 0) {
            snake.segments.pop();
            drawSnake();
            gameScreen.draw();
        }
        else {
            transition = 0;
            game = GAME_TRANSITION1;
            gameScreen.clear();
        }
    }
}

function gameTransition(t) {
    if (transition < 60) {
        for (let i = 0; i < 10; i++) {
            if (t == GAME_TRANSITION1) {
                gameScreen.fillTile(i, transition / 3);
            }
            else {
                gameScreen.clearTile(i, transition / 3);
            }
        }
        gameScreen.draw();
        transition++;
    }
    else {
        transition = 0;
        if (t == GAME_TRANSITION1) {
            game = GAME_TRANSITION2;
        }
        else {
            startNewGame();
        }

    }
}

function checkFrogEating(pos) {
    if (pos[0] == frog.pos[0] && pos[1] == frog.pos[1]) {
        let newPos = [pos[0], pos[1]];
        snake.segments.push(newPos);
        canReadKey = true;
        updateScore()
        snake.steps = 0;
        drawSnake();
        if (snake.speed < 26 * SPEED_DIVIDER) {
            snake.speed++;
        }
        generateNewFrogPosition();
        return true;
    }
    return false;
}

function checkSelfEating(pos) {
    if (MORTAL_SNAKE) {
        if (gameScreen.getTile(pos[0], pos[1])) {
            transition = 0;
            game = GAME_SNAKE_DEAD;
            return true;
        }
    }
    return false;
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
    switch (game) {
        case GAME_SNAKE_ALIVE:
            if (!moveSnake()) {
                return;
            }
            drawFrog();
            gameScreen.draw();
            break;
        case GAME_SNAKE_DEAD:
            snakeDying();
            break;
        case GAME_TRANSITION1:
        case GAME_TRANSITION2:
            gameTransition(game);
            break;
    }
}

function updateScore() {
    let stepsBonus = 46 - snake.steps - (Math.floor(snake.steps / 3) * 2) - (Math.floor(snake.steps / 10) * 3) - (Math.floor(snake.steps / 15) * 4);
    if (stepsBonus < 0) {
        stepsBonus = 0;
    }
    let bonus = stepsBonus + Math.floor(snake.speed / 2.5) + 3;
    //console.log(snake.steps, stepsBonus, bonus);
    scoreVal += bonus;
    if (hiScoreVal < scoreVal) {
        hiScoreVal = scoreVal;
    }
    scoreObj.innerText = scoreVal;
    hiScoreObj.innerText = hiScoreVal;
}

function startNewGame() {
    game = GAME_SNAKE_ALIVE;
    scoreVal = 0;
    scoreObj.innerText = scoreVal;
    createSnakeInPosition([3, 9]);
    generateNewFrogPosition();
    gameScreen.draw();
}

document.addEventListener("keydown", keyInput, false);
//startNewGame();
setInterval(gameUpdate, 10);