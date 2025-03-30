// Load tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a task
function addTask() {
    const titleInput = document.getElementById("taskTitle");
    const descriptionInput = document.getElementById("taskDescription");
    const dueDateInput = document.getElementById("taskDueDate");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!title || !dueDate) {
        alert("Please enter a task title and due date.");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description: description || "No description",
        dueDate,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    displayTasks();
    resetForm();
}

// Function to display tasks
function displayTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "outstanding") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.classList.add(task.completed ? "completed" : "");

        taskElement.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.description}</small><br>
                <small>Due: ${new Date(task.dueDate).toLocaleString()}</small>
            </div>
            <div class="task-actions">
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">❌</button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        displayTasks();
    }
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    displayTasks();
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskDueDate").value = task.dueDate;
        deleteTask(taskId);
    }
}

// Function to clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
}

// Function to reset the form inputs
function resetForm() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDueDate").value = "";
}

// Function to filter tasks
function showTasks(filter) {
    displayTasks(filter);
}

// Ensure tasks are displayed on load
document.addEventListener("DOMContentLoaded", () => {
    displayTasks();
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
});
