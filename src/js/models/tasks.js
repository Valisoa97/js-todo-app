export class Task {
  constructor(id, title, completed = false) {
    this.id = id
    this.title = title
    this.completed = completed
    this.createdAt = new Date()
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
  getTasks(sort = "desc") {
    if (sort === "asc") {
      return this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sort === "desc") {
      return this.tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    return this.tasks
  },
  generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  },
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id)
  },
}
