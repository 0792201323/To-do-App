document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        
        const outstandingTasks = tasks.filter(task => !task.completed);
        
        if (outstandingTasks.length === 0) {
            taskList.innerHTML = "<p>No outstanding tasks.</p>";
            return;
        }
        
        outstandingTasks.forEach((task, index) => {
            const fullTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const originalIndex = fullTasks.findIndex(t => t.id === task.id);
            
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.priority}">${task.title} - ${task.description} (${task.dueDate})</span>
                <button onclick="toggleTaskFromOutstanding(${originalIndex})">Mark Complete</button>
            `;
            taskList.appendChild(li);
        });
    }

    window.toggleTaskFromOutstanding = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[index].completed = true;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.location.href = 'completed.html';
    };

    loadTasks();
});