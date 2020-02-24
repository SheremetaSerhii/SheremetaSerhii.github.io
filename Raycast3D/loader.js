"use strict"

import { WALL_SIZE } from "./data.js";
import { LOOK_ } from "./data.js";
import { LEVEL_DATA } from "./data.js";
import { MAP_INDEX_ } from "./data.js";
import { IMG_ } from "./data.js";
import { HALF_PI } from "./data.js";
import { Player } from "./player.js";
import { MAP_NAMES } from "./data.js";
import { LIGHTMAP_TILE_SIZE } from "./data.js";
import { START_PLACE } from "./data.js";

const LIGHT_MAP_SIZE_MOD = LIGHTMAP_TILE_SIZE / WALL_SIZE;

export class LightMap {

    _map = undefined;
    _sizeX = 0;
    _sizeY = 0;
    _lightSources = [];
    _closeLightDistance = 0;
    _farLightDistance = 1;
    _totalLightDistance = 1;

    constructor(sizeX, sizeY, lightDistance) {
        this._closeLightDistance = lightDistance[0] * LIGHTMAP_TILE_SIZE;
        this._farLightDistance = lightDistance[1] * LIGHTMAP_TILE_SIZE;
        this._totalLightDistance = this._closeLightDistance + this._farLightDistance;
        this._sizeX = sizeX * LIGHTMAP_TILE_SIZE;
        this._sizeY = sizeY * LIGHTMAP_TILE_SIZE;
        this._map = new Array(this._sizeX);
        for (let x = 0; x < this._sizeX; x++) {
            this._map[x] = new Float64Array(this._sizeY);
            this._map[x].fill(1);
        }
    }

    addLightSource(x, y, d) {
        let lsX = (x * LIGHTMAP_TILE_SIZE) + (LIGHTMAP_TILE_SIZE >>> 1) - 1,
            lsY = (y * LIGHTMAP_TILE_SIZE) + (LIGHTMAP_TILE_SIZE >>> 1) - 1,
            lsD = ((d * this._farLightDistance) / 200);
        let lightSource = { x: lsX, y: lsY, distance: lsD };
        this._lightSources.push(lightSource);
    }

    calculateLightmap() {
        let i = 0;
        while (i < this._lightSources.length) {
            let fade;
            let totalDistance = Math.ceil(this._lightSources[i].distance + this._closeLightDistance);
            let top = this._lightSources[i].y - totalDistance,
                bottom = this._lightSources[i].y + totalDistance,
                left = this._lightSources[i].x - totalDistance,
                right = this._lightSources[i].x + totalDistance,
                srcX = this._lightSources[i].x + 0.5,
                srcY = this._lightSources[i].y + 0.5;
            top = top < 0 ? 0 : top;
            bottom = bottom >= this._sizeY ? this._sizeY - 1 : bottom;
            left = left < 0 ? 0 : left;
            right = right >= this._sizeX ? this._sizeX - 1 : right;
            for (let y = top; y <= bottom; y++) {
                let h = srcY - y;
                let sqrH = h * h;
                for (let x = left; x <= right; x++) {
                    let w = srcX - x;
                    let distToSrc = Math.sqrt((w * w) + sqrH);
                    if (distToSrc <= this._closeLightDistance) {
                        fade = 0;
                    }
                    else {
                        if (distToSrc >= totalDistance) {
                            fade = 1;
                        }
                        else {
                            fade = (distToSrc - this._closeLightDistance) / this._lightSources[i].distance;
                        }
                    }
                    this._map[x][y] = Math.min(this._map[x][y], fade);
                }
            }
            i++;
        }
        this._lightSources.length = 0;
    }

    getLightValue(x, y) {
        return this._map[Math.floor(x * LIGHT_MAP_SIZE_MOD)][Math.floor(y * LIGHT_MAP_SIZE_MOD)];
    }

}

export class Map {

    _data = {
        textureData: undefined,
        mapData: {
            fade: {
                color: { r: 0, g: 0, b: 0, str: "rgb(0,0,0)" },
                dist: { close: 0, far: 1, total: 1, multiplier: 1 }
            },
            firstWall: 1,
            lastWall: 1,
            sizeX: 0,
            sizeY: 0,
            map: undefined,
            floorMap: undefined,
            ceilingMap: undefined,
            lightMap: undefined
        }
    }

    _mapBitmaps = undefined;
    _levelData = undefined;
    // _mapTextureData = undefined;

    setLevelData(levelData) {
        this._levelData = levelData;
    }

    setMapBitmaps(mapBitmaps) {
        this._mapBitmaps = mapBitmaps;
    }

    _setPlayerPosition(player, x, y, mapLevelData) {
        let playerAngle = 0;
        switch (mapLevelData.startLook) {
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
        let camPosInc = Math.floor(WALL_SIZE / 2);
        let playerPosX = (x * WALL_SIZE) + camPosInc;
        let playerPosY = (y * WALL_SIZE) + camPosInc;
        player.setPosition(playerPosX, playerPosY, playerAngle);
    }

    loadLevel(levelN, textures, player) {
        // let mapTextureData = this._mapBitmaps[levelN].imageData.data;
        this._data.mapData.fade.color.r = this._levelData[levelN].fadeColor[0];
        this._data.mapData.fade.color.g = this._levelData[levelN].fadeColor[1];
        this._data.mapData.fade.color.b = this._levelData[levelN].fadeColor[2];
        this._data.mapData.fade.color.str = "rgb(" + this._levelData[levelN].fadeColor.join(",") + ")";
        this._data.mapData.fade.dist.close = WALL_SIZE * this._levelData[levelN].fadeDistance[0];
        this._data.mapData.fade.dist.far = WALL_SIZE * this._levelData[levelN].fadeDistance[1];
        this._data.mapData.fade.dist.total = this._data.mapData.fade.dist.close + this._data.mapData.fade.dist.far;
        this._data.mapData.fade.dist.multiplier = HALF_PI / this._data.mapData.fade.dist.far;
        // let camPosInc = Math.floor(WALL_SIZE / 2);
        this._data.mapData.sizeX = this._levelData[levelN].sizeX;
        this._data.mapData.sizeY = this._levelData[levelN].sizeY;
        this._data.mapData.firstWall = 1;
        this._data.mapData.lastWall = this._levelData[levelN].walls.length;
        // this._data.mapData.map = this._levelData[levelN].map;
        this._setPlayerPosition(player, Math.floor(this._data.mapData.sizeX / 2), Math.floor(this._data.mapData.sizeY / 2), this._levelData[levelN]);
        [this._data.mapData.map, this._data.mapData.floorMap, this._data.mapData.ceilingMap, this._data.mapData.lightMap] =
            this._makeMapFromImageData(this._mapBitmaps[levelN].imageData.data, this._levelData[levelN], this._mapBitmaps[levelN].imageData.width, player);
        // this._data.mapData.lightMap = new LightMap(this._data.mapData.sizeX, this._data.mapData.sizeY, this._levelData[levelN].mapLightDistance);
        /*let startPosEarned = false;
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
        }*/
        // player.setPosition(playerPosX, playerPosY, playerAngle);
        this._data.textureData = this._getMapTexturesFromTexturesList(levelN, textures);
        /*///// temporary things ///////
        this._data.mapData.floorMap = new Array(this._data.mapData.sizeX);
        this._data.mapData.ceilingMap = new Array(this._data.mapData.sizeX);
        for (let x = 0; x < this._data.mapData.sizeX; x++) {
            this._data.mapData.floorMap[x] = new Array(this._data.mapData.sizeY);
            this._data.mapData.ceilingMap[x] = new Array(this._data.mapData.sizeY);
            for (let y = 0; y < this._data.mapData.sizeY; y++) {
                this._data.mapData.floorMap[x][y] = Math.floor(Math.random() * 4) + 4;
                this._data.mapData.ceilingMap[x][y] = Math.floor(Math.random() * 4) + 4;
            }
        }*/
    }

    _makeMapFromImageData(mapImageData, mapLevelData, imgSizeX, player) {
        // up-left part of image data is walls, foes, doors, etc.
        // up-right part of image is light map
        // down-left part of image is floor
        // down-right part of image is ceiling
        let mapData = new Array(mapLevelData.sizeX),
            floorData = new Array(mapLevelData.sizeX),
            ceilingData = new Array(mapLevelData.sizeX),
            lightData = new LightMap(mapLevelData.sizeX, mapLevelData.sizeY, mapLevelData.mapLightDistance);
        let camPosInc = Math.floor(WALL_SIZE / 2);
        for (let x = 0; x < mapLevelData.sizeX; x++) {
            mapData[x] = new Array(mapLevelData.sizeY);
            floorData[x] = new Array(mapLevelData.sizeY);
            ceilingData[x] = new Array(mapLevelData.sizeY);
            mapData[x].fill(0);
            floorData[x].fill(0);
            ceilingData[x].fill(0);
            for (let y = 0; y < mapLevelData.sizeY; y++) {
                let x1 = x * 4,
                    y1 = y * imgSizeX * 4,
                    x2 = (x + mapLevelData.sizeX) * 4,
                    y2 = (y + mapLevelData.sizeY) * imgSizeX * 4;
                let mapDataPos = x1 + y1,
                    lightDataPos = x2 + y1, // unused yet
                    flDataPos = x1 + y2,
                    ceDataPos = x2 + y2;
                let r, g, b;
                [r, g, b] = [mapImageData[mapDataPos], mapImageData[mapDataPos + 1], mapImageData[mapDataPos + 2]];
                if (r == START_PLACE.r && g == START_PLACE.g && b == START_PLACE.b) {
                    // playerPosX = (x * WALL_SIZE) + camPosInc;
                    // playerPosY = (y * WALL_SIZE) + camPosInc;
                    this._setPlayerPosition(player, x, y, mapLevelData);
                }
                else {
                    mapData[x][y] = this._getTileDataFromColor(r, g, b, mapLevelData.wall);
                }
                floorData[x][y] = this._getTileDataFromColor(mapImageData[flDataPos], mapImageData[flDataPos + 1], mapImageData[flDataPos + 2], mapLevelData.floor);
                ceilingData[x][y] = this._getTileDataFromColor(mapImageData[ceDataPos], mapImageData[ceDataPos + 1], mapImageData[ceDataPos + 2], mapLevelData.ceiling);
                if (mapImageData[lightDataPos] == 255 && mapImageData[lightDataPos + 2] == 0) {
                    lightData.addLightSource(x, y, mapImageData[lightDataPos + 1]);
                }
            }
        }
        lightData.calculateLightmap();
        return [mapData, floorData, ceilingData, lightData];
    }

    _getTileDataFromColor(r, g, b, dataArray) {
        for (let i = 0; i < dataArray.length; i++) {
            if (r == dataArray[i].r && g == dataArray[i].g && b == dataArray[i].b) {
                return dataArray[i].i;
            }
        }
        return 0;
    }

    getFadeData() {
        return this._data.mapData.fade;
    }

    getMapData() {
        return this._data;
    }

    getMapSize() {
        return [this._data.mapData.sizeX, this._data.mapData.sizeY];
    }

    getTile(x, y) {
        // return this._data.mapData.map[y][x];
        return this._data.mapData.map[x][y];
    }

    isWall(x, y) {
        // let tile = this.getTile(x, y);
        // return (tile >= this._data.mapData.firstWall && tile <= this._data.mapData.lastWall);
        return this.getTile(x, y) != 0;
    }

    getSurface(x, y) {
        return (this.isWall(x, y) ? this._data.textureData[this.getTile(x, y) - 1] : undefined);
    }

    getFloorAndCeiling(x, y) {
        if (x > 0 && y > 0 && x < this._data.mapData.sizeX && y < this._data.mapData.sizeY) {
            let ceiling = this._data.textureData[this._data.mapData.ceilingMap[x][y] - 1];
            let floor = this._data.textureData[this._data.mapData.floorMap[x][y] - 1];
            return [ceiling, floor];
        }
        else {
            return [undefined, undefined]
        }
    }

    _getMapTexturesFromTexturesList(levelN, texturesList) {
        let mapTextures = [];
        for (let i = 0; i < this._levelData[levelN].walls.length; i++) {
            let textureN = this._levelData[levelN].walls[i];
            mapTextures.push(texturesList[textureN]);
        }
        return mapTextures;
    }

    getLightValue(x, y) {
        return this._data.mapData.lightMap.getLightValue(x, y);
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

    loadTexturesFromList(list) {
        this._textures = [];
        this._texturesCounter = 0;
        this._totalImagesQuantity = 0;
        this._totalImagesQuantity = list.length;
        for (let i = 0; i < list.length; i++) {
            let currentImage = new Image();
            currentImage.src = list[i];
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
            this._textures[i].sizeMultiplierX = this._textures[i].width / WALL_SIZE;
            this._textures[i].sizeMultiplierY = this._textures[i].height / WALL_SIZE;
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
    _mapBitmaps = undefined;

    loadGame(startLevelN, playerSpeed, playerTurnSpeed, playerSize, startGameLoopFunction, endGameLoopFunction) {
        this._startGameLoopFunction = startGameLoopFunction;
        this._endGameLoopFunction = endGameLoopFunction;
        this._textures = new Textures();
        this._map = new Map();
        this._map.setLevelData(LEVEL_DATA);
        this._player = new Player(0, 0, 0, playerSpeed, playerTurnSpeed, playerSize, this._map);

        let mapList = MAP_NAMES.map(mapName => "res/maps/" + mapName + "/map.png");
        this._mapBitmaps = new Textures();
        this._mapBitmaps.setCallback(() => { this._loadMapsAndTextures(startLevelN); });
        this._mapBitmaps.loadTexturesFromList(mapList);
        // this._loadTextures(startLevelN);

        // this._textures.setCallback(() => { this.loadLevel(startLevelN); this._startGameLoopFunction(); });
        // this._textures.loadTextures();
        // this.loadLevel(startLevelN);
        return [this._textures, this._map, this._player];
    }

    _loadMapsAndTextures(startLevelN) {
        this._map.setMapBitmaps(this._mapBitmaps.getTexturesList());
        this._textures.setCallback(() => { this.loadLevel(startLevelN); this._startGameLoopFunction(); });
        this._textures.loadTextures();
        this._mapBitmaps = undefined;
    }

    loadLevel(levelN) {
        this._map.loadLevel(levelN, this._textures.getTexturesList(), this._player);
        return this._map;
    }

}