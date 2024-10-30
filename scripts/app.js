const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const showAllButton = document.getElementById("showAll");
const showCompletedButton = document.getElementById("showCompleted");
const showActiveButton = document.getElementById("showActive");

// Массив для хранения задач
let tasks = [];

// Функция вывода задач
const refreshTaskList = (filter = "all") => {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "active") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
                        <span class="edit">${task.text}</span>
                        <div>
                            <button onclick="toggleComplete(${index})">${task.completed ? "Не выполнено" : "Выполнено"}</button>
                            <button class="delete" onclick="deleteTask(${index})">Удалить</button>
                        </div>
        `;
        li.querySelector(".edit").addEventListener("dblclick", () => {
            const newTaskText = prompt("Редактировать задачу: ", task.text);
            if (newTaskText) {
                tasks[index].text = newTaskText;
                refreshTaskList();
            }
        });

        taskList.appendChild(li);
    });
};

// Функция добавления задачи
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({text: taskText, completed: false}); // Добавляем задачу в массив в виде объекта
        taskInput.value = "";
        refreshTaskList();
    }
};

// Функция пометки задачи выполнено/невыполнено
const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    refreshTaskList();
};

// Функция для удаления задачи
const deleteTask = (index) => {
    tasks.splice(index, 1);
    refreshTaskList();
};

// Обработчики событий
showAllButton.addEventListener("click", () => refreshTaskList("all"));
showCompletedButton.addEventListener("click", () => refreshTaskList("completed"));
showActiveButton.addEventListener("click", () => refreshTaskList("active"));

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});