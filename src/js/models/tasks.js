export class Task {
  constructor(id, title, completed = false) {
    this.id = id
    this.title = title
    this.completed = completed
    this.createdAt = new Date()
  }
}

export class TaskManager {
  static tasks = [
    ...Array.from({ length: 10 }, (_, i) => new Task(TaskManager.generateId(), `Task ${i + 1}`)),
  ]

  static addTask(task) {
    this.tasks.push(task)
  }

  static removeTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  static getTasks(sort = "desc") {
    if (sort === "asc") {
      return this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sort === "desc") {
      return this.tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    return this.tasks
  }

  static generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  static deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}
