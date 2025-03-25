import "../styles/main.css"
import { Task, TaskManager } from "./models/tasks"

// DOM element references
const addTaskBtn = document.getElementById("open-popup-btn")
const closePopupBtn = document.getElementById("close-popup-btn")
const createTaskBtn = document.getElementById("create-task-btn")
const popupContainer = document.getElementById("popup-container")
const createInput = document.getElementById("create-input")
const todoList = document.getElementById("todo-list")
const emptyTaskImage = document.querySelector(".empty-task-image")
// Core functions
function openPopup() {
  document.body.style.overflow = "hidden"
  popupContainer.style.display = "block"
}

function closePopup() {
  document.body.style.overflow = "auto"
  popupContainer.style.display = "none"
  createInput.value = ""
}

function createTask() {
  const title = createInput.value
  // Validate input
  if (!title) {
    return
  }
  const newTask = new Task(TaskManager.generateId(), title)
  TaskManager.addTask(newTask)
  closePopup()

  // Add single task to DOM instead of redrawing everything
  if (TaskManager.getTasks().length === 1) {
    // First task - hide empty image
    emptyTaskImage.style.display = "none"
  }

  const taskElement = document.createElement("div")
  taskElement.innerHTML = templateTask(newTask)
  todoList.appendChild(taskElement.firstElementChild)
}

function deleteTask(taskId) {
  // Remove the task from DOM with animation
  const taskElement = document.getElementById(`task-${taskId}`)
  if (taskElement) {

    // Add the fade-out animation class
    taskElement.classList.add("task-deleting")

    // Remove from data model immediately
    TaskManager.deleteTask(taskId)

    // Wait for animation to complete
    setTimeout(() => {
      taskElement.remove()
      // Show empty state if needed
      if (TaskManager.getTasks().length === 0) {
        emptyTaskImage.style.display = "block"
      }
    }, 500) // Match the CSS transition duration (500ms)
  }
}

function templateTask(task) {
  return `
  <li id="task-${task.id}" class="flex items-center pb-3 mb-2 border-b border-[#6C63FF]">
    <div class="checkbox-container mr-3 cursor-pointer">
      <input type="checkbox" id="todo-${task.id}" class="hidden" />
      <label for="todo-${task.id}" class="block w-6 h-6 cursor-pointer">
        <img
          src="src/assets/svg/checkbox-unchecked.svg"
          class="checkbox-unchecked"
          alt="Unchecked"
        />
        <img
          src="src/assets/svg/checkbox-checked.svg"
          class="checkbox-checked hidden"
          alt="Checked"
        />
      </label>
    </div>
    <label for="todo-${task.id}" class="text-xl font-medium cursor-pointer">
      ${task.title}
    </label>
    <img class="delete-task-btn ml-auto cursor-pointer" src="src/assets/svg/trash.svg" alt="delete" data-task-id="${task.id}" />
  </li>
  `
}

function renderTasks() {
  todoList.innerHTML = ""
  if (TaskManager.getTasks().length === 0) {
    emptyTaskImage.style.display = "block"
  } else {
    emptyTaskImage.style.display = "none"
    TaskManager.getTasks().forEach(task => {
      todoList.innerHTML += templateTask(task)
    })
  }
}

// Event listeners
function setupEventListeners() {
  addTaskBtn.addEventListener("click", openPopup)
  closePopupBtn.addEventListener("click", closePopup)
  createTaskBtn.addEventListener("click", createTask)

  // Close popup when clicking outside
  popupContainer.addEventListener("click", event => {
    const createForm = document.getElementById("create-form")
    if (!createForm.contains(event.target) && event.target !== addTaskBtn) {
      closePopup()
    }
  })

  // Add keyboard support
  createInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      createTask()
    } else if (event.key === "Escape") {
      closePopup()
    }
  })

  todoList.addEventListener("click", event => {
    if (event.target.matches(".delete-task-btn")) {
      const taskId = event.target.dataset.taskId
      deleteTask(taskId)
    }
  })
}

setupEventListeners()

// Initial render of tasks on page load
renderTasks()
