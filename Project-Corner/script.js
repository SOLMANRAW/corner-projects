function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    var reminderTime = document.getElementById("reminderInput").value;
  
    if (taskText === "") {
      taskInput.style.borderColor = "red";
      document.getElementById("alert").innerText = "*Please enter a task*";
      taskInput.classList.add("shake");
      setTimeout(function () {
        taskInput.classList.remove("shake");
      }, 820);
      return;
    } else {
      taskInput.style.borderColor = "";
      document.getElementById("alert").innerHTML = "";
      taskInput.classList.remove("shake");
    }
  
    var currentTime = new Date().toLocaleTimeString();
    var taskList = document.getElementById("taskList");
    var newTask = document.createElement("li");
    newTask.className = "task-item";
    newTask.innerHTML =
      "<span class='time' style='font-size: 15px;'>" +
      currentTime +
      "</span> - <span style = 'font-size: 18px;'>" +
      taskText +
      "</span> <span class='reminder-time' style='font-size: 18px; color: white;'> (Reminder: " +
      reminderTime +
      ")</span> <button class='done-button' onclick='delete_task(this)'>Done</button> <button class='delete-button' onclick='delete_task(this)'>Abort</button>";
  
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
        setTimeout(function () {
          alert("Reminder: " + taskText);
        }, timeout);
      }
    }
  
    saveTasks();
  
    taskInput.value = "";
    document.getElementById("reminderInput").value = "";
  }

  function delete_task(element) {
    var taskItem = element.parentElement;
    if (element.classList.contains("done-button")) {
      taskItem.classList.add("move-left");
      taskItem.style.backgroundColor = " rgb(12, 239, 35)";
      taskItem.innerText = "";
    } else if (element.classList.contains("delete-button")) {
      taskItem.classList.add("move-right");
      taskItem.style.backgroundColor = "rgb(250, 8, 8)";
      taskItem.innerText = "";
    }
    taskItem.addEventListener("transitionend", function () {
      taskItem.remove();
    });
  }
  
  function saveTasks() {
    var tasks = [];
    document.querySelectorAll("#taskList .task-item").forEach(function (task) {
      var taskInfo = {
        time: task.querySelector(".time").textContent,
        text: task.querySelector("span:nth-child(2)").textContent,
        reminder: task.querySelector(".reminder-time").textContent,
      };
      tasks.push(taskInfo);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasksForHistory() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.forEach(function (task) {
        var newTask = document.createElement("li");
        newTask.className = "task-item";
        newTask.innerHTML =
          "<span class='time' style='font-size: 18px;'>" +
          task.time +
          "</span> - <span style = 'font-size: 18px;'>" +
          task.text +
          "</span> " +
          task.reminder;
        document.getElementById("taskList").appendChild(newTask);
      });
    }
  }
  
  function clearHistory() {
    localStorage.removeItem("tasks");
  
    const taskList = document.getElementById("taskList");
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  
    document.getElementById("cleared").innerText = "*History Cleared*";
  
    setTimeout(function () {
      document.getElementById("cleared").innerText = "";
    }, 2000);
  }
  
  const menuButton = document.getElementById('menuButton');
  const leftMenu = document.getElementById('leftMenu');
  const closeButton = document.getElementById('closeButton');
  let isMenuOpen = false;
  
  menuButton.addEventListener('click', function() {
    if (!isMenuOpen) {
      leftMenu.style.left = '0';
      isMenuOpen = true;
      leftMenu.style.zIndex = '1000000';
    } else {
      leftMenu.style.left = '-255px';
      isMenuOpen = false;
    }
  });

  closeButton.addEventListener('click', function() {
    leftMenu.style.left = '-255px';
    isMenuOpen = false;
    document.getElementById("cont").style.display = "none";

  });

  let contactClicked = false;
  const contactElement = document.getElementById('contactlist');
  const contElement = document.getElementById('cont');

  contactElement.addEventListener('click', function() {
    if (contactClicked) {
        contElement.style.display = 'none'; 
    } else {
        contElement.style.display = 'block'; 
    }
    contactClicked = !contactClicked; 
  });

  document.getElementById("goToHistory").addEventListener("click", function () {
 
    document.getElementById("loader").style.display = "block";
    document.getElementById("loader").style.zIndex = "1000000000";
    document.getElementById("loader").style.position = "fixed";
    leftMenu.style.left = '-255px';
    isMenuOpen = false;
    document.getElementById("menuButton").style.display = "none";
    setTimeout(function () {
      window.location.href = "history.html";
    }, 5000); 
    document.getElementById("overlay").style.display = "block";
    document.body.style.overflow = "hidden";
  });

  document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addTask();
      }
    });
  });

  let docTitle = document.title;
  window.addEventListener("blur", () => {
    document.title = "Please come back🥺";
  });
  window.addEventListener("focus", () => {
    document.title = docTitle;
  });