"use strict"

import { Screen } from "./screen.js";
import { Loader } from "./loader.js";

class GameLoop {

    _gameLoopId = undefined;
    _updateGameFunc = undefined;

    constructor(updateGameFunc) {
        this._updateGameFunc = updateGameFunc;
    }

    startGameLoop() {
        this._gameLoopId = setInterval(this._updateGameFunc, 10);
    }

    endGameLoop() {
        clearInterval(this._gameLoopId);
    }

}

let gameScreen = new Screen(document.getElementById("mainCanvas"));
let gameTextures, gameMap, player;

function updateGame() {
    player.movement();
    gameScreen.fillBlack();
    player.getCamera().drawSceneToScreen(gameMap, gameScreen);
    gameScreen.drawScreen();
}

const
    PLAYER_SPEED = 1.5,
    PLAYER_SIZE = 16,
    START_LEVEL = 0;
let gameLoop = new GameLoop(updateGame);
let gameLoader = new Loader();
[gameTextures, gameMap, player] = gameLoader.loadGame(START_LEVEL, PLAYER_SPEED, PLAYER_SIZE, gameLoop.startGameLoop.bind(gameLoop), gameLoop.endGameLoop.bind(gameLoop));