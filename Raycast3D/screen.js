"use strict"

export class Screen {

    _surface = undefined;
    _surfaceContext = undefined;
    _buffer = undefined;
    _bufferContext = undefined;

    constructor(canvasObj) {

        // context.webkitImageSmoothingEnabled = false;
        // context.mozImageSmoothingEnabled = false;
        // context.imageSmoothingEnabled = false;
        if (canvasObj.getContext) {
            this._surface = canvasObj;
            this._surfaceContext = canvasObj.getContext("2d");
            this._surfaceContext.imageSmoothingEnabled = false;
        }
        else {
            alert("Your browser does not support canvas.");
        }

        this._buffer = document.createElement("canvas");
        this._buffer.width = 320;
        this._buffer.height = 240;
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
        this._bufferContext.fillRect(0, 0, 320, 240);
    }

    drawRotatedImage(image, x, y, angle) {
        let tX = x + Math.floor(image.width / 2);
        let tY = y + Math.floor(image.height / 2);
        this._bufferContext.save();
        this._bufferContext.translate(tX, tY);
        this._bufferContext.rotate((Math.PI / 180) * angle);
        this._bufferContext.translate(-tX, -tY);
        this._bufferContext.drawImage(image, x, y);
        this._bufferContext.restore();
    }

    drawLineFromTextureInPosition(texture, lineLength, srcPos, dstPos, fade) {
        let topOffset = Math.floor((240 - lineLength) / 2);
        if (fade < 100) {
            this._bufferContext.drawImage(texture, srcPos, 0, 1, texture.height, dstPos, topOffset, 1, Math.floor(lineLength));
        }
        if (fade > 0) {
            if (fade > 100) {
                fade = 100;
            }
            this.fillStyle = "rgb(0,0,0)";
            this._bufferContext.globalAlpha = fade / 100; //Math.floor(fade / 5) / 20;
            this._bufferContext.fillRect(dstPos, topOffset, 1, Math.floor(lineLength));
            this._bufferContext.globalAlpha = 1;
        }
    }

}