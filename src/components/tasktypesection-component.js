import { CreateTaskComponent } from './task-component.js';
import { TasksService } from '../services/GetTaskService.js';
import { BaseComponent } from './base/BaseComponent.js';
import { DeleteTaskButtonComponent } from './deletetaskbutton-component.js';
import { Status } from '../const.js';
import { EmptyTaskComponent } from './emptyTask.js';
import { rerender } from '../main.js';


const taskService = new TasksService();



export async function createTaskTypeSectionComponentTemplate() {
  
  return await AddTaskComponents();
}

export async function formSubmitHandler(evt) {

  const inputElement = document.querySelector(".NewTaskInput");
  const title = inputElement.value.trim();

  renderAfterAddingTask(title);

  document.addEventListener("DOMContentLoaded", async function() {
    await inizHandlers();
    await disableDeleteButton();
  });

  
}

export async function deleteTasksHandler(evt){

  var boardTasks = [... await taskService.getBoardTasks()];

  var tasksForDelete = boardTasks.filter(x => x.status == Status.BACKET);

  if(!Array.isArray(tasksForDelete)){
    await taskService.remove([tasksForDelete])
  }
  else{
    await taskService.remove(tasksForDelete)
  }

  rerender();

  await disableDeleteButton();
}

async function disableDeleteButton() {
  var boardTasks = [... await taskService.getBoardTasks()];
  var tasksForDelete = boardTasks.find(x => x.status == Status.BACKET);
  if (tasksForDelete === undefined) {

    var deleteButton = document.querySelector(".DeleteTask");
    deleteButton.disabled = true;
    deleteButton.style.backgroundColor = "black";
  }
  else{
    var deleteButton = document.querySelector(".DeleteTask");
    deleteButton.disabled = false;
    deleteButton.style.backgroundColor = "rgb(131, 37, 37)";
  }
}


async function AddTaskComponents() {

    var boardTasks = [... await taskService.getBoardTasks()];
    

    //disableDeleteButton();

    var resultComponent = '';

    var BackLogComponent = `<div class="TaskType" id = "BackLog">Бэклог</div>`;
    var InWorkComponent = `<div class="TaskType" id = "InWork">В работе</div>`;
    var TestingComponent = `<div class="TaskType" id = "Testing">На тестировании</div>`;
    var BucketComponent = `<div class="TaskType" id = "Bucket">Корзина</div>`;

    var components = [BackLogComponent, InWorkComponent, TestingComponent, BucketComponent]

    var emptyColumns = [];

    boardTasks.forEach(task => {
        switch(task.status){
          case "backlog": 
            components[0] += `${AddTask(task.id, task.description, task.status)}`
            break;
          case "inwork": 
            components[1] += `${AddTask(task.id, task.description, task.status)}`
            break;
          case "testing": 
            components[2] += `${AddTask(task.id, task.description, task.status)}`
            break;
          case "backet": 
            components[3] += `${AddTask(task.id, task.description, task.status)}`
            break;
        }  
      });
    
      
    
    
    
    

    var statuses = Object.values(Status);
    
    for (var i = 0; i< statuses.length; i++){
      let columnIsNotEmpty = boardTasks.find(task => task.status === statuses[i])

      if(!columnIsNotEmpty){
        components[i] += `${AddEmptyTask(boardTasks.length + i, statuses[i])}`
      }
    }
    
    components[3] += `${new DeleteTaskButtonComponent().getTemplate()}`

    components.forEach(component => {
        const newElement = document.createElement('div');
        newElement.className = 'TaskTypeSection';
        newElement.innerHTML = component;

        resultComponent += newElement.outerHTML;
    })
    
    return resultComponent;
}

async function renderAfterAddingTask(text){
  await taskService.create({title:text});
  rerender();
}

function AddTask (id, description, type) {
    var component = new CreateTaskComponent({id, title: description, status : type});
    return(`${component.getTemplate()}`)
}

function AddEmptyTask(id, status){
  var emptyTask = new EmptyTaskComponent({id, status});
  return(`${emptyTask.getTemplate()}`)
}

export class CreateTaskTypeSectionComponent extends BaseComponent{

  constructor() {
    super();
    

  }

  async getTemplate() {
  
    return await createTaskTypeSectionComponentTemplate();
  }

}