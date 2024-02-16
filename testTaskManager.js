import TaskManager from "./task-manager.js"
import Task from "./task.js";

var testManager = new TaskManager();

testManager.loadTasks('tasks.json');

testManager.printTasks();

const taskManager = new TaskManager();
taskManager.loadTasks('tasks.json');

// Добавляем новую задачу
const newTask = new Task(4, 'Созвон', 'Pending');
taskManager.addTask(newTask);

// Удаляем задачу с идентификатором 2
taskManager.deleteTask(2);

// Выводим список задач
taskManager.printTasks();