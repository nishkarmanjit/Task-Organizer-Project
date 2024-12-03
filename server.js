const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = []; // Task storage

// Endpoint to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint to add a new task
app.post('/tasks', (req, res) => {
    const task = req.body;
    task.TaskID = tasks.length + 1; // Generate TaskID
    tasks.push(task);
    res.status(201).json({ message: 'Task added successfully' });
});

// Endpoint to update task status
app.put('/tasks/:id', (req, res) => {
    const taskID = parseInt(req.params.id);
    const task = tasks.find(t => t.TaskID === taskID);
    if (task) {
        task.Status = req.body.Status || task.Status;
        res.json({ message: 'Task updated successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskID = parseInt(req.params.id);
    tasks = tasks.filter(t => t.TaskID !== taskID);
    res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
