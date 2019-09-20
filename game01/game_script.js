const FINISH_COLOR = "#d61010";

const LEVEL_DATA = [
    // LEVEL 0
    0,
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
        color: "#ecc40f",
        items: [
            { x: 40, y: 50, w: 400, h: 100, kind: "road" }
        ] 
    },
    // LEVEL 3
    3
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

function goToGameOverScreen() {
    currentLevel = 0;
    startNewGameButton.style.display = "inline-block";
    hideGameElementsFrom(0);
    return true;
}

function goToLevel(newLevel) {
    currentLevel = newLevel;
    var i,
        currentLevelItems = LEVEL_DATA[currentLevel].items,
        currentLevelColor = LEVEL_DATA[currentLevel].color;
    for (i = 0; i < currentLevelItems.length; i++) {
        gameElements[i].style.display = "inline-block";
        gameElements[i].style.left = currentLevelItems[i].x + "px";
        gameElements[i].style.top = currentLevelItems[i].y + "px";
        gameElements[i].style.width = currentLevelItems[i].w + "px";
        gameElements[i].style.height = currentLevelItems[i].h + "px";
        switch (currentLevelItems[i].kind) {
            case "road":
                gameElements[i].style.backgroundColor = currentLevelColor;
                gameElements[i].addEventListener("mousemove", function elementMouseMove(e) {
                    e.stopPropagation();
                }, false);
                break;
            case "finish":
                gameElements[i].style.backgroundColor = FINISH_COLOR;
                gameElements[i].addEventListener("mousemove", function elementMouseMove(e) {
                    goToLevel(currentLevel + 1);
                    e.stopPropagation();
                }, false);
                break;
        }
    }
    if (i < gameElements.length - 1) {
        hideGameElementsFrom(i + 1);
    }
    return true;
}

startNewGameButton.addEventListener("click", function (e) {
    goToLevel(1);
    this.style.display = "none";
    e.stopPropagation();
}, false);

document.getElementsByTagName("main")[0].addEventListener("mousemove", function () {
    if (currentLevel > 0 )  {
        goToGameOverScreen();
    } 
}, false);