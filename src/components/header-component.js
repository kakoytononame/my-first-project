import {BaseComponent} from './base/BaseComponent.js';

function createHeaderComponentTemplate() {
    return (
        `<header class="Top">
            <h1 class="Top_text">Список задач</h1>
        </header>`
      );
}


export class HeaderComponent extends BaseComponent{
  getTemplate() {
    return createHeaderComponentTemplate();
  }
}
