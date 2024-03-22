import {BaseComponent} from './base/BaseComponent.js';

function createTaskComponentTemplate(id, text, taskType, description) {
    return (
      changeTaskText(text, taskType)
    );
}

const changeTaskText = (text, taskType) => {

    return(`
    <div class="Task" id= "${taskType}">
        <p>${text}</p>
    </div>`)
    
}


export class CreateTaskComponent extends BaseComponent{

  #id = null;
  #status = null;
  #description = null;
  #title = null;


  constructor({id, title, status, description}){
    super();
    this.#id = id;
    this.#status = status;
    this.#title = title;
    this.#description = description;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.#id, this.#title, this.#status, this.#description);
  }
}