function getMixedArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        let a = Math.trunc(Math.random() * arr.length);
        let b = Math.trunc(Math.random() * (arr.length - 1));
        b += (b == a) ? 1 : 0;
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
    return arr;
}

let creatures = []

for (let i = 0; i < 10; i++) {
    creatures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    console.log(getMixedArray(creatures));
    creatures = [1, 2, 3, 4, 5, 6, 7, 8];
    console.log(getMixedArray(creatures));
}

console.log("----------------------------------------");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  for (let i = 0; i < 10; i++) {
    creatures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    shuffle(creatures)
    console.log(creatures);
    creatures = [1, 2, 3, 4, 5, 6, 7, 8];
    shuffle(creatures)
    console.log(creatures);
}