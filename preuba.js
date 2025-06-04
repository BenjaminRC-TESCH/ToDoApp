let tasks = [];

const addTask = () => {
    let taskInput = document.getElementById('taskInput');
    let text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();
    }
};

const updateTask = (index) => {
    let taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};

const updateTaskList = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        console.log(task);

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkBox ${task.completed ? 'checked' : ''}">
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="updateTask(${index})">
                    <img src="./img/bin.png" onclick="deleteTask(${index})">
                </div>
            </div>
        `;

        listItem.addEventListener('change', () => {
            toggleTaskCompleted(index);
        });

        taskList.append(listItem);
    });
};

const toggleTaskCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();

    addTask();
});
