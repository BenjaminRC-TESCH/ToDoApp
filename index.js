let todoForm = document.querySelector('form');
let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');
let buttonNewTask = document.querySelector('.newTask');

let tasks = [];

document.addEventListener('DOMContentLoaded', getTasks);
buttonNewTask.addEventListener('click', addTask);
// filterOption.addEventListener('change', filterTodo);

function addTask(event) {
    event.preventDefault();

    let textTask = taskInput.value.trim();

    if (!textTask) {
        alert('Escribe algo');
        return;
    }

    saveTasksLocalStorage(textTask);
    getTasks();

    taskInput.value = '';
}

function getTasks() {
    let todos;
    if (localStorage.getItem('todoTasks') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todoTasks'));
    }

    taskList.innerHTML = '';

    todos.forEach(function (todo, index) {
        const listItem = document.createElement('li');
        listItem.innerText = todo.name;
        listItem.classList.add('todo-item');

        //Completar
        const completedButton = document.createElement('input');
        completedButton.type = 'checkbox';
        completedButton.checked = todo.completed;
        completedButton.classList.add('checkTask');
        completedButton.addEventListener('change', (event) => {
            toggleCheck(index, event.target.checked);
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

function toggleCheck(index, state) {
    let todos = JSON.parse(localStorage.getItem('todoTasks'));

    console.log(index, state);

    if (index !== undefined && index !== null) {
        console.log('estamos en el if del toggle');
        todos[index].completed = state;
        localStorage.setItem('todoTasks', JSON.stringify(todos));
        getTasks();
    }
}

function updateTask(index) {
    let todos = JSON.parse(localStorage.getItem('todoTasks'));
    const nuevaTarea = prompt('Edita la tarea:', todos[index].name);

    if (nuevaTarea !== null && nuevaTarea.trim() !== '') {
        todos[index].name = nuevaTarea.trim();
        localStorage.setItem('todoTasks', JSON.stringify(todos));
        getTasks();
    }
}

function deleteTask(index) {
    let todos = JSON.parse(localStorage.getItem('todoTasks'));
    todos.splice(index, 1);
    localStorage.setItem('todoTasks', JSON.stringify(todos));
    getTasks();
}

function saveTasksLocalStorage(task) {
    let todoTasks;

    if (localStorage.getItem('todoTasks') === null) {
        todoTasks = [];
    } else {
        todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
    }

    const newTask = {
        name: task,
        completed: false,
    };

    todoTasks.push(newTask);
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
}
