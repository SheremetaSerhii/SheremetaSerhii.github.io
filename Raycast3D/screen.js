"use strict"

import { RESOLUTION_ } from "./data.js";
import { RADIAN_MOD } from "./data.js";

export let resolution = undefined;

export class Screen {

    _surface = undefined;
    _surfaceContext = undefined;
    _buffer = undefined;
    _bufferContext = undefined;
    _resolution = undefined;

    constructor(canvasObj) {

        // context.webkitImageSmoothingEnabled = false;
        // context.mozImageSmoothingEnabled = false;
        // context.imageSmoothingEnabled = false;
        if (canvasObj.getContext) {
            this._surface = canvasObj;
            this._surfaceContext = canvasObj.getContext("2d", { alpha: false });
            this._surfaceContext.imageSmoothingEnabled = false;
        }
        else {
            alert("Your browser does not support canvas.");
        }

        this._buffer = document.createElement("canvas");
        this._resolution = {
            x: RESOLUTION_.X,
            y: RESOLUTION_.Y
        }
        resolution = this._resolution;
        this._buffer.width = this._resolution.x;
        this._buffer.height = this._resolution.y;
        this._bufferContext = this._buffer.getContext("2d");
        this._bufferContext.imageSmoothingEnabled = false;
    }

    drawScreen() {
        this._surfaceContext.drawImage(this._buffer, 0, 0, this._surface.width, this._surface.height);
    }

    // getScreenBuffer() {
    //     return this._bufferContext;
    // }

    fillBlack() {
        this._bufferContext.fillStyle = "rgb(0,0,0)";
        this._bufferContext.fillRect(0, 0, this._resolution.x, this._resolution.y);
    }

    drawRotatedImage(image, x, y, angle) {
        let tX = x + Math.floor(image.width / 2);
        let tY = y + Math.floor(image.height / 2);
        this._bufferContext.save();
        this._bufferContext.translate(tX, tY);
        this._bufferContext.rotate(RADIAN_MOD * angle);
        this._bufferContext.translate(-tX, -tY);
        this._bufferContext.drawImage(image, x, y);
        this._bufferContext.restore();
    }

    drawLineFromTextureInPosition(texture, lineLength, srcPos, dstPos, fade) {
        let roundedLineLen = Math.floor(lineLength);
        let topOffset = Math.floor((this._resolution.y - roundedLineLen) / 2);
        if (fade < 100) {
            this._bufferContext.drawImage(texture, srcPos, 0, 1, texture.height, dstPos, topOffset, 1, roundedLineLen);
            // this._bufferContext.fillStyle = "rgb(255,255,255)";
            // this._bufferContext.fillRect(dstPos, topOffset, 1, roundedLineLen);
        }
        if (fade > 0) {
            if (fade > 100) {
                fade = 100;
            }
            //this._bufferContext.fillStyle = "rgb(10,0,10)";
            this._bufferContext.fillStyle = "rgb(12,0,2)";
            this._bufferContext.globalAlpha = fade / 100; //Math.floor(fade / 5) / 20;
            this._bufferContext.fillRect(dstPos, topOffset, 1, roundedLineLen);
            this._bufferContext.globalAlpha = 1;
        }
    }

}