document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

   
    function saveTasksToLocalStorage() {
        const tasks = [];

        taskList.querySelectorAll('li').forEach(item => {

            const taskText = item.firstChild.textContent.trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
            saveTasksToLocalStorage();
        };

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => createTaskElement(taskText));
    }


    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            createTaskElement(taskText);
            saveTasksToLocalStorage();
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });


    loadTasks();
});
