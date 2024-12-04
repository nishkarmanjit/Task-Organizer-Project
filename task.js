let tasks = [];
let filteredTasks = tasks; // Array to hold tasks after filtering

// Base URL for API requests
const baseUrl = 'http://localhost:3000/tasks';

// Fetch all tasks from the server
function fetchTasks() {
    fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            return response.json();
        })
        .then(data => {
            tasks = data;
            filteredTasks = tasks;
            renderTasks();
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Function to add a new task
function addTask() {
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('priority').value;

    if (title && description && deadline) {
        const task = {
            Title: title,
            Description: description,
            Deadline: new Date(deadline),
            Status: getTaskStatus(deadline),
            Priority: priority
        };

        // Send POST request to add task
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add task');
                }
                return response.json();
            })
            .then(() => {
                fetchTasks(); // Refresh tasks list
                clearForm();
            })
            .catch(error => console.error('Error adding task:', error));
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to update task status (mark as completed)
function updateTask(taskID) {
    const task = tasks.find(task => task.TaskID === taskID);
    if (task) {
        const updatedTask = { Status: task.Status === 'Pending' ? 'Completed' : 'Pending' };

        // Send PUT request to update task
        fetch(`${baseUrl}/${taskID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update task');
                }
                return response.json();
            })
            .then(() => fetchTasks()) // Refresh tasks list
            .catch(error => console.error('Error updating task:', error));
    }
}

// Function to delete a task
function deleteTask(taskID) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Send DELETE request to delete task
        fetch(`${baseUrl}/${taskID}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete task');
                }
                return response.json();
            })
            .then(() => fetchTasks()) // Refresh tasks list
            .catch(error => console.error('Error deleting task:', error));
    }
}

// Function to get task status based on deadline
function getTaskStatus(deadline) {
    const currentDate = new Date();
    const taskDate = new Date(deadline);

    return taskDate < currentDate ? 'Overdue' : 'Pending';
}

// Render the task list
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
            <h3>${task.Title} - <span class="status ${task.Status}">${task.Status}</span> - <span class="priority ${task.Priority}">${task.Priority}</span></h3>
            <p>${task.Description}</p>
            <p>Deadline: ${new Date(task.Deadline).toLocaleDateString()}</p>
            <button class="update" onclick="updateTask(${task.TaskID})">Mark as ${task.Status === 'Pending' ? 'Completed' : 'Pending'}</button>
            <button class="delete" onclick="deleteTask(${task.TaskID})">Delete</button>
        `;

        taskList.appendChild(taskElement);
    });
}

// Fetch tasks when the page loads
window.onload = fetchTasks;

// Search tasks
function searchTasks() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    filteredTasks = tasks.filter(task =>
        task.Title.toLowerCase().includes(searchTerm) || task.Description.toLowerCase().includes(searchTerm)
    );
    renderTasks();
}

// Filter tasks by status (Pending, Completed, Overdue, All)
function filterTasks(status) {
    if (status === 'all') {
        filteredTasks = tasks;
    } else {
        filteredTasks = tasks.filter(task => task.Status.toLowerCase() === status.toLowerCase());
    }
    renderTasks();
}

// Sort tasks by deadline
function sortTasks() {
    tasks.sort((a, b) => new Date(a.Deadline) - new Date(b.Deadline));
    renderTasks();
}

// Clear the form after adding a task
function clearForm() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('priority').value = 'Medium';
}
