// Import the MongoDB Client
const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// Database and Collection Names
const dbName = "taskManagerDB";
const collectionName = "tasks";

// MongoDB Client
const client = new MongoClient(uri);

/**
 * Connect to MongoDB and return the collection
 */
async function connectToCollection() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB!");

        // Return the collection
        const database = client.db(dbName);
        return database.collection(collectionName);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

/**
 * Create a new task
 * @param {Object} task - Task object { title, description, deadline, completed }
 */
async function createTask(task) {
    const collection = await connectToCollection();
    try {
        const result = await collection.insertOne(task);
        console.log(`Task created with ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error creating task:", err);
    } finally {
        await client.close();
    }
}

/**
 * Retrieve all tasks
 */
async function getAllTasks() {
    const collection = await connectToCollection();
    try {
        const tasks = await collection.find().toArray();
        console.log("Tasks retrieved:", tasks);
        return tasks;
    } catch (err) {
        console.error("Error retrieving tasks:", err);
    } finally {
        await client.close();
    }
}

/**
 * Update a task by ID
 * @param {string} id - Task ID
 * @param {Object} updates - Updates to apply (e.g., { completed: true })
 */
async function updateTask(id, updates) {
    const collection = await connectToCollection();
    try {
        const result = await collection.updateOne({ _id: new MongoClient.ObjectId(id) }, { $set: updates });
        console.log(`Matched ${result.matchedCount} document(s) and updated ${result.modifiedCount} document(s)`);
    } catch (err) {
        console.error("Error updating task:", err);
    } finally {
        await client.close();
    }
}

/**
 * Delete a task by ID
 * @param {string} id - Task ID
 */
async function deleteTask(id) {
    const collection = await connectToCollection();
    try {
        const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });
        console.log(`Deleted ${result.deletedCount} task(s)`);
    } catch (err) {
        console.error("Error deleting task:", err);
    } finally {
        await client.close();
    }
}

// Export the functions for use in other files
module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
