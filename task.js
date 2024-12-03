let tasks = [];

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadline = document.getElementById('task-deadline').value;

    if (title && description && deadline) {
        const task = {
            TaskID: tasks.length + 1,
            Title: title,
            Description: description,
            Deadline: new Date(deadline),
            Status: getTaskStatus(deadline)
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

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
      <h3>${task.Title} - <span class="status">${task.Status}</span></h3>
      <p>${task.Description}</p>
      <p>Deadline: ${task.Deadline.toLocaleDateString()}</p>
      <button class="delete" onclick="deleteTask(${task.TaskID})">Delete</button>
    `;

        taskList.appendChild(taskElement);
    });
}

function deleteTask(taskID) {
    tasks = tasks.filter(task => task.TaskID !== taskID);
    renderTasks();
}

function clearForm() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-deadline').value = '';
}
