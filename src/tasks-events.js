import {
    projects,
    selectedProjectName,
    setSelectedProject,
    addProject,
    addTodoToProject,
    updateTodo,
    deleteTodo,
} from "./app-data.js";

import { renderProjectsList } from "./filters.js";
import { renderSelectedProjectTasks } from "./todo-creator.js";

export function setupUI() {
    setupProjectClicks();
    setupTaskButtons();
    setupTaskInputs();
    setupAddTaskButton();
    setupAddProjectButton();
}

function rerenderApp() {
    renderProjectsList();
    renderSelectedProjectTasks();
}

function setupAddTaskButton() {
    const addTaskButton = document.querySelector("#addTaskBtn");

    addTaskButton.addEventListener("click", () => {
        addTodoToProject(selectedProjectName, {
            title: "New task",
            description: "",
            dueDate: "",
            priority: "medium",
            completed: false,
        });

        rerenderApp();
    });
}

function setupAddProjectButton() {
    const addProjectButton = document.querySelector("#addProjectBtn");

    addProjectButton.addEventListener("click", () => {
        const name = prompt("Enter project name:");

        if (!name) return;

        addProject(name);
        rerenderApp();
    });
}

function setupProjectClicks() {
    document.addEventListener("click", event => {
        const projectTitle = event.target.closest(".my-projects h4");
        if (!projectTitle) return;

        const projectName = projectTitle.dataset.projectName;
        setSelectedProject(projectName);
        rerenderApp();
    });
}

function setupTaskButtons() {
    document.addEventListener("click", event => {
        const task = event.target.closest(".default-task");
        if (!task) return;

        const todoId = task.dataset.id;

        if (event.target.classList.contains("edit-btn")) {
            startTitleEditing(task);
        }

        if (event.target.classList.contains("delete-btn")) {
            deleteTodo(selectedProjectName, todoId);
            rerenderApp();
        }
    });
}

function startTitleEditing(task) {
    const title = task.querySelector(".title");
    if (!title) return;

    const existingInput = task.querySelector(".title-input");
    if (existingInput) return;

    const input = document.createElement("input");
    input.type = "text";
    input.value = title.textContent;
    input.className = "title-input";

    title.replaceWith(input);
    input.focus();

    const save = () => {
        const todoId = task.dataset.id;
        updateTodo(selectedProjectName, todoId, {
            title: input.value.trim() || "Untitled task",
        });
        rerenderApp();
    };

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") save();
    });

    input.addEventListener("blur", save);
}

function setupTaskInputs() {
    document.addEventListener("change", event => {
        const task = event.target.closest(".default-task");
        if (!task) return;

        const todoId = task.dataset.id;

        if (event.target.classList.contains("due-date-input")) {
            updateTodo(selectedProjectName, todoId, {
                dueDate: event.target.value,
            });
            rerenderApp();
        }

        if (event.target.classList.contains("priority-select")) {
            updateTodo(selectedProjectName, todoId, {
                priority: event.target.value,
            });
            rerenderApp();
        }

        if (event.target.classList.contains("completed-checkbox")) {
            updateTodo(selectedProjectName, todoId, {
                completed: event.target.checked,
            });
            rerenderApp();
        }
    });

    document.addEventListener("dblclick", event => {
        const textarea = event.target.closest(".todoDetails");
        if (!textarea) return;

        textarea.readOnly = false;
        textarea.focus();
    });

    document.addEventListener("blur", event => {
        const textarea = event.target.closest(".todoDetails");
        if (!textarea) return;

        const task = textarea.closest(".default-task");
        const todoId = task.dataset.id;

        updateTodo(selectedProjectName, todoId, {
            description: textarea.value,
        });

        textarea.readOnly = true;
        rerenderApp();
    }, true);
}