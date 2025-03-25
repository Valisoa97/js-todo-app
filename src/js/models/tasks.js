export class Task {
  constructor(id, title, completed = false) {
    this.id = id
    this.title = title
    this.completed = completed
  }
}

export const TaskManager = {
  tasks: [],
  addTask(task) {
    this.tasks.push(task)
  },
  removeTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id)
  },
  getTasks() {
    return this.tasks
  },
  generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  },
}
