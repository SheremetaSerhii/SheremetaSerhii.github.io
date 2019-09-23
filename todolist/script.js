var btn = document.getElementById("btnAdd");
var allTasks = [];

btn.addEventListener("click", function() {
    var taskVal = task.value;
    if (!allTasks.includes(taskVal)) {    
        var newLi = document.createElement("li");
        newLi.innerText = taskVal;
        tasks.appendChild(newLi);
        allTasks.push(taskVal);

        newLi.addEventListener("click", function(e) {
            if (e.target.getAttribute("class") == "done") {
                e.target.setAttribute("class", "")
            } 
            else {
                e.target.setAttribute("class", "done")
            } 
        }, false);

        newLi.addEventListener("dblclick", function(e) {
            var index = allTasks.indexOf(e.target.innerText);
            allTasks.splice(index, 1);
            e.target.remove();
        }, false);
    }
}, false);