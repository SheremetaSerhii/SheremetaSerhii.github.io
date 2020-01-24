"use strict"

import { MovableElement } from "./element.js";
import { KEYSTATE_ } from "./input.js";
import { Input } from "./input.js";
import { Screen } from "./screen.js";

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
let camera = new MovableElement(160, 120, 0, 1);

function draw() {

    let currentKeyState;
    currentKeyState = playerInput.getKeyState("up");
    if (currentKeyState == KEYSTATE_.DOWN) {
        camera.moveForward();
    }
    currentKeyState = playerInput.getKeyState("down");
    if (currentKeyState == KEYSTATE_.DOWN) {
        camera.moveBack();
    }
    currentKeyState = playerInput.getKeyState("left");
    if (currentKeyState == KEYSTATE_.DOWN) {
        camera.turnLeft(2);
    }
    currentKeyState = playerInput.getKeyState("right");
    if (currentKeyState == KEYSTATE_.DOWN) {
        camera.turnRight(2);
    }

    let x, y;
    [x, y] = camera.getPosition();
    gameScreen.fillBlack();
    for (let i = 0; i < 320; i++) {
        gameScreen.drawLineFromTextureInPosition(imagesArr[IMG_WALL01], 40 + (i % 100) * 2, i % imagesArr[IMG_WALL01].width, i, 100 - (i % 100));
    }
    gameScreen.drawRotatedImage(imagesArr[IMG_ARROW], x, y, camera.getAngle());
    gameScreen.drawScreen();

}

setInterval(draw, 10);