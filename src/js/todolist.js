// Helitaanka dhammaan elementska iyo id iyo classka
const inputField = document.querySelector(".todo_input-textarea");
const todoLists = document.querySelector(".todo_todoLists");
const pendingNum = document.querySelector(".todo_pending-num");
const clearButton = document.querySelector(".todo_clear-button");
let tasks = [];

// Ka hel macluumaadka userka iyadoo laga keenayo userka
let userInformation = JSON.parse(localStorage.getItem("userInformation"));

// kaydinta taskyada uu leeyahay user gaar ah
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    tasks = [];
  }
  renderTasks();
}

// Ka wac loadTasksFromLocalStorage si ay hawlaha uga soo gudbiso
loadTasksFromLocalStorage();

// kudar task hadi enter la taabto
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const inputVal = inputField.value.trim();
    if (inputVal.length > 0) {
      const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      const newTask = {
        id: taskId,
        task: inputVal,
        userId: userInformation.userId,
        completed: false,
      };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTask(newTask);
      inputField.value = "";
      updatePendingNum();
    }
  }
});

// Shaqada lagu qabanayo taskyada
function renderTasks() {
  todoLists.innerHTML = "";
  getTasksByUser(userInformation.userId).forEach(renderTask);
  updatePendingNum();
}

// Shaqada lagu qabanayo task keli ah
function renderTask(task) {
  const liTag = `<li class="todo_list todo_pending" onclick="handleStatus(event)" data-task-id="${
    task.id
  }">
    <input type="checkbox" ${task.completed ? "checked" : ""} />        
    <span class="todo_task">${task.id}.</span>
    <span class="todo_task">${task.task}</span>
    <i class="todo_uil uil-notes "><span class="material-symbols-outlined todo_note-icon" onclick="deleteTask(${
      task.id
    })">
    delete
    </span></i>
  </li>`;
  todoLists.insertAdjacentHTML("beforeend", liTag);
}

// Function eegaya haddii checked/ama unchecked yahay taskiga
function handleStatus(event) {
  const li = event.currentTarget;
  const checkbox = li.querySelector("input");
  checkbox.checked = !checkbox.checked;
  li.classList.toggle("todo_pending");
  updatePendingNum();
  const taskId = parseInt(li.dataset.taskId);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks[taskIndex].completed = checkbox.checked;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function tuuraya task
function deleteTask(taskId) {
  const li = document.querySelector(`[data-task-id="${taskId}"]`);
  const deletedTaskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(deletedTaskIndex, 1);
  li.remove();

  // Cusboonaysiinaya task idga
  for (let i = deletedTaskIndex; i < tasks.length; i++) {
    tasks[i].id = i + 1;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage

  updatePendingNum();
}

// Function cusboonaysinaya pending taskska
function updatePendingNum() {
  const pendingTasks = document.querySelectorAll(".todo_pending");
  pendingNum.textContent =
    pendingTasks.length === 0 ? "waxba" : pendingTasks.length;
}

// Tirtir kuli hadii buttonka la taabto
clearButton.addEventListener("click", () => {
  tasks = [];
  localStorage.removeItem("tasks");
  todoLists.innerHTML = "";
  pendingNum.textContent = "waxba";
});

// Function kala filter gareenaya hadba userka ku jira
function getTasksByUser(userId) {
  return tasks.filter((task) => task.userId === userId);
}

// Fiiri haddii taskiga la sameeyay kadibna beddel xaaladda ama stateka oo kadhig completed true
function checkCompletedTasks() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    const taskId = parseInt(checkbox.closest("li").dataset.taskId);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (tasks[taskIndex].completed) {
      checkbox.checked = true;
      checkbox.closest("li").classList.remove("todo_pending");
    }
  });
}

// uyeeraya functionka checkcompletedtask
checkCompletedTasks();
