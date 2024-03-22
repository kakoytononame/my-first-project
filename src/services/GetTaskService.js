import { Status } from '../const.js';

const url = "http://localhost:5000"

export class TasksService {
    #boardTasks;
  
    async getBoardTasks() {
      await fetch(url + '/tasks')
        .then(response => response.json())
        .then(data => {
          this.#boardTasks = data.filter(function(element) {
            return element !== undefined;
          });
        });

        return this.#boardTasks;
    }

    async create(task) {
     
        task.id = getRandomInt(10000000);
        
        if(this.#boardTasks.includes(task.id)){
          task.id = getRandomInt(10000000);
        }
        
        task.status = Status.BACKLOG;

        task.description = task.title;
        
        this.#boardTasks.push(task);
        
      await fetch(url + '/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    }
  
    async remove(tasks) {
      var localTasks = [...tasks];

      var tasksIds = localTasks.map((task) => {
        return task.id;
      })

      await fetch(url + '/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({tasksIds})
      });

      // tasks.forEach(task => {
      //   delete this.#boardTasks[this.#boardTasks.findIndex(x => x.id == task.id)];
      // })
    }
    
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}