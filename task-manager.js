import fs from 'fs';
import Task from './task.js';

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    loadTasks(filepath) {
        try {
            const data = fs.readFileSync(filepath, 'utf8');
            const tasksData = JSON.parse(data);
            this.tasks = tasksData.map(task => new Task(task.id, task.description, task.status));
        } catch (err) {
            console.error('Ошибка чтения файла:', err);
        }
    }

    saveTasks(filepath) {
        try {
            const tasksData = JSON.stringify(this.tasks, null, 2);
            fs.writeFileSync(filepath, tasksData);
            console.log('Сохранение прошло успешно.');
        } catch (err) {
            console.error('Ошибка сохранения:', err);
        }
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks('tasks.json');
        this.emit('taskAdded', task);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks('tasks.json');
        this.emit('taskDeleted', taskId);
    }

    printTasks() {
        this.tasks.forEach(task => console.log(task.toString()));
    }
}

export default TaskManager;
