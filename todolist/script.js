task.value = "";

var allTasks = [];
var selectedTask = null;

function getClass(curElement) {
    attr = curElement.getAttribute("class");
    result = (attr == null) ? "" : attr;
    return result;
}

function setNewSelectedElement(newElement) {
    var attr = getClass(newElement);
    if (selectedTask != null) {
        selectedTask.setAttribute("class", getClass(selectedTask).replace("selected", ""));
        selectedTask.setAttribute("class", getClass(selectedTask).replace(" ", ""));
    }
    attr += (attr.length > 0) ? " selected" : "selected";
    newElement.setAttribute("class", attr);
    selectedTask = newElement;
    return true;
}

function changePlacesWithSelected(elementToMove) {

    var elementToMovePTag = elementToMove.getElementsByTagName("p")[0];
    var selectedTaskPTag = selectedTask.getElementsByTagName("p")[0];
    var tempText = elementToMovePTag.innerText;
    var elementToMoveIndex = allTasks.indexOf(tempText);
    var selectedTaskIndex = allTasks.indexOf(selectedTaskPTag.innerText);

    elementToMovePTag.innerText = selectedTaskPTag.innerText;
    allTasks[elementToMoveIndex] = selectedTaskPTag.innerText;
    selectedTaskPTag.innerText = tempText;
    allTasks[selectedTaskIndex] = tempText;
    setNewSelectedElement(elementToMove);

    return true;

}

btnUp.addEventListener("click", function () {
    if (allTasks.length > 1 && selectedTask != null) {
        var selectedTaskIndex = allTasks.indexOf(selectedTask.getElementsByTagName("p")[0].innerText);
        if (selectedTaskIndex > 0) {
            changePlacesWithSelected(tasksList.getElementsByTagName("li")[selectedTaskIndex - 1]);
        }
    }
}, false);

btnDown.addEventListener("click", function () {
    if (allTasks.length > 1 && selectedTask != null) {
        var selectedTaskIndex = allTasks.indexOf(selectedTask.getElementsByTagName("p")[0].innerText);
        if (selectedTaskIndex < allTasks.length - 1) {
            changePlacesWithSelected(tasksList.getElementsByTagName("li")[selectedTaskIndex + 1]);
        }
    }
}, false);

btnAdd.addEventListener("click", function () {

    var taskVal = task.value;

    if (taskVal != "") {
        if (!allTasks.includes(taskVal)) {
            var newLi = document.createElement("li"),
                newLiText = document.createElement("p");
            newLiBtnRemove = document.createElement("input");
            newLiText.setAttribute("class", "liText");
            newLiBtnRemove.setAttribute("type", "button");
            newLiBtnRemove.setAttribute("value", "X");
            newLiBtnRemove.setAttribute("class", "liButton");
            newLiText.innerText = taskVal;
            newLi.appendChild(newLiText);
            newLi.appendChild(newLiBtnRemove);
            tasksList.appendChild(newLi);
            allTasks.push(taskVal);

            newLi.addEventListener("click", function (e) {
                var attribute = getClass(e.target);
                var curElement = (attribute == "liText") ? e.target.parentElement : e.target;
                if (!attribute.includes("liButton")) {
                    var attr = getClass(curElement);
                    if (attr.includes("selected")) {
                        curElement.setAttribute("class", getClass(curElement).replace("selected", ""));
                        selectedTask = null;
                    }
                    else {
                        setNewSelectedElement(curElement);
                    }
                }
            }, false);

            newLi.addEventListener("dblclick", function (e) {
                var attribute = getClass(e.target);
                var curElement = (attribute == "liText") ? e.target.parentElement : e.target;
                if (!attribute.includes("liButton")) {
                    var attr = getClass(curElement);
                    attr = (attr.includes("strikethrough")) ? "selected" : "strikethrough selected";
                    curElement.setAttribute("class", attr);
                    selectedTask = curElement;
                }
            }, false);

            newLiBtnRemove.addEventListener("click", function (e) {
                var parent = e.target.parentElement;
                var index = allTasks.indexOf(parent.innerText);
                allTasks.splice(index, 1);
                parent.remove();
                e.stopPropagation;
            }, false);

            tasksList.scrollTop = tasksList.scrollHeight - tasksList.clientHeight;
        }
        else {
            alert("This task alredy exists. \n Enter another task please.");
        }
        task.value = "";
    }
    else {
        alert("Task is empty! \n Enter the task please.");
    }

    task.focus();

}, false);

btnClearAll.addEventListener("click", function () {

    var elementsArr = tasksList.getElementsByTagName("li");

    while (elementsArr.length > 0) {
        elementsArr[0].remove();
    }

    allTasks = []
    selectedTask = null;
}, false);

btnClearSelected.addEventListener("click", function () {

    var elementsArr = tasksList.getElementsByTagName("li");
    var index = 0;

    while (elementsArr.length > 0 && index < elementsArr.length) {
        var attr = getClass(elementsArr[index]);
        if (attr.includes("strikethrough")) {
            if (attr.includes("selected")) {
                selectedTask = null;
            }
            elementsArr[index].remove();
            allTasks.splice(index, 1);
        }
        else {
            index++;
        }
    }
}, false);