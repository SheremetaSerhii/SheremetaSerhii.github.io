"use strict"

import { MovableElement } from "./element.js";
import { KEYSTATE_ } from "./input.js";
import { Input } from "./input.js";

let camera = new MovableElement(160, 120, 0, 1);

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

let ctx;
let canvasObj = document.getElementById("mainCanvas");

if (canvasObj.getContext) {
    ctx = canvasObj.getContext("2d");
}
else {
    alert("Your browser does not support canvas.");
}

let playerInput = new Input(50);

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
    //console.log(currentKeyState);
    // camera.turnRight(1);
    // camera.moveForward();
    //ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);
    let x, y;
    [x, y] = camera.getPosition();
    ctx.save();
    ctx.translate(x + 8, y + 8);
    ctx.rotate((Math.PI / 180) * camera.getAngle());
    ctx.translate(-x - 8, -y - 8);
    ctx.drawImage(imagesArr[IMG_ARROW], x, y);
    ctx.restore();
}

setInterval(draw, 10);