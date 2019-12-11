let arrA = [];
let arrB = new Array(6);
for (let i = 0; i < 6; i++) {
    arrB[i] = new Array(3);
    for (let j = 0; j < 3; j++) {
        arrA.push(i * 10);
        arrB[i][j] = j;
    }
}

let initiative = new Array(14);
let curItem;
let len = initiative.length;
for (let i = 0; i < initiative.length; i++) {
    curItem = arrA.splice(Math.random() * --len)
}

// FUCK THIS USELESS BULLSHIT...