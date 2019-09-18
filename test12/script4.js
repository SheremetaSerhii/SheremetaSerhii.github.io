function Triangle(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.length = function() {
        return this.a + this.b + this.c;  
    };

    this.square = function() {
        var p = this.length() / 2;
        return Math.sqrt(p * (p - this.a)  * (p - this.b)  * (p - this.c) );
    };
}

var tri = new Triangle(3, 4, 5);
console.log(tri.length(), tri.square());

var tri2 = new Triangle(11, 22, 15);
console.log(tri2.length(), tri2.square());
