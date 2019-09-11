
// function calcSquareOfTriangle(a, b, c) {
//     var p = (a + b + c) / 2;
//     return Math.sqrt(p * (p - a) * (p - b) * (p - c));
// }

// //t1
// console.log(calcSquareOfTriangle(3, 4, 5));

// //t2
// console.log(calcSquareOfTriangle(10, 11, 50));

// //t3
// console.log(calcSquareOfTriangle(12, 17, 8));

var a, b, c, d, x1, x2;
a = 1, b = 6, c = 5;
d = Math.pow(b, 2) - 4 * a * c;
console.log(d);
if (d >= 0) { 
    x1 = (-b - Math.sqrt(d)) / (2 * a);
    x2 = (-b + Math.sqrt(d)) / (2 * a);
    console.log(x1, x2);
} else {
    console.log("Square equal doesnt have real roots");
}