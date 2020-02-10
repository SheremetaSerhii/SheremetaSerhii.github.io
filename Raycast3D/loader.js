"use strict"

import { WALL_SIZE } from "./data.js";
import { LOOK_ } from "./data.js";
import { LEVEL_DATA } from "./data.js";
import { MAP_INDEX_ } from "./data.js";
import { IMG_ } from "./data.js";
import { Player } from "./player.js";

export class Map {

    _data = {
        textureData: undefined,
        mapData: {
            firstWall: 1,
            lastWall: 1,
            sizeX: 0,
            sizeY: 0,
            map: undefined
        },
    }

    loadLevel(levelN, textures, player) {
        let camPosInc = Math.floor(WALL_SIZE / 2);
        this._data.mapData.sizeX = LEVEL_DATA[levelN].sizeX;
        this._data.mapData.sizeY = LEVEL_DATA[levelN].sizeY;
        this._data.mapData.firstWall = 1;
        this._data.mapData.lastWall = LEVEL_DATA[levelN].walls.length;
        this._data.mapData.map = LEVEL_DATA[levelN].map;
        let playerPosX = (Math.floor(this._data.mapData.sizeX / 2) * WALL_SIZE) + camPosInc;
        let playerPosY = (Math.floor(this._data.mapData.sizeY / 2) * WALL_SIZE) + camPosInc;
        let startPosEarned = false;
        for (let y = 0; y < this._data.mapData.sizeY; y++) {
            for (let x = 0; x < this._data.mapData.sizeX; x++) {
                if (this._data.mapData.map[y][x] == MAP_INDEX_.START_PLACE) {
                    playerPosX = (x * WALL_SIZE) + camPosInc;
                    playerPosY = (y * WALL_SIZE) + camPosInc;
                    startPosEarned = true;
                    break;
                }
            }
            if (startPosEarned) {
                break;
            }
        }
        let playerAngle = 0;
        switch (LEVEL_DATA[levelN].startLook) {
            case LOOK_.LEFT:
                playerAngle = 270;
                break;
            case LOOK_.UP:
                playerAngle = 0;
                break;
            case LOOK_.RIGHT:
                playerAngle = 90;
                break;
            case LOOK_.DOWN:
                playerAngle = 180;
                break;
        }
        player.setPosition(playerPosX, playerPosY, playerAngle);
        this._data.textureData = this._getMapTexturesFromTexturesList(levelN, textures);
    }

    getMapData() {
        return this._data;
    }

    getMapSize() {
        return [this._data.mapData.sizeX, this._data.mapData.sizeY];
    }

    getTile(x, y) {
        return this._data.mapData.map[y][x];
    }

    isWall(x, y) {
        let tile = this.getTile(x, y);
        return (tile >= this._data.mapData.firstWall && tile <= this._data.mapData.lastWall);
    }

    getSurface(x, y) {
        return (this.isWall(x, y) ? this._data.textureData[this.getTile(x, y) - 1] : undefined);
    }

    getFloorAndCeiling(x, y) {
        // temporary things here yet:
        let floor, ceiling;
        if (y > 18/*Math.floor(this._data.mapData.sizeY / 2) + 3*/) {
            floor = this._data.textureData[this._data.textureData.length - 2];
            ceiling = this._data.textureData[this._data.textureData.length - 1];
        }
        else {
            floor = this._data.textureData[this._data.textureData.length - 4];
            ceiling = this._data.textureData[this._data.textureData.length - 3];
        }
        return [ceiling, floor];
    }

    _getMapTexturesFromTexturesList(levelN, texturesList) {
        let mapTextures = [];
        for (let i = 0; i < LEVEL_DATA[levelN].walls.length; i++) {
            let textureN = LEVEL_DATA[levelN].walls[i];
            mapTextures.push(texturesList[textureN]);
        }
        return mapTextures;
    }

}

export class Textures {

    _textures = undefined;
    _texturesCounter = 0;
    _totalImagesQuantity = 0;
    _callbackFunction = undefined;

    constructor() {
        this._callbackFunction = () => { };
    }

    loadTextures() {
        this._textures = [];
        this._texturesCounter = 0;
        this._totalImagesQuantity = 0;
        let key;
        for (key in IMG_) {
            this._totalImagesQuantity++;
        }
        for (key in IMG_) {
            let currentImage = new Image();
            currentImage.src = IMG_[key].NAME;
            currentImage.addEventListener("load", this._loadImageEvent.bind(this), false);
            this._textures.push(currentImage);
        }
    }

    _makeCanvasFromImages() {
        this._texturesContext = [];
        this._texturesData = [];
        let canvas, ctx;
        for (let i = 0; i < this._totalImagesQuantity; i++) {
            canvas = document.createElement("canvas");
            canvas.width = this._textures[i].width;
            canvas.height = this._textures[i].height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(this._textures[i], 0, 0);
            this._textures[i] = canvas;
            this._textures[i].ctx = ctx;
            this._textures[i].imageData = ctx.getImageData(0, 0, this._textures[i].width, this._textures[i].height);
        }
    }

    setCallback(callbackFunction) {
        if (typeof callbackFunction === "function") {
            this._callbackFunction = callbackFunction;
        }
        else {
            this._callbackFunction = () => { };
        }
    }

    _loadImageEvent() {
        this._texturesCounter++;
        if (this._texturesCounter >= this._totalImagesQuantity) {
            this._makeCanvasFromImages();
            this._callbackFunction();
        }
    }

    getTexturesList() {
        return this._textures;
    }

}

export class Loader {

    _textures = undefined;
    _map = undefined;
    _player = undefined;
    _startGameLoopFunction = undefined;
    _endGameLoopFunction = undefined;

    loadGame(startLevelN, playerSpeed, playerSize, startGameLoopFunction, endGameLoopFunction) {
        this._startGameLoopFunction = startGameLoopFunction;
        this._endGameLoopFunction = endGameLoopFunction;
        this._textures = new Textures();
        this._map = new Map();
        this._player = new Player(0, 0, 0, playerSpeed, playerSize, this._map);
        this._textures.setCallback(() => { this.loadLevel(startLevelN); this._startGameLoopFunction(); });
        this._textures.loadTextures();
        // this.loadLevel(startLevelN);
        return [this._textures, this._map, this._player];
    }

    loadLevel(levelN) {
        this._map.loadLevel(levelN, this._textures.getTexturesList(), this._player);
        return this._map;
    }

}