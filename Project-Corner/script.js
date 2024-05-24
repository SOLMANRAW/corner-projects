function addTask(){
    var taskInput = document.getElementById("taskInput"); 
    var taskText = taskInput.value.trim(); 
    var reminderTime = document.getElementById("reminderInput").value;

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
    newTask.innerHTML = "<span class='time' style='font-size: 15px;'>" + currentTime + "</span> - <span style = 'font-size: 18px;'>" + taskText + "</span> <span class='reminder-time' style='font-size: 18px; color: white;'> (Reminder: " + reminderTime + ")</span> <button class='done-button' onclick='delete_task(this)'>Done</button> <button class='delete-button' onclick='delete_task(this)'>Abort</button>";

    if (taskList.firstChild) {
        taskList.insertBefore(newTask, taskList.firstChild);
    } else {
        taskList.appendChild(newTask);
    }

    // Save tasks to local storage
    saveTasks();

    taskInput.value = "";
    document.getElementById("reminderInput").value = ""; 
}

function saveTasks() {
    var tasks = [];
    document.querySelectorAll('#taskList .task-item').forEach(function(task) {
        var taskInfo = {
            time: task.querySelector('.time').textContent,
            text: task.querySelector('span:nth-child(2)').textContent,
            reminder: task.querySelector('.reminder-time').textContent
        };
        tasks.push(taskInfo);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            var newTask = document.createElement("li");
            newTask.className = 'task-item'; 
            newTask.innerHTML = "<span class='time' style='font-size: 18px;'>" + task.time + "</span> - <span style = 'font-size: 18px;'>" + task.text + "</span> " + task.reminder + "<button class='done-button' onclick='delete_task(this)'>Done</button> <button class='delete-button' onclick='delete_task(this)'>Abort</button>";
            document.getElementById("taskList").appendChild(newTask);
        });
    }
}

function loadTasksForHistory() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            var newTask = document.createElement("li");
            newTask.className = 'task-item'; 
            newTask.innerHTML = "<span class='time' style='font-size: 18px;'>" + task.time + "</span> - <span style = 'font-size: 18px;'>" + task.text + "</span> " + task.reminder;
            document.getElementById("taskList").appendChild(newTask);
        });
    }
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

function clearHistory() {
    // Clear local storage
    localStorage.removeItem('tasks');

    // Clear the display
    const taskList = document.getElementById('taskList');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Optionally, display a message or handle the empty state
    console.log("History cleared.");
}

document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); 
            addTask();
        }
    });
    // loadTasks(); // Comment out or remove this line
});

let docTitle = document.title;
window.addEventListener("blur", () =>{
    document.title = "Siii🥺❤️";
})
window.addEventListener("focus", () =>{
    document.title = docTitle;
})