"use strict"

import { WALL_SIZE } from "./data.js";
const
    CLOSE_LIGHT_DISTANCE = WALL_SIZE * 3,
    FAR_LIGHT_DISTANCE = WALL_SIZE * 7;

export class Camera {

    _width = WALL_SIZE;
    _fov = 16;
    _x = 0;
    _y = 0;
    _angle = 0;
    _raySourcePosition = { x: 0, y: 0 };

    constructor(x, y, angle) {
        this.setCameraPosition(x, y, angle);
    }

    setCameraView(width, fov) {
        this._width = width;
        this._fov = fov;
    }

    setCameraPosition(x, y, angle) {
        this._x = x;
        this._y = y;
        this._angle = angle;
        // it needs to add calculation of ray source position
    }

    drawSceneToScreen(scene, screen) {
        let ray, fade;
        for (let i = 0; i < 320; i++) {
            ray = _getRay(scene, i);
            fade = 0;
            if (ray.distanceToSurface > CLOSE_LIGHT_DISTANCE) {
                fade = (ray.distanceToSurface - CLOSE_LIGHT_DISTANCE) * 100 / FAR_LIGHT_DISTANCE;
                if (fade > 100) {
                    fade = 100;
                }
            }
            screen.drawLineFromTextureInPosition(ray.surface, ray.surfaceHeight, ray.positionOnSurface, i, fade);
        }

    }

    _getRay(scene, rayIndex) {
        let ray = {
            surface: undefined,
            surfaceHeight: 0,
            positionOnSurface: 0,
            distanceToSurface: 0
        };
        //add ray calculations
        return ray;
    }

    _getTraceEndingPosition(scene, rayAngle) {
        let pos = { x: 0, y: 0 };
        // add tracing calculations
        return pos;
    }

}