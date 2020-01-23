"use strict"

/*import { MovableElement } from "./element.js";

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
}*/

let ctx;
let canvasObj = document.getElementById("mainCanvas");

if (canvasObj.getContext) {
    ctx = canvasObj.getContext("2d");
}
else {
    alert("Your browser does not support canvas.");
}

let img = new Image();
img.src = 'res/wall01.png';
/*imagesArr[IMG_ARROW]*/
ctx.drawImage(img, 0, 0);

// ctx.fillStyle = "rgb(47,47,47)";
// ctx.fillRect(0, 0, 30, 30);