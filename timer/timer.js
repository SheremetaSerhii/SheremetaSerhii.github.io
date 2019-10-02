const NUMBER_COLOR_DATA = ["rgb(111,123,100)", "rgb(47,47,47)"];
const NUMBER_BIT_DATA = [95, 3, 118, 115, 43, 121, 125, 67, 127, 123];
const NUMBER_ELEMENT_DATA = [
    [[7, 5], [12, 0], [63, 0], [68, 5], [63, 10], [12, 10]],
    [[7, 75], [12, 70], [63, 70], [68, 75], [63, 80], [12, 80]],
    [[7, 145], [12, 140], [63, 140], [68, 145], [63, 150], [12, 150]],
    [[0, 12], [5, 7], [10, 12], [10, 68], [5, 73], [0, 68]],
    [[0, 82], [5, 77], [10, 82], [10, 138], [5, 143], [0, 138]],
    [[65, 12], [70, 7], [75, 12], [75, 68], [70, 73], [65, 68]],
    [[65, 82], [70, 77], [75, 82], [75, 138], [70, 143], [65, 138]]
];

var timerCanvas = document.getElementById("timerCanvas");
var ctx;

function drawDigit(digit, x, y) {
    var bitArr = NUMBER_BIT_DATA[digit];
    var colorIndex;
    for (var i = 0; i <= 6; i++) {
        colorIndex = Number(Boolean(bitArr & (1 << (6 - i))));
        ctx.fillStyle = NUMBER_COLOR_DATA[colorIndex];
        ctx.beginPath();
        ctx.moveTo(x + NUMBER_ELEMENT_DATA[i][0][0], y + NUMBER_ELEMENT_DATA[i][0][1]);
        for (var j = 1; j <= 5; j++) {
            ctx.lineTo(x + NUMBER_ELEMENT_DATA[i][j][0], y + NUMBER_ELEMENT_DATA[i][j][1]);
        }
        ctx.fill();
    }
    return x + 90;
}

function darwColon(x, y) {
    ctx.fillStyle = NUMBER_COLOR_DATA[1];
    ctx.fillRect(x + 5, y + 35, 10, 10);
    ctx.fillRect(x + 5, y + 105, 10, 10);
    return x + 35;
}

function drawNumber(num, x, y) {
    var curX = x;
    var strNum = String(num);
    if (strNum.length < 2) {
        curX = drawDigit(0, curX, y);
    }
    for (i = 0; i < strNum.length; i++) {
        curX = drawDigit(Number(strNum[i]), curX, y);
    }
    return curX;
}

function drawCurrentTime() {
    var curDate = new Date();
    var x = drawNumber(curDate.getHours(), 12, 10);
    x = darwColon(x, 10);
    x = drawNumber(curDate.getMinutes(), x, 10);
    x = darwColon(x, 10); 
    drawNumber(curDate.getSeconds(), x, 10);
}

if (timerCanvas.getContext) {
    ctx = timerCanvas.getContext("2d");
    drawCurrentTime();
    setInterval(drawCurrentTime, 1000);
}
else {
    alert("Your browser does not support canvas. \n Please, open this page in another browser.");
}