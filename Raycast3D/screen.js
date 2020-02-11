"use strict"

import { RESOLUTION_ } from "./data.js";
import { RADIAN_MOD } from "./data.js";

export let resolution = undefined;

export function disableImageSmoothing(ctx) {
    ctx.oImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
}

export class Screen {

    _surface = undefined;
    _surfaceContext = undefined;
    _buffer = undefined;
    _bufferContext = undefined;
    _backgroundBuffer = undefined;
    _backgroundBufferContext = undefined;
    _resolution = undefined;

    constructor(canvasObj) {
        if (canvasObj.getContext) {
            this._surface = canvasObj;
            this._surfaceContext = canvasObj.getContext("2d", { alpha: false });
            disableImageSmoothing(this._surfaceContext);
        }
        else {
            alert("Your browser does not support canvas.");
        }

        this._resolution = {
            x: RESOLUTION_.X,
            y: RESOLUTION_.Y
        }
        resolution = this._resolution;
        this._buffer = document.createElement("canvas");
        this._buffer.width = this._resolution.x;
        this._buffer.height = this._resolution.y;
        this._bufferContext = this._buffer.getContext("2d");
        // this._bufferContext.alpha = false;
        disableImageSmoothing(this._bufferContext);
        this._backgroundBuffer = document.createElement("canvas");
        this._backgroundBuffer.width = this._resolution.x;
        this._backgroundBuffer.height = this._resolution.y;
        this._backgroundBufferContext = this._backgroundBuffer.getContext("2d");
        this._backgroundBufferContext.alpha = false;
        disableImageSmoothing(this._backgroundBufferContext);
    }

    drawScreen() {
        // this._surfaceContext.drawImage(this._buffer, 0, 0, this._surface.width, this._surface.height);
        this._backgroundBufferContext.drawImage(this._buffer, 0, 0);
        this._surfaceContext.drawImage(this._backgroundBuffer, 0, 0, this._surface.width, this._surface.height);
    }

    drawToBackgroundBuffer(src) {
        this._backgroundBufferContext.putImageData(src, 0, 0);
    }

    // getScreenBuffer() {
    //     return this._bufferContext;
    // }

    fillBlack() {
        this._bufferContext.fillStyle = "rgb(0,0,0)";
        this._bufferContext.fillRect(0, 0, this._resolution.x, this._resolution.y);
    }

    clearBuffer() {
        this._bufferContext.clearRect(0, 0, this._resolution.x, this._resolution.y);
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

    drawLineFromTextureInPosition(texture, lineLength, srcPos, dstPos, fadeValue, fadeColor) {
        let roundedLineLen = Math.floor(lineLength);
        let topOffset = Math.floor((this._resolution.y - roundedLineLen) / 2);
        if (fadeValue < 1) {
            this._bufferContext.drawImage(texture, srcPos, 0, 1, texture.height, dstPos, topOffset, 1, roundedLineLen);
        }
        this._bufferContext.fillStyle = fadeColor;
        this._bufferContext.globalAlpha = fadeValue;
        this._bufferContext.fillRect(dstPos, topOffset, 1, roundedLineLen);
        this._bufferContext.globalAlpha = 1;
    }

}