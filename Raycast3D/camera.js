"use strict"

import { WALL_SIZE } from "./data.js";
import { RADIAN_MOD } from "./data.js";
import { HALF_PI } from "./data.js";
import { resolution } from "./screen.js";
import { disableImageSmoothing } from "./screen.js";
// import { copyPixel } from "./screen.js";

const HALF_WALL_SIZE = Math.floor(WALL_SIZE / 2);

const
    // CLOSE_LIGHT_DISTANCE = WALL_SIZE * 1,
    // FAR_LIGHT_DISTANCE = WALL_SIZE * 8,
    // FAR_PLUS_CLOSE_LIGHT_DISTANCE = CLOSE_LIGHT_DISTANCE + FAR_LIGHT_DISTANCE,
    // FADE_MULTIPLIER = HALF_PI / FAR_LIGHT_DISTANCE,
    DIRECTION_X = 0,
    DIRECTION_Y = 1;

const
    SIDE_LEFT = 0,
    SIDE_UP = 1,
    SIDE_RIGHT = 2,
    SIDE_DOWN = 3;

export class Camera {

    _width = WALL_SIZE / 2 - 4 * (WALL_SIZE >>> 5);
    _height = 0;
    _fov = 8 * (WALL_SIZE >>> 5);
    _x = 0;
    _y = 0;
    _angle = 0;
    _raySourcePosition = { x: 0, y: 0 };
    _floorAndCeilingCanvas = undefined;
    _floorAndCeilingContext = undefined;
    _floorAndCeilingData = undefined;
    _multiplierToRealSize = 1;

    constructor(x, y, angle) {
        this.setCameraPosition(x, y, angle);
        this._calculateCameraHeight();
        this._resetFloorAndCeilingData();
        this._preliminaryCalculations();
    }

    _calculateCameraHeight() {
        this._height = (resolution.y * this._width) / resolution.x;
        this._multiplierToRealSize = this._height / resolution.y;
    }

    setCameraView(width, fov) {
        this._width = width;
        this._fov = fov;
        this._calculateCameraHeight();
        this._preliminaryCalculations();
    }

    _resetFloorAndCeilingData() {
        this._floorAndCeilingCanvas = document.createElement("canvas");
        // this._floorAndCeilingCanvas.width = 2;
        // this._floorAndCeilingCanvas.height = Math.floor(resolution.y / 2);
        this._floorAndCeilingContext = this._floorAndCeilingCanvas.getContext("2d");
        this._floorAndCeilingContext.alpha = false;
        disableImageSmoothing(this._floorAndCeilingContext);
        // this._floorAndCeilingData = this._floorAndCeilingContext.createImageData(2, Math.floor(resolution.y / 2));
        this._floorAndCeilingData = this._floorAndCeilingContext.createImageData(resolution.x/*1*/, resolution.y);
        this._floorAndCeilingData.data.fill(255);
        // this._floorAndCeilingContext.fillStyle = "rgb(0,50,0)";
        // this._floorAndCeilingContext.fillRect(0, 0, this._floorAndCeilingCanvas.width, this._floorAndCeilingCanvas.height);
    }

    setCameraPosition(x, y, angle) {
        this._x = x;
        this._y = y;
        this._angle = angle % 360;
        //calculation of ray source position:
        let radians = RADIAN_MOD * ((this._angle + 90) % 360);
        this._raySourcePosition.x = this._x + Math.cos(radians) * this._fov;
        this._raySourcePosition.y = this._y + Math.sin(radians) * this._fov;
    }

    _curFade = undefined;

    _calculateFade(distance, scene, x, y) {
        // return distance <= CLOSE_LIGHT_DISTANCE ? 0 : distance >= FAR_PLUS_CLOSE_LIGHT_DISTANCE ? 1 : Math.sin((distance - CLOSE_LIGHT_DISTANCE) * FADE_MULTIPLIER);
        // return distance <= this._curFade.dist.close ? 0 : distance >= this._curFade.dist.total ? 1 : Math.sin((distance - this._curFade.dist.close) * this._curFade.dist.multiplier);
        let a, b;
        a = distance <= this._curFade.dist.close ? 0 : distance >= this._curFade.dist.total ? 1 : Math.sin((distance - this._curFade.dist.close) * this._curFade.dist.multiplier);
        b = scene.getLightValue(x, y);
        return Math.min(a, b);
    }

    drawSceneToScreen(scene, screen) {
        let defaultFadeData = scene.getFadeData();
        this._curFade = defaultFadeData;
        screen.clearBuffer();
        let ray, fade, cameraPointPos;
        for (let i = 0; i < resolution.x; i++) {
            cameraPointPos = this._getCameraPointPos(i);
            ray = this._getRay(scene, cameraPointPos, i);
            if (ray.surface != undefined) {
                if (ray.surfaceHeight < resolution.y) {
                    this._drawFloorAndCeilingLine(scene, ray.surfaceHeight, ray.controlSizeX, ray.controlSizeY, i);
                }
                fade = this._calculateFade(ray.distanceToSurface, scene, ray.x, ray.y);
                screen.drawLineFromTextureInPosition(ray.surface, ray.surfaceHeight, ray.positionOnSurface, i, fade, this._curFade.color.str);
            }
        }
        screen.drawToBackgroundBuffer(this._floorAndCeilingData);
    }

    _preliminaryCalculatedXinc = undefined;
    _preliminaryCalculatedYinc = undefined;
    _prelimCalcSurfaceHeight_Pt1 = undefined;
    _prelimCalcSurfaceHeight_Pt2 = undefined;
    _prelimCalcControlSizeX = undefined;
    _prelimCalcControlSizeY = undefined;
    _floorAndCeilingDstInc = 0;

    _preliminaryCalculations() {
        let radians;
        this._preliminaryCalculatedXinc = new Array(resolution.x);
        this._preliminaryCalculatedYinc = new Array(resolution.x);
        for (let j = 0; j < resolution.x; j++) {
            let cameraPoint = (j * this._width) / resolution.x - (this._width >>> 1);
            this._preliminaryCalculatedXinc[j] = new Array(360);
            this._preliminaryCalculatedYinc[j] = new Array(360);
            for (let i = 0; i < 360; i++) {
                radians = RADIAN_MOD * i;
                this._preliminaryCalculatedXinc[j][i] = Math.cos(radians) * cameraPoint;
                this._preliminaryCalculatedYinc[j][i] = Math.sin(radians) * cameraPoint;
            }
        }
        this._prelimCalcSurfaceHeight_Pt1 = (WALL_SIZE * this._height * resolution.x) / this._width;
        this._prelimCalcSurfaceHeight_Pt2 = this._height / this._fov;
        // control sizes
        this._prelimCalcControlSizeX = new Array(resolution.x);
        this._prelimCalcControlSizeY = new Array(resolution.x);
        this._prelimCalcFloorXinc = new Array(resolution.x);
        this._prelimCalcFloorYinc = new Array(resolution.x);
        this._prelimCalcFloorDistance = new Array(resolution.x);
        let halfResolutionY = Math.floor(resolution.y / 2);
        for (let j = 0; j < resolution.x; j++) {
            this._prelimCalcControlSizeX[j] = new Array(360);
            this._prelimCalcControlSizeY[j] = new Array(360);
            this._prelimCalcFloorXinc[j] = new Array(360);
            this._prelimCalcFloorYinc[j] = new Array(360);
            this._prelimCalcFloorDistance[j] = new Array(360);
            for (let i = 0; i < 360; i++) {
                radians = RADIAN_MOD * (i + 90) % 360;
                let tempSourcePositionX = Math.cos(radians) * this._fov;
                let tempSourcePositionY = Math.sin(radians) * this._fov;
                this._prelimCalcControlSizeX[j][i] = this._preliminaryCalculatedXinc[j][i] - tempSourcePositionX;
                this._prelimCalcControlSizeY[j][i] = this._preliminaryCalculatedYinc[j][i] - tempSourcePositionY;
            }
        }
        this._floorAndCeilingDstInc = this._floorAndCeilingData.width * 4;
    }

    _getCameraPointPos(rayIndex) {
        let cameraPointPos = { x: 0, y: 0 };
        cameraPointPos.x = this._x + this._preliminaryCalculatedXinc[rayIndex][this._angle];
        cameraPointPos.y = this._y + this._preliminaryCalculatedYinc[rayIndex][this._angle];
        return cameraPointPos;
    }

    _getRay(scene, cameraPointPos, rayIndex) {
        let ray = {
            surface: undefined,
            surfaceHeight: 0,
            positionOnSurface: 0,
            distanceToSurface: 0,
            controlSizeX: 0,
            controlSizeY: 0,
            x: 0,
            y: 0
        };
        let rayDstPos = { x: 0, y: 0 };
        let oldRayDstPos = { x: 0, y: 0 };
        [rayDstPos.x, rayDstPos.y] = [cameraPointPos.x, cameraPointPos.y];
        let xInc = cameraPointPos.x >= this._raySourcePosition.x ? WALL_SIZE : -WALL_SIZE;
        let yInc = cameraPointPos.y >= this._raySourcePosition.y ? WALL_SIZE : -WALL_SIZE;
        let rightLimit, bottomLimit;
        [rightLimit, bottomLimit] = scene.getMapSize();
        rightLimit *= WALL_SIZE;
        bottomLimit *= WALL_SIZE;
        ray.controlSizeX = this._prelimCalcControlSizeX[rayIndex][this._angle];
        ray.controlSizeY = this._prelimCalcControlSizeY[rayIndex][this._angle];
        let traceEndingPosition = undefined;
        // ray tracing:
        if (Math.abs(ray.controlSizeX) < Math.abs(ray.controlSizeY)) {
            // go through Y coordinate first:
            if (yInc > 0 && rayDstPos.y % WALL_SIZE > 0) {
                rayDstPos.y += WALL_SIZE;
            }
            rayDstPos.y = Math.floor(rayDstPos.y / WALL_SIZE) * WALL_SIZE;
            rayDstPos.x = this._getEndPosA(ray.controlSizeX, ray.controlSizeY, this._raySourcePosition.x, this._raySourcePosition.y, rayDstPos.y);
            [oldRayDstPos.x, oldRayDstPos.y] = [cameraPointPos.x, cameraPointPos.y];
            while (rayDstPos.x > 0 && rayDstPos.x < rightLimit && rayDstPos.y > 0 && rayDstPos.y < bottomLimit && traceEndingPosition == undefined) {
                traceEndingPosition = this._getTraceEndingPosition(scene, oldRayDstPos.x, oldRayDstPos.y, rayDstPos.x, rayDstPos.y, DIRECTION_Y, ray.controlSizeX, ray.controlSizeY);
                if (traceEndingPosition == undefined) {
                    [oldRayDstPos.x, oldRayDstPos.y] = [rayDstPos.x, rayDstPos.y];
                    rayDstPos.y += yInc;
                    rayDstPos.x = this._getEndPosA(ray.controlSizeX, ray.controlSizeY, this._raySourcePosition.x, this._raySourcePosition.y, rayDstPos.y);
                }
            }
        }
        else {
            // go through X coordinate first:
            if (xInc > 0 && rayDstPos.x % WALL_SIZE > 0) {
                rayDstPos.x += WALL_SIZE;
            }
            rayDstPos.x = Math.floor(rayDstPos.x / WALL_SIZE) * WALL_SIZE;
            rayDstPos.y = this._getEndPosA(ray.controlSizeY, ray.controlSizeX, this._raySourcePosition.y, this._raySourcePosition.x, rayDstPos.x);
            [oldRayDstPos.x, oldRayDstPos.y] = [cameraPointPos.x, cameraPointPos.y];
            while (rayDstPos.x > 0 && rayDstPos.x < rightLimit && rayDstPos.y > 0 && rayDstPos.y < bottomLimit && traceEndingPosition == undefined) {
                traceEndingPosition = this._getTraceEndingPosition(scene, oldRayDstPos.x, oldRayDstPos.y, rayDstPos.x, rayDstPos.y, DIRECTION_X, ray.controlSizeX, ray.controlSizeY);
                if (traceEndingPosition == undefined) {
                    [oldRayDstPos.x, oldRayDstPos.y] = [rayDstPos.x, rayDstPos.y];
                    rayDstPos.x += xInc;
                    rayDstPos.y = this._getEndPosA(ray.controlSizeY, ray.controlSizeX, this._raySourcePosition.y, this._raySourcePosition.x, rayDstPos.x);
                }
            }
        }
        if (traceEndingPosition != undefined) {
            ray.x = traceEndingPosition.sceneX;
            ray.y = traceEndingPosition.sceneY;
            ray.surface = scene.getSurface(traceEndingPosition.tileX, traceEndingPosition.tileY);
            let a = cameraPointPos.x - traceEndingPosition.sceneX;
            let b = cameraPointPos.y - traceEndingPosition.sceneY;
            let dd = Math.sqrt((a * a) + (b * b));
            a = this._raySourcePosition.x - cameraPointPos.x;
            b = this._raySourcePosition.y - cameraPointPos.y;
            let cc = Math.sqrt((a * a) + (b * b));
            let finalDistance = this._fov * dd / cc;
            ray.distanceToSurface = dd;
            //ray.surfaceHeight = (WALL_SIZE * this._fov * (320 / this._width)) / finalDistance;
            //ray.surfaceHeight = (WALL_SIZE * this._height * (resolution.x / this._width)) / (((this._height * finalDistance) / this._fov) + this._fov /*8*/);
            ray.surfaceHeight = this._prelimCalcSurfaceHeight_Pt1 / ((this._prelimCalcSurfaceHeight_Pt2 * finalDistance) + this._fov);
            ray.positionOnSurface = Math.floor(Math.max(traceEndingPosition.sceneX % WALL_SIZE, traceEndingPosition.sceneY % WALL_SIZE));
            if (traceEndingPosition.side == SIDE_UP || traceEndingPosition.side == SIDE_RIGHT) {
                ray.positionOnSurface = WALL_SIZE - ray.positionOnSurface - 1;
            }
            ray.positionOnSurface = Math.floor((ray.positionOnSurface * ray.surface.width) / WALL_SIZE);
        }
        return ray;
    }

    _getEndPosA(controlSizeA, controlSizeB, startPosA, startPosB, endPosB) {
        return ((controlSizeA * (endPosB - startPosB)) / controlSizeB) + startPosA;
        //(rayDstPos.x - this._raySourcePosition.x) / (rayDstPos.y - this._raySourcePosition.y) == controlSizeX / controlSizeY
    }

    _getTraceEndingPosition(scene, startPosX, startPosY, endPosX, endPosY, direction, controlSizeX, controlSizeY) {
        let pos = { sceneX: 0, sceneY: 0, tileX: 0, tileY: 0, side: SIDE_UP };
        let surfaceEarned = false;
        let oldTileX, oldTileY, newTileX, newTileY;
        let xDifference = endPosX - startPosX;
        let yDifference = endPosY - startPosY;
        [oldTileX, oldTileY] = this._getTilePos(startPosX, startPosY, xDifference, yDifference);
        [newTileX, newTileY] = this._getTilePos(endPosX, endPosY, xDifference, yDifference);
        switch (direction) {
            case DIRECTION_X:
                if (oldTileY != newTileY) {
                    if (this._isSurface(scene, oldTileX, newTileY)) {
                        pos.tileX = oldTileX;
                        pos.tileY = newTileY;
                        pos.sceneY = newTileY * WALL_SIZE;
                        if (yDifference >= 0) {
                            pos.side = SIDE_UP;
                        }
                        else {
                            pos.sceneY += WALL_SIZE;
                            pos.side = SIDE_DOWN;
                        }
                        pos.sceneX = this._getEndPosA(controlSizeX, controlSizeY, this._raySourcePosition.x, this._raySourcePosition.y, pos.sceneY);
                        surfaceEarned = true;
                    }
                }
                break;
            case DIRECTION_Y:
                if (oldTileX != newTileX) {
                    if (this._isSurface(scene, newTileX, oldTileY)) {
                        pos.tileX = newTileX;
                        pos.tileY = oldTileY;
                        pos.sceneX = newTileX * WALL_SIZE;
                        if (xDifference >= 0) {
                            pos.side = SIDE_LEFT;
                        }
                        else {
                            pos.sceneX += WALL_SIZE;
                            pos.side = SIDE_RIGHT;
                        }
                        pos.sceneY = this._getEndPosA(controlSizeY, controlSizeX, this._raySourcePosition.y, this._raySourcePosition.x, pos.sceneX);
                        surfaceEarned = true;
                    }
                }
                break;
            default:
                return undefined;
        }
        if (!surfaceEarned && this._isSurface(scene, newTileX, newTileY)) {
            pos.tileX = newTileX;
            pos.tileY = newTileY;
            pos.sceneX = endPosX;
            pos.sceneY = endPosY;
            if (direction == DIRECTION_X) {
                pos.side = xDifference >= 0 ? SIDE_LEFT : SIDE_RIGHT;
            }
            else {
                pos.side = yDifference >= 0 ? SIDE_UP : SIDE_DOWN;
            }
            surfaceEarned = true;
        }
        return (surfaceEarned ? pos : undefined);
    }

    _getTilePos(x, y, xDifference, yDifference) {
        let resultX = Math.floor(x / WALL_SIZE);
        let resultY = Math.floor(y / WALL_SIZE);
        if (xDifference < 0 && x % WALL_SIZE == 0) {
            resultX--;
        }
        if (yDifference < 0 && y % WALL_SIZE == 0) {
            resultY--;
        }
        return [resultX, resultY];
    }

    _isSurface(scene, x, y) {
        return scene.isWall(x, y);
    }

    _drawFloorAndCeilingLine(scene, hPixels, controlSizeX, controlSizeY, linePos) {
        let controlHypotenuse = Math.sqrt((controlSizeX * controlSizeX) + (controlSizeY * controlSizeY));
        let halfHPixels = Math.floor(hPixels / 2);
        let height = (resolution.y >>> 1) - halfHPixels + 1;
        let ceiling, floor, textureX, textureY;
        let floorTop = resolution.y - height;
        height--;
        let dstPosX = linePos << 2;
        let dstPosWidth = this._floorAndCeilingData.width << 2;
        let dstPosFloor = dstPosX + (floorTop * dstPosWidth);
        let dstPosCeiling = dstPosX + (height * dstPosWidth);
        let h = halfHPixels * this._multiplierToRealSize;
        let srcPos;
        for (let i = 0; i <= height; i++) {
            let multiplierXY = HALF_WALL_SIZE / h;
            let x = this._raySourcePosition.x + (controlSizeX * multiplierXY);
            let y = this._raySourcePosition.y + (controlSizeY * multiplierXY);
            let tileX = Math.floor(x / WALL_SIZE);
            let tileY = Math.floor(y / WALL_SIZE);
            let surfaceX = x % WALL_SIZE;
            let surfaceY = y % WALL_SIZE;
            [ceiling, floor] = scene.getFloorAndCeiling(tileX, tileY);
            if (ceiling != undefined && floor != undefined) {
                let floorHypotenuse = multiplierXY * controlHypotenuse;
                let fade = this._calculateFade(floorHypotenuse, scene, x, y);
                let antifade = 1 - fade;
                let fadeR = this._curFade.color.r * fade;
                let fadeG = this._curFade.color.g * fade;
                let fadeB = this._curFade.color.b * fade;
                let r, g, b;
                if (ceiling != undefined) {
                    textureX = Math.floor(surfaceX * ceiling.sizeMultiplierX);
                    textureY = Math.floor(surfaceY * ceiling.sizeMultiplierY);
                    srcPos = (textureX << 2) + ((textureY * ceiling.imageData.width) << 2);
                    r = ceiling.imageData.data[srcPos];
                    g = ceiling.imageData.data[srcPos + 1];
                    b = ceiling.imageData.data[srcPos + 2];
                    r *= antifade;
                    g *= antifade;
                    b *= antifade;
                    this._floorAndCeilingData.data[dstPosCeiling] = r + fadeR;
                    this._floorAndCeilingData.data[dstPosCeiling + 1] = g + fadeG;
                    this._floorAndCeilingData.data[dstPosCeiling + 2] = b + fadeB;
                }
                if (floor != undefined) {
                    textureX = Math.floor(surfaceX * floor.sizeMultiplierX);
                    textureY = Math.floor(surfaceY * floor.sizeMultiplierY);
                    srcPos = (textureX << 2) + ((textureY * floor.imageData.width) << 2);
                    r = floor.imageData.data[srcPos];
                    g = floor.imageData.data[srcPos + 1];
                    b = floor.imageData.data[srcPos + 2];
                    r *= antifade;
                    g *= antifade;
                    b *= antifade;
                    this._floorAndCeilingData.data[dstPosFloor] = r + fadeR;
                    this._floorAndCeilingData.data[dstPosFloor + 1] = g + fadeG;
                    this._floorAndCeilingData.data[dstPosFloor + 2] = b + fadeB;
                }
            }
            h += this._multiplierToRealSize;
            dstPosFloor += this._floorAndCeilingDstInc;
            dstPosCeiling -= this._floorAndCeilingDstInc;
        }
    }

}