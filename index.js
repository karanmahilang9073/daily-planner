// load tasks from local storage and render
window.onload = function() {
    rendertasks();
};

function addtask() {
    const input = document.getElementById("taskinput");
    const tasktext = input.value.trim();
    if (tasktext === "") return;
    const task = { text: tasktext, done: false };
    const tasks = gettask();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    rendertasks();
}

function gettask() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function toggledone(index) {
    const tasks = gettask();
    if (!tasks[index]) return;
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    rendertasks();
}

function deletetask(index) {
    const tasks = gettask();
    if (index < 0 || index >= tasks.length) return;
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    rendertasks();
}

function rendertasks() {
    const tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";
    const tasks = gettask();
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.done ? "done" : "";
        li.innerHTML =
            `<span onclick="toggledone(${index})">${escapeHtml(task.text)}</span>` +
            ` <button class="delete-button" onclick="deletetask(${index})" aria-label="Delete task ${index}">Delete</button>`;
        tasklist.appendChild(li);
    });
}

// small utility to avoid injecting raw HTML from task text (prevents simple XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}