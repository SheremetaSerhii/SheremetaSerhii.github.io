"use strict"

import { WALL_SIZE } from "./data.js";
import { LOOK_ } from "./data.js";
import { LEVEL_DATA } from "./data.js";

export class Map {

    _data = {
        textureData: undefined,
        mapData: {
            sizeX: 0,
            sizeY: 0,
            map: undefined
        },
    }

    loadLevel(levelN, textures, camera) {
        this._data.textureData = textures;
        let camPosInc = Math.floor(WALL_SIZE / 2);
        this._data.mapData.sizeX = LEVEL_DATA[levelN].sizeX;
        this._data.mapData.sizeY = LEVEL_DATA[levelN].sizeY;
        this._data.mapData.map = LEVEL_DATA[levelN].map;
        let cameraPosX = (Math.floor(this._data.mapData.sizeX / 2) * WALL_SIZE )+ camPosInc;
        let cameraPosY = (Math.floor(this._data.mapData.sizeY / 2) * WALL_SIZE) + camPosInc;
        let startPosEarned = false;
        for (let y = 0; y < this._data.mapData.sizeY; y++) {
            for (let x = 0; x < this._data.mapData.sizeX; x++) {
                if (this._data.mapData.map[y][x] == 10000) {
                    cameraPosX = (x * WALL_SIZE) + camPosInc;
                    cameraPosY = (y * WALL_SIZE) + camPosInc;
                    startPosEarned = true;
                    break;
                }
            }
            if (startPosEarned) {
                break;
            }
        }
        let cameraAngle = 0;
        switch (LEVEL_DATA[levelN].startLook) {
            case LOOK_.LEFT:
                cameraAngle = 270;
                break;
            case LOOK_.UP:
                cameraAngle = 0;
                break;
            case LOOK_.RIGHT:
                cameraAngle = 90;
                break;
            case LOOK_.DOWN:
                cameraAngle = 180;
                break;
        }
        camera.setCameraPosition(cameraPosX, cameraPosY, cameraAngle);
    }

    getMapData() {
        return this._data;
    }

}