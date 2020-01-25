"use strict"

import { MovableElement } from "./element.js";
import { KEYSTATE_ } from "./input.js";
import { Input } from "./input.js";
import { Screen } from "./screen.js";
import { Camera } from "./camera.js";
import { Map } from "./map.js";

const IMAGE_NAMES = [
    "res/arrow.png",
    "res/wall01.png",
    "res/wall02.png"
];

const
    IMG_ARROW = 0,
    IMG_WALL01 = 1,
    IMG_WALL02 = IMG_WALL01 + 1;

let imagesArr = [];
for (let i = 0; i < IMAGE_NAMES.length; i++) {
    let img = new Image();
    img.src = IMAGE_NAMES[i];
    imagesArr.push(img);
}

let playerInput = new Input(50);
let gameScreen = new Screen(document.getElementById("mainCanvas"));
//let player = new MovableElement(160, 120, 0, 1);

function movement() {

    let currentKeyState;
    currentKeyState = playerInput.getKeyState("up");
    if (currentKeyState == KEYSTATE_.DOWN) {
        player.moveForward();
    }
    currentKeyState = playerInput.getKeyState("down");
    if (currentKeyState == KEYSTATE_.DOWN) {
        player.moveBack();
    }
    currentKeyState = playerInput.getKeyState("left");
    if (currentKeyState == KEYSTATE_.DOWN) {
        player.turnLeft(2);
    }
    currentKeyState = playerInput.getKeyState("right");
    if (currentKeyState == KEYSTATE_.DOWN) {
        player.turnRight(2);
    }

    // let x, y;
    // [x, y] = player.getPosition();
    // gameScreen.fillBlack();
    // let j;
    // for (let i = 0; i < 320; i++) {
    //     j = i < 100 || (i >= 200 && i < 300) ? i % 100 : 100 - (i % 100);
    //     gameScreen.drawLineFromTextureInPosition(imagesArr[IMG_WALL02], 40 + j * 2, i % imagesArr[IMG_WALL01].width, i, 100 - j);
    // }
    // gameScreen.drawRotatedImage(imagesArr[IMG_ARROW], x, y, player.getAngle());
    // gameScreen.drawScreen();

}

//setInterval(draw, 10);

let gameCamera = new Camera(0, 0, 0);
let gameMap = new Map();
gameMap.loadLevel(0, imagesArr, gameCamera);

let player = new MovableElement(19 * 32 + 16, 14 * 32 + 16, 0, 1);
function updateGame() {
    //player.turnRight(2);
    movement();
    gameCamera.setCameraPosition(player._x, player._y, player._angle);
    gameScreen.fillBlack();
    gameCamera.drawSceneToScreen(gameMap.getMapData(), gameScreen);
    gameScreen.drawScreen();
}

setInterval(updateGame, 10);
//setTimeout(updateGame, 1000);