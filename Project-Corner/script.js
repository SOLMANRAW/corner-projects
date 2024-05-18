function addTask(){
    var taskInput = document.getElementById("taskInput"); 
    var taskText = taskInput.value.trim(); 
    var reminderTime = document.getElementById("reminderInput").value;
    var taskContent = document.getElementById("taskInput").value;

    localStorage.setItem("taskContent", "taskList");

    if (taskText === ""){
        taskInput.style.borderColor="red";
        document.getElementById("alert").innerText = "*Please enter a task*";
        taskInput.classList.add("shake"); 
        setTimeout(function() { taskInput.classList.remove("shake"); }, 820); 
        return; 
    }
    else {
        taskInput.style.borderColor = "";
        document.getElementById("alert").innerHTML = "";
        taskInput.classList.remove("shake"); 
    }

    var currentTime = new Date().toLocaleTimeString(); 
    var taskList = document.getElementById("taskList");
    var newTask = document.createElement("li");
    newTask.className = 'task-item'; 
    newTask.innerHTML = "<span class='time' style='font-size: 15px;'>" + currentTime + "</span> - <span style = 'font-size: 12px;'>" + taskText + "</span> <span class='reminder-time' style='font-size: 12px; color: white;'> (Reminder: " + reminderTime + ")</span> <button class='done-button' onclick='delete_task(this)'>Done</button> <button class='delete-button' onclick='delete_task(this)'>Abort</button>";

    if (taskList.firstChild) {
        taskList.insertBefore(newTask, taskList.firstChild);
    } else {
        taskList.appendChild(newTask);
    }

    
    if (reminderTime) {
        var reminderDate = new Date(reminderTime);
        var now = new Date();
        var timeout = reminderDate.getTime() - now.getTime();
        if (timeout > 0) {
            setTimeout(function() {
                alert("Reminder: " + taskText);
            }, timeout);
        }
    }

    taskInput.value = "";
    document.getElementById("reminderInput").value = ""; 
}

function delete_task(element){
    var taskItem = element.parentElement;
    if (element.classList.contains('done-button')) {
        taskItem.classList.add('move-left');
        taskItem.style.backgroundColor = ' rgb(12, 239, 35)';
        taskItem.innerText = "";

    }
     else if (element.classList.contains('delete-button')) {
        taskItem.classList.add('move-right');
        taskItem.style.backgroundColor = 'rgb(250, 8, 8)';
        taskItem.innerText = "";
    }
    taskItem.addEventListener('transitionend', function() {
        taskItem.remove();
    });
}


document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); 
            addTask();
        }
    });
});

function load() {
    localStorage.getItem("taskContent");
}