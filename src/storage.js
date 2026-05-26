const STORAGE_KEY = "todo-app-projects";

export function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return null;

    try {
        const parsed = JSON.parse(data);

        if (!Array.isArray(parsed) || parsed.length === 0) {
            return null;
        }

        return parsed;
    } catch (error) {
        console.error("Could not parse localStorage data:", error);
        return null;
    }
}