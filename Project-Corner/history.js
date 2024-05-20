document.addEventListener("DOMContentLoaded", function() {
    loadHistoryTasks();
});

function loadHistoryTasks() {
    var taskList = document.getElementById("taskHistoryList"); // Ensure this ID exists in history.html
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(task) {
        var li = document.createElement('li');
        li.innerHTML = `<span>${task.time} - ${task.text}</span> <span>${task.reminder}</span>`;
        taskList.appendChild(li);
    });
}

