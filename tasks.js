class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    addTask(title, description, dueDate, priority = "low") {
        if (!title.trim() || !dueDate) return;
        const task = {
            id: Date.now(),
            title,
            description,
            dueDate,
            priority,
            completed: false
        };
        this.tasks.push(task);
        this.saveTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleTaskCompletion(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    filterTasks(filter) {
        if (filter === "completed") return this.tasks.filter(task => task.completed);
        if (filter === "outstanding") return this.tasks.filter(task => !task.completed);
        return this.tasks;
    }

    clearCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}

export default TaskManager;
