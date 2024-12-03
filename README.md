# 📝 Task Organizer

## 📖 Project Description

### Overview
Task Organizer is a **simple yet efficient application** built to help users seamlessly manage their tasks. It allows users to:
- Add, update, delete, and view tasks.
- Categorize tasks into **Pending**, **Completed**, and **Overdue** to prioritize effectively.

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

---

## 🛠️ System Overview

### Purpose
This document provides an overview of the high-level requirements and architecture for the Task Organizer application. It is intended for:
- 👩‍💻 Developers
- 🧑‍💼 Project Managers
- 🧪 Testers

### Scope
- Enable task management via a **user-friendly interface**.
- Store task data locally using browser storage (e.g., **LocalStorage**) or a lightweight database like **SQLite**.
- Focus on core task functionalities with **simplicity** and **robustness**.

---

## 🔧 Requirements

### ✅ Functional Requirements
- Allow users to **add tasks** with a title, description, and deadline.
- Enable users to **mark tasks** as Completed or Pending.
- Automatically **categorize tasks** as Pending, Completed, or Overdue.
- Provide functionality to **delete tasks**.
- Allow **sorting of tasks** by their deadlines.

### 🚀 Non-Functional Requirements
- **Performance**: Operations (add, update, delete, view) must execute within **2 seconds**.
- **Reliability**: The app must ensure **99% uptime** and handle interactions robustly.

---

## 🛠️ Technical Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla or React.js)
- **Backend** (Optional): Node.js with Express.js
- **Database**: SQLite or LocalStorage
- **Environment**: Modern browsers or a local Node.js server.

---

## 📊 Data Design

### Task Entity
| Field        | Type    | Description                            |
|--------------|---------|----------------------------------------|
| **TaskID**   | Integer | Unique identifier for each task.       |
| **Title**    | String  | Short, descriptive title of the task.  |
| **Description** | String | Detailed explanation of the task.    |
| **Deadline** | Date    | Deadline for task completion.          |
| **Status**   | String  | Task status: Pending, Completed, Overdue. |

---

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
