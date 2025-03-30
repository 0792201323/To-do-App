document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskTitle");
    const taskDesc = document.getElementById("taskDescription");
    const taskDueDate = document.getElementById("taskDueDate");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.createElement("button");
    darkModeToggle.innerText = "🌙 Dark Mode";
    darkModeToggle.onclick = toggleDarkMode;
    document.body.appendChild(darkModeToggle);
    
    function loadTasks(filter = "all") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
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
        loadTasks();
    }
    
    window.toggleTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };
    
    window.deleteTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };
    
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }
    
    addTaskBtn.addEventListener("click", addTask);
    loadTasks();
});
