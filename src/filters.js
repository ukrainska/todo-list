import { projects, selectedProjectName } from "./app-data.js";

export function renderProjectsList() {
    const projectsContainer = document.querySelector(".my-projects");
    const selectedProjectLabel = document.querySelector("#selectedProjectLabel");

    projectsContainer.textContent = "";
    selectedProjectLabel.textContent = selectedProjectName;

    projects.forEach(project => {
        const projectItem = document.createElement("h4");
        projectItem.textContent = `#${project.name}`;
        projectItem.dataset.projectName = project.name;

        if (project.name === selectedProjectName) {
            projectItem.classList.add("active-project");
        }

        projectsContainer.appendChild(projectItem);
    });
}