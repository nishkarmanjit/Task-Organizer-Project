let tasks = [];
let filteredTasks = tasks; // Array to hold tasks after filtering

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('priority').value;

    if (title && description && deadline) {
        const task = {
            TaskID: tasks.length + 1,
            Title: title,
            Description: description,
            Deadline: new Date(deadline),
            Status: getTaskStatus(deadline),
            Priority: priority
        };

        tasks.push(task);
        renderTasks();
        clearForm();
    } else {
        alert('Please fill in all fields.');
    }
}

function getTaskStatus(deadline) {
    const currentDate = new Date();
    const taskDate = new Date(deadline);

    if (taskDate < currentDate) {
        return 'Overdue';
    } else {
        return 'Pending';
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
            <h3>${task.Title} - <span class="status ${task.Status}">${task.Status}</span> - <span class="priority ${task.Priority}">${task.Priority}</span></h3>
            <p>${task.Description}</p>
            <p>Deadline: ${task.Deadline.toLocaleDateString()}</p>
            <button class="update" onclick="updateTask(${task.TaskID})">Mark as Completed</button>
            <button class="delete" onclick="deleteTask(${task.TaskID})">Delete</button>
        `;

        taskList.appendChild(taskElement);
    });
}

function updateTask(taskID) {
    const task = tasks.find(task => task.TaskID === taskID);
    if (task) {
        // Toggle between Pending and Completed
        if (task.Status === 'Pending') {
            task.Status = 'Completed';
        } else if (task.Status === 'Completed') {
            task.Status = 'Pending';
        }
        // Re-render tasks with updated status
        renderTasks();
    }
}

function deleteTask(taskID) {
    tasks = tasks.filter(task => task.TaskID !== taskID);
    renderTasks();
}

function sortTasks() {
    tasks.sort((a, b) => a.Deadline - b.Deadline);
    renderTasks();
}

function filterTasks(status) {
    if (status === 'all') {
        filteredTasks = tasks;
    } else {
        filteredTasks = tasks.filter(task => task.Status.toLowerCase() === status.toLowerCase());
    }
    renderTasks();
}

function searchTasks() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    filteredTasks = tasks.filter(task =>
        task.Title.toLowerCase().includes(searchTerm) || task.Description.toLowerCase().includes(searchTerm)
    );
    renderTasks();
}

function clearForm() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('priority').value = 'Medium';
}

// Call this function when the page loads to render all tasks
window.onload = renderTasks;
