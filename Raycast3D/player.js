"use strict"

import { CreatureBody } from "./creature.js";
import { Input } from "./input.js";
import { Camera } from "./camera.js";
import { KEYSTATE_ } from "./input.js";

export class Player {

    _body = undefined;
    _input = undefined;
    _camera = undefined;

    constructor(x, y, angle, moveSpeed, bodySize, environment) {
        this._body = new CreatureBody(x, y, angle, moveSpeed, bodySize, environment);
        this._input = new Input(50);
        this._camera = new Camera(x, y, angle);
    }

    getCamera() {
        return this._camera;
    }

    getBody() {
        return this._body;
    }

    setPosition(x, y, angle) {
        this._body.setPosition(x, y);
        this._body.setAngle(angle);
        this._camera.setCameraPosition(x, y, angle);
    }

    movement() {
        let currentKeyState;
        currentKeyState = this._input.getKeyState("up");
        if (currentKeyState == KEYSTATE_.DOWN) {
            this._body.moveForward();
        }
        currentKeyState = this._input.getKeyState("down");
        if (currentKeyState == KEYSTATE_.DOWN) {
            this._body.moveBack();
        }
        currentKeyState = this._input.getKeyState("left");
        if (currentKeyState == KEYSTATE_.DOWN) {
            this._body.turnLeft(2);
        }
        currentKeyState = this._input.getKeyState("right");
        if (currentKeyState == KEYSTATE_.DOWN) {
            this._body.turnRight(2);
        }
        let x, y;
        [x, y] = this._body.getPosition();
        this._camera.setCameraPosition(x, y, this._body.getAngle());
    }

}