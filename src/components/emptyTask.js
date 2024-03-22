import {BaseComponent} from './base/BaseComponent.js';

function createEmptyTaskComponentTemplate(id, taskType) {
    return (
      changeTaskText(taskType)
    );
}

const changeTaskText = (taskType) => {

    return(`
    <div class="EmptyTask" id= "${taskType}">
        <p>Перетащите карточку</p>
    </div>`)
    
}


export class EmptyTaskComponent extends BaseComponent{

  #id = null;
  #status = null;


  constructor({id, status}){
    super();
    this.#id = id;
    this.#status = status;

  }

  getTemplate() {
    return createEmptyTaskComponentTemplate(this.#id, this.#status);
  }
}