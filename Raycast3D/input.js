"use strict"

const
    KEY_ESC = 27,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,
    KEY_W = 87,
    KEY_A = 65,
    KEY_S = 83,
    KEY_D = 68;

export const KEYSTATE_ = {
    FREE: 0,
    PRESSED: 1,
    DOWN: 2,
    UP: 3
}

export class Input {

    _updateInterval = 10;
    _canUpdateKeyboard = true;

    _mouseMoveData = {
        left: 0,
        right: 0
    }

    _mouseKeyInputData = {
        lmb: KEYSTATE_.FREE,
        rmb: KEYSTATE_.FREE
    }

    _keyInputData = {
        esc: KEYSTATE_.FREE,
        left: KEYSTATE_.FREE,
        up: KEYSTATE_.FREE,
        right: KEYSTATE_.FREE,
        down: KEYSTATE_.FREE,
        w: KEYSTATE_.FREE,
        a: KEYSTATE_.FREE,
        s: KEYSTATE_.FREE,
        d: KEYSTATE_.FREE
    }

    constructor(updateInterval) {
        this._updateInterval = updateInterval;
        document.addEventListener("keydown", this._keyboardKeyDownEvent.bind(this), false);
        document.addEventListener("keyup", this._keyboardKeyUpEvent.bind(this), false);
    }

    getMouseMove(side) {
        return this._mouseMoveData[side];
    }

    getMouseKeyState(key) {
        return this.getMouseKeyInputData[key];
    }

    getKeyState(key) {
        let result = this._keyInputData[key];
        this._keyboardInputUpdate();
        return result;
    }

    _readKeyboardKeys(keyCode, getNextKeyFunction) {

        switch (keyCode) {
            case KEY_ESC:
                this._keyInputData.esc = getNextKeyFunction(this._keyInputData.esc);
                break;
            case KEY_LEFT:
                this._keyInputData.left = getNextKeyFunction(this._keyInputData.left);
                break;
            case KEY_UP:
                this._keyInputData.up = getNextKeyFunction(this._keyInputData.up);
                break;
            case KEY_RIGHT:
                this._keyInputData.right = getNextKeyFunction(this._keyInputData.right);
                break;
            case KEY_DOWN:
                this._keyInputData.down = getNextKeyFunction(this._keyInputData.down);
                break;
            case KEY_W:
                this._keyInputData.w = getNextKeyFunction(this._keyInputData.w);
                break;
            case KEY_A:
                this._keyInputData.a = getNextKeyFunction(this._keyInputData.a);
                break;
            case KEY_S:
                this._keyInputData.s = getNextKeyFunction(this._keyInputData.s);
                break;
            case KEY_D:
                this._keyInputData.d = getNextKeyFunction(this._keyInputData.d);
                break;
        }

    }

    _getNextKeyDownState(currentState) {
        return (currentState === KEYSTATE_.FREE || currentState === KEYSTATE_.UP ? KEYSTATE_.PRESSED : KEYSTATE_.DOWN);
    }

    _getNextKeyUpState(currentState) {
        return (currentState === KEYSTATE_.DOWN || currentState === KEYSTATE_.PRESSED ? KEYSTATE_.UP : KEYSTATE_.FREE);
    }

    _keyboardKeyDownEvent(event) {
        if (event.defaultPrevented) {
            return;
        }
        this._readKeyboardKeys(event.keyCode, this._getNextKeyDownState);
        this._keyboardInputUpdateWithTimeout();
    }

    _keyboardKeyUpEvent(event) {
        if (event.defaultPrevented) {
            return;
        }
        this._readKeyboardKeys(event.keyCode, this._getNextKeyUpState);
        this._keyboardInputUpdateWithTimeout();
    }

    _keyboardInputUpdate() {
        for (let key in this._keyInputData) {
            switch (this._keyInputData[key]) {
                case KEYSTATE_.UP:
                    this._keyInputData[key] = KEYSTATE_.FREE;
                    break;
                case KEYSTATE_.PRESSED:
                    this._keyInputData[key] = KEYSTATE_.DOWN;
                    break;
            }
        }
        this._canUpdateKeyboard = true;
    }

    _keyboardInputUpdateWithTimeout() {
        if (this._canUpdateKeyboard) {
            setTimeout(this._keyboardInputUpdate.bind(this), this._updateInterval);
            this._canUpdateKeyboard = false;
        }
    }

}