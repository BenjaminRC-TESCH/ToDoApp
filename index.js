'use strict';

let todoForm = document.querySelector('form');
let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');
let buttonNewTask = document.querySelector('.newTask');

let saveStateTask = document.querySelector('.saveStateTask');

let localTaskState = loadTasks() || [];

document.addEventListener('DOMContentLoaded', getTasks);
saveStateTask.addEventListener('click', saveStateTasks);
buttonNewTask.addEventListener('click', addTask);

function loadTasks() {
    return JSON.parse(localStorage.getItem('todoTasks'));
}

function saveTasks(tasks) {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function addTask(event) {
    event.preventDefault();

    let textTask = taskInput.value.trim();

    if (!textTask) {
        alert('Escribe algo');
        return;
    }

    let tasks = loadTasks() || [];

    const newTask = {
        name: textTask,
        completed: false,
    };

    tasks.push(newTask);

    saveTasks(tasks);
    getTasks();

    taskInput.value = '';
}

function getTasks() {
    localTaskState = loadTasks() || [];

    taskList.innerHTML = '';

    localTaskState.forEach(function (todo, index) {
        const listItem = document.createElement('li');
        listItem.innerText = todo.name;
        listItem.classList.add('todo-item');

        //Completar
        const completedButton = document.createElement('input');
        completedButton.type = 'checkbox';
        completedButton.checked = todo.completed;
        completedButton.classList.add('checkTask');
        completedButton.addEventListener('change', (event) => {
            toggleCheck(index, event.target.checked, event.target);
        });

        // Botón eliminar
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<img src="./img/bin.png">`;
        deleteButton.classList.add('deleteTask');
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });

        // Botón actualizar
        const updateButton = document.createElement('button');
        updateButton.innerHTML = `<img src="./img/edit.png">`;
        updateButton.classList.add('updateTask');
        updateButton.addEventListener('click', () => {
            updateTask(index);
        });

        listItem.appendChild(completedButton);
        listItem.appendChild(deleteButton);
        listItem.appendChild(updateButton);
        taskList.appendChild(listItem);
    });
}

function toggleCheck(index, state, checkbox) {
    if (!localTaskState || !localTaskState[index]) return;

    localTaskState[index].completed = state;

    if (state) {
        checkbox.closest('li').classList.add('completed');
    } else {
        checkbox.closest('li').classList.remove('completed');
    }

    console.log(`Tarea ${index} marcada como: ${state}`);
}

function saveStateTasks() {
    saveTasks(localTaskState);
    alert('Cambios guardados correctamente');
}

function updateTask(index) {
    const nuevaTarea = prompt('Edita la tarea:', localTaskState[index].name);

    if (nuevaTarea !== null && nuevaTarea.trim() !== '') {
        localTaskState[index].name = nuevaTarea.trim();
        saveTasks(localTaskState);

        // Actualizar directamente el <li> correspondiente en el DOM
        const listItems = document.querySelectorAll('#taskList li');
        if (listItems[index]) {
            // Solo cambiamos el texto del nodo de texto (primer hijo)
            listItems[index].childNodes[0].textContent = nuevaTarea.trim();
        }
    }
}

function deleteTask(index) {
    localTaskState.splice(index, 1);
    saveTasks(localTaskState);

    const listItems = document.querySelectorAll('#taskList li');

    if (listItems[index]) {
        listItems[index].remove();
    }
}
