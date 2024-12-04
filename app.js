const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { addTask, fetchTasks } = require("./taskFunctions"); // Import task functions

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/taskOrganizer"; // Use environment variable for MongoDB URI

app.use(express.json()); // For parsing JSON requests

// Fetch tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await fetchTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Add task
app.post("/tasks", async (req, res) => {
    try {
        const taskData = req.body;

        // Example Validation (Basic)
        if (!taskData.title || !taskData.description) {
            return res.status(400).send("Title and description are required");
        }

        await addTask(taskData);
        res.status(201).send("Task added");
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/taskOrganizer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));

