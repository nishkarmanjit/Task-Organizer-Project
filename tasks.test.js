const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

// Mock DOM manipulation methods
document.body.innerHTML = `
    <div id="task-list"></div>
    <input id="task-title" />
    <input id="task-description" />
    <input id="task-deadline" />
    <select id="priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
    </select>
    <input id="search-bar" />
`;

const { fetchTasks, addTask, updateTask, deleteTask, searchTasks, filterTasks, sortTasks, getTaskStatus, clearForm } = require('./tasks'); // Adjust the path if necessary

describe('Task Management Functions', () => {
    test('fetchTasks should fetch and render tasks', async () => {
        const mockTasks = [
            { TaskID: 1, Title: 'Task 1', Description: 'Description 1', Deadline: '2024-12-31', Status: 'Pending', Priority: 'High' },
        ];
        fetchMock.mockResponseOnce(JSON.stringify(mockTasks));

        await fetchTasks();

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks');
        const taskList = document.getElementById('task-list');
        expect(taskList.children.length).toBe(1);
        expect(taskList.innerHTML).toContain('Task 1');
    });

    test('addTask should send POST request and refresh tasks', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Task added successfully' }));

        document.getElementById('task-title').value = 'New Task';
        document.getElementById('task-description').value = 'New Task Description';
        document.getElementById('task-deadline').value = '2024-12-31';
        document.getElementById('priority').value = 'High';

        await addTask();

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Title: 'New Task',
                Description: 'New Task Description',
                Deadline: new Date('2024-12-31'),
                Status: 'Pending',
                Priority: 'High',
            }),
        }));
    });

    test('updateTask should send PUT request to update status', async () => {
        const mockTasks = [
            { TaskID: 1, Title: 'Task 1', Status: 'Pending', Priority: 'High', Deadline: '2024-12-31' },
        ];
        fetchMock.mockResponseOnce(JSON.stringify(mockTasks));
        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Task updated successfully' }));

        await fetchTasks();
        await updateTask(1);

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks/1', expect.objectContaining({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Status: 'Completed' }),
        }));
    });

    test('deleteTask should send DELETE request and refresh tasks', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Task deleted successfully' }));

        window.confirm = jest.fn(() => true); // Mock confirm dialog to always return true

        await deleteTask(1);

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/tasks/1', { method: 'DELETE' });
    });

    test('getTaskStatus should return correct status', () => {
        const pastDate = '2023-12-31';
        const futureDate = '2025-12-31';

        expect(getTaskStatus(pastDate)).toBe('Overdue');
        expect(getTaskStatus(futureDate)).toBe('Pending');
    });

    test('searchTasks should filter tasks based on search term', () => {
        const mockTasks = [
            { Title: 'Task 1', Description: 'Test description' },
            { Title: 'Task 2', Description: 'Another description' },
        ];
        document.getElementById('search-bar').value = 'Test';
        tasks = mockTasks; // Assign tasks globally
        searchTasks();

        const taskList = document.getElementById('task-list');
        expect(taskList.innerHTML).toContain('Task 1');
        expect(taskList.innerHTML).not.toContain('Task 2');
    });

    test('filterTasks should filter tasks by status', () => {
        const mockTasks = [
            { Title: 'Task 1', Status: 'Pending' },
            { Title: 'Task 2', Status: 'Completed' },
        ];
        tasks = mockTasks; // Assign tasks globally

        filterTasks('Pending');

        expect(filteredTasks).toEqual([{ Title: 'Task 1', Status: 'Pending' }]);
    });

    test('sortTasks should sort tasks by deadline', () => {
        const mockTasks = [
            { Title: 'Task 1', Deadline: new Date('2024-12-03') },
            { Title: 'Task 2', Deadline: new Date('2024-12-01') },
            { Title: 'Task 3', Deadline: new Date('2024-12-02') },
        ];
        tasks = mockTasks; // Assign tasks globally

        sortTasks();

        expect(tasks).toEqual([
            { Title: 'Task 2', Deadline: new Date('2024-12-01') },
            { Title: 'Task 3', Deadline: new Date('2024-12-02') },
            { Title: 'Task 1', Deadline: new Date('2024-12-03') },
        ]);
    });

    test('clearForm should reset input fields', () => {
        document.getElementById('task-title').value = 'Test';
        document.getElementById('task-description').value = 'Description';
        document.getElementById('task-deadline').value = '2024-12-31';
        document.getElementById('priority').value = 'High';

        clearForm();

        expect(document.getElementById('task-title').value).toBe('');
        expect(document.getElementById('task-description').value).toBe('');
        expect(document.getElementById('task-deadline').value).toBe('');
        expect(document.getElementById('priority').value).toBe('Medium');
    });
});
