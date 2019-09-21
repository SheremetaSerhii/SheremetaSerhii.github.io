const FINISH_COLOR = "#d61010";
const GAME_LOSE_ENABLE = true;
const FIRST_LEVEL = 1;

const LEVEL_DATA = [
    // LEVEL 0
    {
        color: "#000000",
        items: []
    },
    // LEVEL 1
    {
        color: "#ecc40f",
        items: [
            { x: 195, y: 300, w: 210, h: 310, kind: "road" },
            { x: 405, y: 50, w: 150, h: 400, kind: "road" },
            { x: 99, y: 50, w: 370, h: 100, kind: "road" },
            { x: 40, y: 50, w: 60, h: 100, kind: "finish" }
        ]
    },
    // LEVEL 2
    {
        color: "#c9a24d",
        items: [
            { x: 40, y: 50, w: 400, h: 100, kind: "road" },
            { x: 360, y: 150, w: 80, h: 150, kind: "road" },
            { x: 40, y: 220, w: 320, h: 80, kind: "road" },
            { x: 40, y: 300, w: 85, h: 300, kind: "road" },
            { x: 125, y: 520, w: 210, h: 80, kind: "road" },
            { x: 335, y: 420, w: 75, h: 180, kind: "road" },
            { x: 410, y: 420, w: 150, h: 70, kind: "road" },
            { x: 495, y: 100, w: 65, h: 320, kind: "road" },
            { x: 495, y: 60, w: 65, h: 40, kind: "finish" }
        ]
    },
    // LEVEL 3
    {
        color: "#919235",
        items: [
            { x: 300, y: 50, w: 260, h: 60, kind: "road" },
            { x: 300, y: 110, w: 55, h: 220, kind: "road" },
            { x: 250, y: 280, w: 50, h: 50, kind: "road" },
            { x: 200, y: 50, w: 50, h: 280, kind: "road" },
            { x: 80, y: 50, w: 120, h: 50, kind: "road" },
            { x: 80, y: 100, w: 45, h: 170, kind: "road" },
            { x: 40, y: 250, w: 45, h: 350, kind: "road" },
            { x: 85, y: 555, w: 475, h: 45, kind: "road" },
            { x: 515, y: 140, w: 45, h: 420, kind: "road" },
            { x: 385, y: 140, w: 130, h: 45, kind: "road" },
            { x: 385, y: 180, w: 45, h: 340, kind: "road" },
            { x: 143, y: 475, w: 245, h: 45, kind: "road" },
            { x: 143, y: 220, w: 40, h: 255, kind: "road" },
            { x: 143, y: 190, w: 40, h: 30, kind: "finish" }
        ]
    },
    // LEVEL 4
    {
        color: "#6d971e",
        items: [
            { x: 110, y: 160, w: 110, h: 110, kind: "road" },
            { x: 60, y: 240, w: 50, h: 250, kind: "road" },
            { x: 60, y: 490, w: 50, h: 25, kind: "trapTrigger", val: "3" },
            { x: 60, y: 515, w: 50, h: 30, kind: "road" },
            { x: 60, y: 545, w: 50, h: 25, kind: "finish" }
        ]
    }
];

//console.log(LEVEL_DATA);

var currentLevel = 0;
var gameElements = document.getElementsByTagName("section");

function hideGameElementsFrom(start) {
    for (var i = start; i < gameElements.length; i++) {
        gameElements[i].style.display = "none";
    }
    return true;
}

function goToMainScreen(gameState) {
    currentLevel = 0;
    startNewGameButton.style.display = "inline-block";
    hideGameElementsFrom(0);
    return true;
}

function goToLevel(newLevel) {
    currentLevel = newLevel;
    var i, currentLevelItems, currentLevelColor;

    currentLevelItems = LEVEL_DATA[currentLevel].items;
    currentLevelColor = LEVEL_DATA[currentLevel].color;

    for (i = 0; i < currentLevelItems.length; i++) {
        gameElements[i].style.display = "inline-block";
        gameElements[i].style.left = currentLevelItems[i].x + "px";
        gameElements[i].style.top = currentLevelItems[i].y + "px";
        gameElements[i].style.width = currentLevelItems[i].w + "px";
        gameElements[i].style.height = currentLevelItems[i].h + "px";
        gameElements[i].dataset.kind = currentLevelItems[i].kind;
        gameElements[i].dataset.val = "";
        switch (currentLevelItems[i].kind) {
            case "road":
                gameElements[i].style.backgroundColor = currentLevelColor;
                break;
            case "trapTrigger":
                gameElements[i].style.backgroundColor = currentLevelColor;
                gameElements[i].dataset.val = currentLevelItems[i].val;
                break;
            case "finish":
                gameElements[i].style.backgroundColor = FINISH_COLOR;
                break;
        }
    }

    if (i < gameElements.length - 1) {
        hideGameElementsFrom(i);
    }
    return true;
}

startNewGameButton.addEventListener("click", function (e) {
    goToLevel(FIRST_LEVEL);
    this.style.display = "none";
    e.stopPropagation();
}, false);

if (GAME_LOSE_ENABLE) {
    document.getElementsByTagName("main")[0].addEventListener("mousemove", function () {
        if (currentLevel > 0) {
            goToMainScreen("lose");
        }
    }, false);
}

for (var i = 0; i < gameElements.length; i++) {
    gameElements[i].addEventListener("mousemove", function (e) {
        if (this.dataset.kind != "road") {
            switch (this.dataset.kind) {
                case "trapTrigger":
                    var disappearringRoadsArr = this.dataset.val.split(",");
                    for (j = 0; j < disappearringRoadsArr.length; j++) {
                        gameElements[disappearringRoadsArr[j]].style.display = "none";
                    }
                    break;
                case "finish":
                    var nextLevel = currentLevel + 1;
                    if (nextLevel < LEVEL_DATA.length) {
                        goToLevel(nextLevel);
                    }
                    else {
                        goToMainScreen("win");
                    }
                    break;
            }
        }
        e.stopPropagation();
    }, false);
}