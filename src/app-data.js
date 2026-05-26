import { saveProjects, loadProjects } from "./storage.js";

function createTodo({
    id = crypto.randomUUID(),
    title = "New task",
    description = "",
    dueDate = "",
    priority = "medium",
    completed = false,
} = {}) {
    return {
        id,
        title,
        description,
        dueDate,
        priority,
        completed,
    };
}

function createProject(name) {
    return {
        id: crypto.randomUUID(),
        name,
        todos: [],
    };
}

const defaultProjects = [
    {
        id: crypto.randomUUID(),
        name: "Unfiltered",
        todos: [
            createTodo({
                title: "Create a TODO list",
                description: "",
                dueDate: "",
                priority: "medium",
                completed: false,
            }),
        ],
    },
];

export let projects = loadProjects() || defaultProjects;
export let selectedProjectName = "Unfiltered";

export function getSelectedProject() {
    return projects.find(project => project.name === selectedProjectName);
}

export function setSelectedProject(name) {
    selectedProjectName = name;
}

export function addProject(name) {
    const cleanName = name.trim();

    if (!cleanName) return;
    const exists = projects.some(
        project => project.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (exists) return;

    projects.push(createProject(cleanName));
    saveProjects(projects);
}

export function addTodoToProject(projectName, todoData = {}) {
    const project = projects.find(project => project.name === projectName);
    if (!project) return;

    const todo = createTodo(todoData);
    project.todos.push(todo);
    saveProjects(projects);
}

export function deleteTodo(projectName, todoId) {
    const project = projects.find(project => project.name === projectName);
    if (!project) return;

    project.todos = project.todos.filter(todo => todo.id !== todoId);
    saveProjects(projects);
}

export function updateTodo(projectName, todoId, updates) {
    const project = projects.find(project => project.name === projectName);
    if (!project) return;

    const todo = project.todos.find(todo => todo.id === todoId);
    if (!todo) return;

    Object.assign(todo, updates);
    saveProjects(projects);
}

export function deleteProject(projectName) {
    if (projectName === "Unfiltered") return;

    projects = projects.filter(project => project.name !== projectName);

    if (selectedProjectName === projectName) {
        selectedProjectName = "Unfiltered";
    }

    saveProjects(projects);
}