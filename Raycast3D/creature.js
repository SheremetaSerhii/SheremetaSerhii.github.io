"use strict"

import { WALL_SIZE } from "./data.js";
import { MovableElement } from "./element.js";

export class CreatureBody extends MovableElement {

    _environment = undefined;
    _bodyRadius = 0;

    constructor(x, y, angle, moveSpeed, bodySize, environment) {
        super(x, y, angle, moveSpeed);
        this.setBodySize(bodySize);
        this.setEnvironment(environment);
    }

    setBodySize(bodySize) {
        this._bodyRadius = bodySize / 2;
    }

    setEnvironment(environment) {
        this._environment = environment;
    }

    _wallCollision() {
        let x, y;
        [x, y] = this.getPosition();
        let bodySides = this._getBodySides(x, y);
        let tilePosX, tilePosY;
        for (let key in bodySides) {
            [tilePosX, tilePosY] = this._getTilePos(bodySides[key].x, bodySides[key].y);
            if (this._environment.isWall(tilePosX, tilePosY)) {
                switch (key) {
                    case "up":
                        this._y = (tilePosY + 1) * WALL_SIZE + this._bodyRadius;
                        break;
                    case "down":
                        this._y = tilePosY * WALL_SIZE - this._bodyRadius;
                        break;
                    case "left":
                        this._x = (tilePosX + 1) * WALL_SIZE + this._bodyRadius;
                        break;
                    case "right":
                        this._x = tilePosX * WALL_SIZE - this._bodyRadius;
                        break;
                }
            }
        }
    }

    _getTilePos(x, y) {
        return [Math.floor(x / WALL_SIZE), Math.floor(y / WALL_SIZE)];
    }

    _getBodySides(x, y) {
        let up = { x: x, y: y - this._bodyRadius };
        let down = { x: x, y: y + this._bodyRadius };
        let left = { x: x - this._bodyRadius, y: y };
        let right = { x: x + this._bodyRadius, y: y };
        return { up: up, down: down, left: left, right: right };
    }

    moveForward() {
        super.moveForward();
        this._wallCollision();
    }

    moveBack() {
        super.moveBack();
        this._wallCollision();
    }

    moveRight() {
        super.moveRight();
        this._wallCollision();
    }

    moveLeft() {
        super.moveLeft();
        this._wallCollision();
    }

}