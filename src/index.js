import "./styles.css";
import { projects } from "./app-data.js";
import { renderProjectsList } from "./filters.js";
import { renderSelectedProjectTasks } from "./todo-creator.js";
import { setupUI } from "./tasks-events.js";

console.log("projects:", projects); 

renderProjectsList();
renderSelectedProjectTasks();
setupUI();


