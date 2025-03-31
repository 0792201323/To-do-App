document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        
        const completedTasks = tasks.filter(task => task.completed);
        
        if (completedTasks.length === 0) {
            taskList.innerHTML = "<p>No completed tasks.</p>";
            return;
        }
        
        completedTasks.forEach((task, index) => {
            // Find the original index in the full tasks array
            const fullTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const originalIndex = fullTasks.findIndex(t => t.id === task.id);
            
            const li = document.createElement("li");
            li.className = "completed";
            li.innerHTML = `
                <span class="${task.priority}">${task.title} - ${task.description} (${task.dueDate})</span>
                <button onclick="toggleTaskFromCompleted(${originalIndex})">Mark Incomplete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add this function to handle toggling from completed page
    window.toggleTaskFromCompleted = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[index].completed = false;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.location.href = 'outstanding.html';
    };

    loadTasks();
});