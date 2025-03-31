document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        
        tasks.forEach((task) => {
            if (task.completed) {
                const li = document.createElement("li");
                li.className = task.completed ? "completed" : "";
                li.innerHTML = `
                    <span class="${task.priority}">${task.title} - ${task.description} (${task.dueDate})</span>
                `;
                taskList.appendChild(li);
            }
        });
    }

    loadTasks();
});
