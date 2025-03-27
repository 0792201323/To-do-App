// Store tasks in an array from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task
function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (title && description && dueDate) {
        const task = {
            id: Date.now(),
            title: title,
            description: description,
            dueDate: dueDate,
            completed: false,
        };

        tasks.push(task);
        saveTasks();
        displayTasks();
        resetForm();
    } else {
        alert('Please fill in all fields');
    }
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the current list before displaying tasks

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add(task.completed ? 'completed' : ''); // Mark completed tasks with 'completed' class
        taskElement.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.description}</small><br>
                <small>Due: ${new Date(task.dueDate).toLocaleString()}</small>
            </div>
            <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasks();
    displayTasks();
}

// Function to clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
}

// Function to reset the form inputs
function resetForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';
}

// Function to show tasks (all, completed, or outstanding)
function showTasks(filter) {
    let filteredTasks = tasks;

    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'outstanding') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add(task.completed ? 'completed' : '');
        taskElement.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.description}</small><br>
                <small>Due: ${new Date(task.dueDate).toLocaleString()}</small>
            </div>
            <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Initialize by displaying all tasks on page load
displayTasks();
