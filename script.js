document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskTitle");
    const taskDesc = document.getElementById("taskDescription");
    const taskDueDate = document.getElementById("taskDueDate");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskView = document.getElementById("taskView");
    const darkModeToggle = document.createElement("button");
    darkModeToggle.innerText = localStorage.getItem("darkMode") === "enabled" ? "☀️ Light Mode" : "🌙 Dark Mode";
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.onclick = toggleDarkMode;
    document.body.appendChild(darkModeToggle);

    function loadTasks(filter = "all") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        taskView.style.display = "block";  // Show task view

        // Filter tasks based on the selected filter (completed, outstanding)
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "outstanding" && task.completed) return;
            
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
                <span class="${task.priority}" onclick="toggleTask(${index})">${task.title} - ${task.description} (${task.dueDate})</span>
                <button onclick="deleteTask(${index})">🗑️</button>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        if (taskInput.value.trim() === "" || taskDueDate.value === "") return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ 
            title: taskInput.value, 
            description: taskDesc.value, 
            dueDate: taskDueDate.value, 
            completed: false,
            priority: "priority-low"
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        taskDesc.value = "";
        taskDueDate.value = "";
        loadTasks();  // Reload tasks after adding a new one
    }

    window.toggleTask = function (index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();  // Reload tasks after toggling
    };

    window.deleteTask = function (index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();  // Reload tasks after deletion
    };

    window.clearCompletedTasks = function () {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => !task.completed);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();  // Reload tasks after clearing completed
    };

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.innerText = "🌙 Dark Mode";
        }
    }

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    addTaskBtn.addEventListener("click", addTask);
    loadTasks();  // Load all tasks initially

});
