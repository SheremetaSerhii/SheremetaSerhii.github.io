// var sect = document.getElementsByTagName("section")[0];
// console.log(sect);

const START = 1;
const SIZE = 9;

var main_section = document.getElementById("tbl");

for (var i = START; i<= SIZE; i++) {
    var row = document.createElement("div");
    row.setAttribute("class", "row");

    for (var j = START; j<= SIZE; j++) {
        var cell = document.createElement("div");

        cell.addEventListener("click", function(e) {
            if (e.target.style.opacity == 0.4) {
                e.target.style.opacity = 1.0;
            }
            else {
                e.target.style.opacity = 0.4;
            }
        }, false);

        cell.addEventListener("dblclick", function(e) {
            e.target.remove();
        }, false);

        cell.setAttribute("class", "cell");
        var $class = "";
        $class = (i == j) ? "cell cell-main" : $class;
        $class = (i > j) ? "cell cell-umain" : $class;
        $class =  (i < j) ? "cell cell-omain" : $class;
        cell.setAttribute("class", $class);
        var prod = i * j;
        if ( i * j === 1) {
            cell.innerText = "";
        }
        else {
            cell.innerText = prod;
        }
        row.appendChild(cell);
    }

    main_section.appendChild(row);

}