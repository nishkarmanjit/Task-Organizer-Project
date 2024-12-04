const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Deadline: { type: Date, required: true },
    Status: { type: String, required: true },
    Priority: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
