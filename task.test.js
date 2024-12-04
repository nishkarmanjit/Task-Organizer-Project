const { addTask, updateTask, deleteTask, filterTasks, sortTasks, searchTasks } = require('./task.js');
const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

// Test for adding a task
describe('addTask', () => {
    it('should send a POST request to add a task', async () => {
        const task = {
            Title: 'Test Task',
            Description: 'Test Task Description',
            Deadline: '2024-12-31',
            Status: 'Pending',
            Priority: 'High',
        };

        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Task added successfully' }));

        await addTask(task); // Pass the task to the function

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        }));
    });
});

// Test for updating a task status
describe('updateTask', () => {
    it('should send a PUT request to update a task status', async () => {
        const taskID = 1;
        const updatedTask = { Status: 'Completed' };

        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Task updated successfully' }));

        await updateTask(taskID, updatedTask); // Pass both taskID and updatedTask

        expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/tasks/${taskID}`, expect.objectContaining({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        }));
    });
});

// Test for deleting a task
describe('deleteTask', () => {
    it('should send a DELETE request to remove a task', async () => {
        const taskID = 1;

        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Task deleted successfully' }));

        await deleteTask(taskID);

        expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/tasks/${taskID}`, { method: 'DELETE' });
    });
});

// Test for filtering tasks by status
describe('filterTasks', () => {
    it('should filter tasks by status (Completed)', () => {
        const tasks = [
            { Title: 'Task 1', Status: 'Pending' },
            { Title: 'Task 2', Status: 'Completed' },
        ];

        const filteredTasks = filterTasks('completed', tasks);

        expect(filteredTasks).toEqual([{ Title: 'Task 2', Status: 'Completed' }]);
    });
});

// Test for sorting tasks by deadline
describe('sortTasks', () => {
    it('should sort tasks by deadline', () => {
        const tasks = [
            { Title: 'Task 1', Deadline: new Date('2024-12-01') },
            { Title: 'Task 2', Deadline: new Date('2024-12-03') },
            { Title: 'Task 3', Deadline: new Date('2024-12-02') },
        ];

        const sortedTasks = sortTasks(tasks);

        expect(sortedTasks).toEqual([
            { Title: 'Task 1', Deadline: new Date('2024-12-01') },
            { Title: 'Task 3', Deadline: new Date('2024-12-02') },
            { Title: 'Task 2', Deadline: new Date('2024-12-03') },
        ]);
    });
});

// Test for searching tasks
describe('searchTasks', () => {
    it('should filter tasks based on the search term', () => {
        const tasks = [
            { Title: 'Task 1', Description: 'Test description' },
            { Title: 'Task 2', Description: 'Another description' },
        ];

        const filteredTasks = searchTasks('Test', tasks);

        expect(filteredTasks).toEqual([{ Title: 'Task 1', Description: 'Test description' }]);
    });
});
