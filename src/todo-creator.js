import { getSelectedProject } from "./app-data.js";

export function renderSelectedProjectTasks() {
    const tasksContainer = document.querySelector(".tasks");
    tasksContainer.textContent = "";

    const today = new Date();
    tasksContainer.appendChild(createTodayHeading(today));

    const selectedProject = getSelectedProject();
    if (!selectedProject) return;

    selectedProject.todos.forEach(todo => {
        const task = createTaskElement(todo);
        tasksContainer.appendChild(task);
    });
}

function createTodayHeading(today) {
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const date = document.createElement("h2");
    date.id = "date";
    date.textContent = `TODAY: ${month} / ${day}`;

    return date;
}

function createTextElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

function createTitleRow(todo) {
    const titleRow = document.createElement("div");
    titleRow.classList.add("title-row");

    const title = createTextElement("h3", todo.title || "Untitled task");
    title.classList.add("title");

    const editBtn = createTextElement("button", "edit");
    editBtn.classList.add("edit-btn");

    const deleteBtn = createTextElement("button", "delete");
    deleteBtn.classList.add("delete-btn");

    titleRow.appendChild(title);
    titleRow.appendChild(editBtn);
    titleRow.appendChild(deleteBtn);

    return titleRow;
}

function createDescription(todo) {
    const textarea = document.createElement("textarea");
    textarea.className = "todoDetails";
    textarea.name = "todoDetails";
    textarea.placeholder = "I want to start...";
    textarea.value = todo.description || "";
    textarea.disabled = true;

    return textarea;
}

function createDueDateRow(todo) {
    const row = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = "due date: ";

    const input = document.createElement("input");
    input.type = "date";
    input.className = "due-date-input";
    input.value = todo.dueDate || "";

    row.appendChild(label);
    row.appendChild(input);

    return row;
}

function createPriorityRow(todo) {
    const row = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = "priority: ";

    const select = document.createElement("select");
    select.className = "priority-select";

    ["low", "medium", "high"].forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        if (todo.priority === priority) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    row.appendChild(label);
    row.appendChild(select);

    return row;
}

function createCompletedRow(todo) {
    const row = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = "done ";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "completed-checkbox";
    checkbox.checked = todo.completed || false;

    row.appendChild(label);
    row.appendChild(checkbox);

    return row;
}

function createTaskMeta(todo) {
    const taskMeta = document.createElement("div");
    taskMeta.classList.add("additional");

    taskMeta.appendChild(createDueDateRow(todo));
    taskMeta.appendChild(createPriorityRow(todo));
    taskMeta.appendChild(createCompletedRow(todo));

    return taskMeta;
}

function createTaskElement(todo) {
    const task = document.createElement("div");
    task.classList.add("default-task");
    task.dataset.id = todo.id;

    if (todo.priority) {
        task.dataset.priority = todo.priority;
    }

    if (todo.completed) {
        task.classList.add("completed-task");
    }

    task.appendChild(createTitleRow(todo));
    task.appendChild(createDescription(todo));
    task.appendChild(createTaskMeta(todo));

    return task;
}