init();

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("text", e.target.id = "drag");
}

function drop(e) {
    var data = e.dataTransfer.getData("text");
    e.preventDefault();
    e.stopPropagation();
    if (e.target === document.body) {
        document.querySelector("#" + data).remove();
    }  else {
        if (e.target.className === "board") {
            e.target.appendChild(document.querySelector("#" + data));
        } else if (e.target.className === "item") {
            e.target.parentElement.appendChild(document.querySelector("#" + data));
        }
        document.querySelector("#" + data).removeAttribute("id");
    }
    updateNumber();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeAddTask(board, content, e) {
    var taskTitleField, newItem;
    if (e) {
        e.preventDefault();
    }
    taskTitleField = document.querySelector("#taskTitle");
        if (content === "input") {
        content = taskTitleField.value;
    }
    content = content.split("+");
    for (var i = 0; i < content.length; i++) {
        newItem = document.createElement("div");
        newItem.className = "item";
        newItem.draggable = true;
        newItem.textContent = content[i].trim();
        newItem.addEventListener("dragstart", drag);
        document.querySelector("#" + board).appendChild(newItem);
    }
    updateNumber();
}

function updateNumber() {
    var number, i, boards, boardId, items;
    boards = document.querySelectorAll(".board");
    for (i = 0; i < boards.length; i++) {
        boardId = document.querySelectorAll(".board")[i].id;
        number = document.querySelectorAll(".board .number");
        items = document.querySelectorAll("#" + boardId + " .item").length;
        number[i].textContent = "~" + items + "~";
    }
}

function init() {
    var boards, items, i, formField, taskTitleField, typeMessage;
    formField = document.querySelector("form");
    boards = document.querySelectorAll(".board");
    items = document.querySelectorAll(".item");
    taskTitleField = document.querySelector("#taskTitle");
    typeMessage = [
      "Add a task",
      "Drag to background to del",
    ];
    taskTitleField.addEventListener("focus", function() {
        this.value = "";
    });
    taskTitleField.addEventListener("blur", function() {
        if (this.value === "") {
            var index = getRandomInt(0, typeMessage.length);
            this.value = typeMessage[index];
        }
    });
    var index = getRandomInt(0, typeMessage.length);
    taskTitleField.value = typeMessage[index];
    for (i = 0; i < boards.length; i++) {
        boards[i].addEventListener("drop", drop);
        boards[i].addEventListener("dragover", allowDrop);
    }
    document.body.addEventListener("drop", drop);
    document.body.addEventListener("dragover", allowDrop);
    formField.addEventListener("submit", makeAddTask.bind(null, "toDo", "input"));
    window.addEventListener("unload", saveOverview);
    window.addEventListener("DOMContentLoaded", loadOverview);
}

function loadOverview() {
    var i, x, boardName, newItem;
    for (i = 0; i < localStorage.length; i++) {
        x = localStorage.key(i);
        boardName = x.substr(0, x.indexOf('_'));
        makeAddTask(boardName, localStorage.getItem(x));
    }
}

function saveOverview() {
    var items, i, boardName;
    localStorage.clear();
    items = document.querySelectorAll(".item");
    for (i = 0; i < items.length; i++) {
    boardName = items[i].parentElement.id;
    localStorage.setItem(boardName + "_" + i, items[i].textContent);
    }
}

