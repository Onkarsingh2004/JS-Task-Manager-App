// DOM Elements
const addTaskForm = document.getElementById('addTaskForm');
const taskList = document.getElementById('tasks');

// Load tasks from LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <div class="task-details">
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <small>Due: ${task.dueDate}</small>
            </div>
            <div class="task-actions">
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add task
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        dueDate: document.getElementById('dueDate').value
    };

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskForm.reset();
    loadTasks();
});

// Delete task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1); // Remove task
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Load tasks on page load
loadTasks();
