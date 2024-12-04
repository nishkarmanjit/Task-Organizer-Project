# 📝 Task Organizer

## 📖 Project Description

### Overview
Task Organizer is a **simple yet efficient application** built to help users seamlessly manage their tasks. It allows users to:
- Add, update, delete, and view tasks.
- Categorize tasks into **All**, **Pending**, **Completed**, and **Overdue** to prioritize effectively.

### ✨ Features
- ➕ **Add tasks** with a title, description, and deadline.
- 📝 **Update tasks** to mark them as Completed or Pending.
- 🗑️ **Delete tasks** no longer needed.
- 📅 Automatically categorize tasks as **Pending**, **Completed**, or **Overdue** based on deadlines.
- 📋 **View and sort tasks** by deadline.

### 🕒 Revision History
| Date       | Change Description     | Author              |
|------------|------------------------|---------------------|
| 2024-10-30 | Initial draft created  | Nishkarmanjit Kaur  |
| 2024-11-25 | Added more features    | Nishkarmanjit Kaur  |
| 2024-12-01 | Added testing code     | Nishkarmanjit Kaur  |
---

## 🛠️ System Overview

### Purpose
This document provides an overview of the high-level requirements and architecture for the Task Organizer application. It is intended for:
- 👩‍💻 Developers
- 🧑‍💼 Project Managers
- 🧪 Testers

### Scope
- Enable task management via a **user-friendly interface**.
- This module covers the core task management functionality, including task creation, editing, deletion, and sorting by priority and status. The system will also support task categorization (e.g., pending, completed, overdue). 🔄

---

## 🔧 Requirements

### ✅ Functional Requirements
- **R1**: The system shall allow users to add tasks with a title, description, priority, and deadline. 📝  
- **R2**: The system shall allow users to edit existing tasks. ✏️  
- **R3**: The system shall allow users to delete tasks. 🗑️  
- **R4**: The system shall display tasks categorized as "Pending", "Completed", and "Overdue". 📋  
- **R5**: The system shall support sorting and filtering of tasks based on priority, status, and deadline. 🔍

### 🚀 Non-Functional Requirements
- **Performance**: The system shall handle up to 1000 concurrent users without performance degradation. 🚀  
- **Reliability**: The system shall have 99.9% uptime. 🔒  

---

## 🛠️ Technical Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla or React.js)
- **Backend** (Optional): Node.js with Express.js
- **Database**: SQLite or LocalStorage
- **Environment**: Modern browsers or a local Node.js server.

## Security Requirements
- **Authentication**: The system shall use username and password authentication. 🔑  
- **Data Encryption**: All sensitive data shall be encrypted both in transit and at rest. 🔒

## Traceability Matrix
| SRS Requirement | SDD Module |
|-----------------|------------|
| R1              | 5.1.1 (Task Creation), 5.1.2 (Validation) |
| R2              | 5.1.3 (Task Editing) |
| R3              | 5.1.4 (Task Deletion) |
---

### System Architecture

## Overview
The system architecture consists of three main components: frontend, backend, and database. The frontend is built using React for dynamic and responsive user interfaces. The backend, powered by Node.js, handles logic and interacts with the database (MongoDB) for persistent data storage. 🔧

## 📊 Data Design

### Task Entity
| Field      | Notes                                      | Type     |
|------------|--------------------------------------------|----------|
| `ID`       | Unique Identifier for each task           | DECIMAL  |
| `TITLE`    | Title of the task                         | VARCHAR  |
| `DESCRIPTION` | A brief description of the task         | TEXT     |
| `PRIORITY` | Task priority (High, Medium, Low)         | VARCHAR  |
| `DEADLINE` | Due date of the task                      | DATE     |
| `STATUS`   | Task status (Pending, Completed, Overdue) | VARCHAR  |

---


#### Dataset
- **User**: 
  - Attributes: UserID (PK), Username, Password, Email, Role
  - Relationships: One-to-Many with Tasks
- **Task**:
  - Attributes: TaskID (PK), Title, Description, Deadline, Priority, Status, UserID (FK)

---
### User Interface Design

## User Interface Design Overview
The Task Organizer UI is designed to be intuitive and responsive. It includes:
- **Task List**: Displays all tasks with options to view, edit, or delete.  
- **Task Form**: For adding and editing tasks.  
- **Filters**: For sorting tasks based on priority, deadline, or status.

## User Interface Navigation Flow
1. **Home Screen** → Task List  
2. **Task List** → Task Details (View/Edit)  
3. **Task List** → Add Task Form  
4. **Task Form** → Submit → Home Screen (Updated List)

## Use Cases / User Function Description
- **Add Task**: Users can input task details including title, description, priority, and deadline.
- **Edit Task**: Users can modify any details of an existing task.
- **Delete Task**: Users can remove tasks from the list.

---
### Test Plan Creation
The Test Plan defines the strategy, scope, resources, schedule, and activities required for testing.

- **Objective**: Validate new features (task management), ensure system stability.  
- **Scope**: Task creation, editing, deletion, and sorting functionality.  
- **Resources**: Testing environment setup, QA personnel.  
- **Schedule**: Testing to be conducted over 2 weeks.  
- **Test Cases**:  
  - **Test Case 1**: Add a new task → Ensure task is displayed in the task list.  
  - **Test Case 2**: Edit task details → Ensure changes are reflected in the task list.  
  - **Test Case 3**: Delete a task → Ensure task is removed from the task list.

## Test environment:

| Test Case | Input                             | Expected Output               | Actual Output  |
|-----------|-----------------------------------|-------------------------------|----------------|
| 1         | New task with title & description | Task added to the task list    | Task added     |
| 2         | Edit task details                | Task details updated          | Task updated   |
| 3         | Delete task                      | Task removed from the list    | Task removed   |

## UAT environment:

| Test Case | Input                             | Expected Output               | Actual Output  |
|-----------|-----------------------------------|-------------------------------|----------------|
| 1         | New task with title & description | Task added to the task list    | Task added     |


## 📁 Folder Structure
```plaintext
Task-Organizer/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── TaskList.js
│   │   ├── AddTaskForm.js
│   │   ├── TaskItem.js
│   ├── styles/
│   │   ├── styles.css
│   ├── App.js
│   ├── index.js
├── package.json
├── README.md
