import {BaseComponent} from './base/BaseComponent.js';

function createDeleteTaskButtonTemplate() {
    return (
    `<button class="DeleteTask">
        <p>x Очистить</p>
    </button>`
      );
}


export class DeleteTaskButtonComponent extends BaseComponent{
  getTemplate() {
    return createDeleteTaskButtonTemplate();
  }
}