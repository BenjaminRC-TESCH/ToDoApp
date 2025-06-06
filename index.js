'use strict';

let todoForm = document.querySelector('form');
let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');
let buttonNewTask = document.querySelector('.newTask');
let saveStateTask = document.querySelector('.saveStateTask');

let localTaskState = loadTasks() || [];

//Pagination controls
const tasksPerPage = 5;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', renderAllTasks);
saveStateTask.addEventListener('click', saveStateTasks);
buttonNewTask.addEventListener('click', addTask);

function getPaginatedTasks(tasks, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return tasks.slice(start, end);
}

function loadTasks() {
    return JSON.parse(localStorage.getItem('todoTasks'));
}

function saveTasks(tasks) {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function addTask(event) {
    event.preventDefault();

    const textTask = taskInput.value.trim();
    if (!textTask) {
        alert('Escribe algo');
        return;
    }

    const newTask = {
        id: crypto.randomUUID(),
        name: textTask,
        completed: false,
    };

    localTaskState.push(newTask);
    saveTasks(localTaskState);

    /*
    // Ajusta la página actual a la última página y renderiza todo
    const totalPages = Math.ceil(localTaskState.length / tasksPerPage);
    currentPage = totalPages;
    */
    renderAllTasks();

    taskInput.value = '';
}

function renderAllTasks() {
    taskList.innerHTML = '';

    const paginatedTasks = getPaginatedTasks(localTaskState, currentPage, tasksPerPage);
    paginatedTasks.forEach(renderTask);

    renderPaginationControls();
}

function renderPaginationControls() {
    const totalPages = Math.ceil(localTaskState.length / tasksPerPage);
    const container = document.getElementById('paginationControls');
    container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.disabled = i === currentPage;

        button.addEventListener('click', () => {
            currentPage = i;
            renderAllTasks();
        });

        container.appendChild(button);
    }
}

function renderTask(todo) {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.dataset.id = todo.id;

    const taskText = document.createElement('span');
    taskText.textContent = todo.name;
    taskText.classList.add('task-text');

    if (todo.completed) {
        listItem.classList.add('completed');
    }

    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = todo.completed;
    completedCheckbox.classList.add('checkTask');
    completedCheckbox.addEventListener('change', (event) => {
        toggleCheck(todo.id, event.target.checked);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<img src="./img/bin.png">`;
    deleteButton.classList.add('deleteTask');
    deleteButton.addEventListener('click', () => deleteTask(todo.id));

    const updateButton = document.createElement('button');
    updateButton.innerHTML = `<img src="./img/edit.png">`;
    updateButton.classList.add('updateTask');
    updateButton.addEventListener('click', () => updateTask(todo.id));

    listItem.appendChild(completedCheckbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    listItem.appendChild(updateButton);

    taskList.appendChild(listItem);
}

function toggleCheck(id, state) {
    const index = localTaskState.findIndex((task) => task.id === id);
    if (index === -1) return;

    localTaskState[index].completed = state;
    saveTasks(localTaskState);

    const listItem = taskList.querySelector(`li[data-id="${id}"]`);
    if (listItem) {
        listItem.classList.toggle('completed', state);
    }
}

function saveStateTasks() {
    saveTasks(localTaskState);
    alert('Cambios guardados correctamente');
}

function updateTask(id) {
    const index = localTaskState.findIndex((task) => task.id === id);
    if (index === -1) return;

    const nuevaTarea = prompt('Edita la tarea:', localTaskState[index].name);
    if (nuevaTarea !== null && nuevaTarea.trim() !== '') {
        localTaskState[index].name = nuevaTarea.trim();
        saveTasks(localTaskState);

        const listItem = taskList.querySelector(`li[data-id="${id}"]`);
        if (listItem) {
            listItem.querySelector('.task-text').textContent = nuevaTarea.trim();
        }
    }
    renderAllTasks();
}

function deleteTask(id) {
    const index = localTaskState.findIndex((task) => task.id === id);
    if (index === -1) return;

    localTaskState.splice(index, 1);
    saveTasks(localTaskState);

    const listItem = taskList.querySelector(`li[data-id="${id}"]`);
    if (listItem) {
        listItem.remove();
    }

    crenderAllTasks();
}
