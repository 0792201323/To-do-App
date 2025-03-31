document.addEventListener("DOMContentLoaded", function () {
    const recycleBinList = document.getElementById("recycleBinList");

    function loadRecycleBin() {
        const recycleBin = JSON.parse(localStorage.getItem("recycleBin")) || [];
        recycleBinList.innerHTML = ""; // Clear current list

        if (recycleBin.length === 0) {
            recycleBinList.innerHTML = "<p>No tasks in the recycle bin.</p>";
            return;
        }

        recycleBin.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.title} - ${task.dueDate}</span>
                <button onclick="restoreTask(${task.id})">Restore</button>
                <button onclick="deleteForever(${task.id})">Delete Forever</button>
            `;
            recycleBinList.appendChild(li);
        });
    }

    window.restoreTask = function (taskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const recycleBin = JSON.parse(localStorage.getItem("recycleBin")) || [];

        const taskIndex = recycleBin.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const task = recycleBin.splice(taskIndex, 1)[0];
            tasks.push(task);

            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("recycleBin", JSON.stringify(recycleBin));

            loadRecycleBin();
        }
    };

    window.deleteForever = function (taskId) {
        const recycleBin = JSON.parse(localStorage.getItem("recycleBin")) || [];

        const taskIndex = recycleBin.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            recycleBin.splice(taskIndex, 1);
            localStorage.setItem("recycleBin", JSON.stringify(recycleBin));

            loadRecycleBin();
        }
    };

    loadRecycleBin();
});
