var TASKS = [];

function ToDoTask(name) {
    this.name = name;
    this.startDate = new Date();
    this.endDate = null;
}

function doneTask(e) {
    e.target.style.textDecoration = "line-through";
}

function deleteTask(e) {
    e.target.parentElement.remove();
}

function addTask(e) {
    var task = document.getElementById("task");
    var newTask = document.createElement("li");

    newTask.innerText = task.value;
    TASKS.push(new ToDoTask(task.value));

    newTask.addEventListener("click", doneTask, false);
    var deleteBtn = document.createElement("span");
    deleteBtn.innerText = " X";
    newTask.appendChild(deleteBtn);
    deleteBtn.addEventListener("dblclick", deleteTask, false);
    var tasks = document.getElementById("tasks");
    tasks.appendChild(newTask);
}

var btnAdd=document.getElementById("btnAdd");
btnAdd.addEventListener("click", addTask, false);