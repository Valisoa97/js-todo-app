import "../styles/main.css"

// DOM element references
const addTaskBtn = document.getElementById("open-popup-btn")
const closePopupBtn = document.getElementById("close-popup-btn")
const createTaskBtn = document.getElementById("create-task-btn")
const popupContainer = document.getElementById("popup-container")
const createInput = document.getElementById("create-input")

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
  const task = createInput.value
  console.log("create task", task)
  // TODO: Add task to the list
  closePopup()
}

// Event listeners
addTaskBtn.addEventListener("click", openPopup)
closePopupBtn.addEventListener("click", closePopup)
createTaskBtn.addEventListener("click", createTask)

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
