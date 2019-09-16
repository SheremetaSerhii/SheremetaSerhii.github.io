// var sum = 0, i = 1;
// while (i <= 10) {
//     sum += i;
//     i++;
// }
// console.log(sum);

// var sum = 0, i = 1;
// do {
//     sum += i;
//     i++;
// } while (i <= 10) 
// console.log(sum);
// console.log(i);

// var sum = 0;
// for (var i = 1; i <=10; i++) {
//     if (i == 7) {
//         continue;
//     }
//     sum += i;
// }
// console.log(sum, i);

var numbers = [10, 22, 33, -10, 2, 4, 5, -9, 56, 74, 22, 11, 10];
var min = numbers[0];
for (var i = 1; i < numbers.length; i++) {
    if (min > numbers[i]) {
        min = numbers[i];
    }
}
console.log(min);

var salaries = [4700.22, 5002.33, 10567.33];
for (var i = 0; i < salaries.length; i++) {
    salaries[i] += 200.00;
}
console.log(salaries);

var group_101 = ["Vasa", "Stepan", "John"];
group_101.push("New");
console.log(group_101);
group_101.unshift("First");
console.log(group_101);

var last_member = group_101.pop();
console.log(last_member);
console.log(group_101);


var first_member = group_101.shift();
console.log(first_member);
console.log(group_101);

var str = group_101.join();
console.log(str);

str = "Vasya|Kola|Dima|Tanya"
var arr = str.split("|");
console.log(arr);

arr.sort();
console.log(arr);

var arr2 = [];
arr2.length = 10;
arr2.fill(1);
console.log(arr2);

arr2 = [10, 22, 33];
console.log(arr2.includes(10));

function arrIncludes(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return true;
        }
    }
    return false;
}

console.log(arrIncludes(arr2, 10));
console.log(arrIncludes(arr2, 11));

var tachka = {
    color: "blue",
    engine: {
        volume: 3.0,
        type: "diesel"
    },
    model: "Toureg",
    brand: "Volkswagen"
}

for (var k in tachka) {
    console.log(k);
}

function evenOddNumber(num) {
    if (typeof num != "number") {
        throw "Error using function";
    }
    var result = {
        even: 0,
        odd:  0
    };
    var str = num.toString();
    for (var i = 0; i < str.length; i++) {
        if (Number(str[i]) % 2 == 0) {
            result.even++;
        } else {
            result.odd++;
        }
    }
    return result;
}

console.log(evenOddNumber(56789));
//console.log(evenOddNumber("dfghh"))