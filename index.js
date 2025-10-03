//load task from local storage
window.onload = function(){
    loadtask()
};

function addtask(){
    const input = document.getElementById("taskinput");
    const tasktext = input.value.trim();
    if(tasktext==="") return;
    const task = {
        text : tasktext,
        done : false
    };
    const tasks = gettask();
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    input.value = " ";
    rendertasks();
}

function gettask(){
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadtask(){
    rendertasks();
}

function toggledone(index){
    const tasks = gettask();
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks",JSON.stringify(tasks))
    rendertasks();
}

function deletetask(index){
    const task = gettask();
    task.splice(index, 1);
    localStorage.setItem("task",JSON.stringify(task));
    rendertasks();
};

function rendertasks(){
    const tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";
    const tasks = gettask();
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.done ? "done" : "";
        li.innerHTML = 
        `<span onClick= "toggledone(index)">${task.text}</span>
        <span class="delete-button" onClick="deletetask(${index})"></span>`;
        tasklist.appendChild(li)
    })
}