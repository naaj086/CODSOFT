const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

// Show tasks based on filter
function showTodo(filter) {
let liTag = "";
if (todos.length > 0) {
  todos.forEach((todo, id) => {
    let completed = todo.status === "completed" ? "checked" : "";
    if (filter === todo.status || filter === "all") {
      liTag += `
        <li class="task">
          <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
            <p class="${completed}">${todo.name}</p>
          </label>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
              <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
              <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </li>`;
    }
  });
} else {
  liTag = `<span>You don't have any tasks here</span>`;
}
taskBox.innerHTML = liTag;
clearAll.classList.toggle("active", todos.length > 0);
}

// Update task status
function updateStatus(selectedTask) {
const taskName = selectedTask.nextElementSibling;
todos[selectedTask.id].status = selectedTask.checked ? "completed" : "pending";
taskName.classList.toggle("checked", selectedTask.checked);
localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Show task menu
function showMenu(selectedTask) {
const menuDiv = selectedTask.nextElementSibling;
menuDiv.classList.add("show");
document.addEventListener("click", e => {
  if (!selectedTask.contains(e.target)) {
    menuDiv.classList.remove("show");
  }
});
}

// Edit task
function editTask(taskId, textName) {
taskInput.value = textName;
taskInput.focus();
taskInput.classList.add("active");
window.editId = taskId;
}

// Delete task
function deleteTask(deleteId, filter) {
todos.splice(deleteId, 1);
localStorage.setItem("todo-list", JSON.stringify(todos));
showTodo(filter);
}

// Clear all tasks
clearAll.addEventListener("click", () => {
todos = [];
localStorage.removeItem("todo-list");
showTodo("all");
});

// Add or edit task
function addTask() {
const userTask = taskInput.value.trim();
if (userTask) {
  if (window.editId !== undefined) {
    todos[window.editId].name = userTask;
    delete window.editId;
  } else {
    todos.push({ name: userTask, status: "pending" });
  }
  taskInput.value = "";
  taskInput.classList.remove("active");
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(document.querySelector(".filters .active").id);
}
}

// Initialize app
filters.forEach(btn => {
btn.addEventListener("click", () => {
  document.querySelector(".filters .active").classList.remove("active");
  btn.classList.add("active");
  showTodo(btn.id);
});
});

// Add task on Enter key press
taskInput.addEventListener("keyup", e => {
if (e.key === "Enter") {
  addTask();
}
});

showTodo("all");