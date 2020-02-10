"use strict";

import { RADIAN_MOD } from "./data.js";

export class GameElement {

    _x = 0;
    _y = 0;
    _angle = 0;

    constructor(x, y, angle) {
        this.setPosition(x, y);
        this.setAngle(angle);
    }

    setPosition(x, y) {
        this._x = x;
        this._y = y;
    }

    getPosition() {
        return [this._x, this._y];
    }

    _getFixedAngle(angle) {
        let result = angle % 360;
        return (result >= 0 ? result : result + 360);
    }

    setAngle(angle) {
        this._angle = this._getFixedAngle(angle);
    }

    getAngle() {
        return this._angle;
    }

}

export class MovableElement extends GameElement {

    _moveSpeed = 1;
    _turnSpeed = 2;

    constructor(x, y, angle, moveSpeed, TurnSpeed) {
        super(x, y, angle);
        this.setMoveSpeed(moveSpeed);
        this.setTurnSpeed(TurnSpeed);
    }

    _getTurnedAngle(baseAngle, turnAngle) {
        let currentAngle = baseAngle;
        currentAngle += turnAngle;
        return currentAngle;
    }

    _moveInDirection(directionAngle, distance) {
        let radians = RADIAN_MOD * this._getFixedAngle(directionAngle - 90);
        this._x += Math.cos(radians) * distance;
        this._y += Math.sin(radians) * distance;
    }

    setMoveSpeed(speed) {
        this._moveSpeed = speed;
    }

    setTurnSpeed(speed) {
        this._turnSpeed = speed;
    }

    turnLeftOnAngle(turnAngle) {
        this.setAngle(this._getTurnedAngle(this._angle, -turnAngle));
    }

    turnRightOnAngle(turnAngle) {
        this.setAngle(this._getTurnedAngle(this._angle, turnAngle));
    }

    turnLeft() {
        this.setAngle(this._getTurnedAngle(this._angle, -this._turnSpeed));
    }

    turnRight() {
        this.setAngle(this._getTurnedAngle(this._angle,this._turnSpeed));
    }

    moveForward() {
        this._moveInDirection(this._angle, this._moveSpeed);
    }

    moveBack() {
        let currentAngle = this._getTurnedAngle(this._angle, 180);
        this._moveInDirection(currentAngle, this._moveSpeed);
    }

    moveRight() {
        let currentAngle = this._getTurnedAngle(this._angle, 90);
        this._moveInDirection(currentAngle, this._moveSpeed);
    }

    moveLeft() {
        let currentAngle = this._getTurnedAngle(this._angle, 270);
        this._moveInDirection(currentAngle, this._moveSpeed);
    }

}