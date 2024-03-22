import {CreateAreaComponent} from './createarea-component.js';
import {CreateTaskBoardComponent} from './taskboard-component.js';
import {BaseComponent} from './base/BaseComponent.js';

const CreateArea = new CreateAreaComponent();
const CreateTaskBoard = new CreateTaskBoardComponent();

async function createMainWorkzoneComponent() {

    return (
    `${CreateArea.getTemplate()}
      ${await CreateTaskBoard.getTemplate()}`
      );
}

export class CreateMainWorkzoneComponent extends BaseComponent {
  async getTemplate() {
    return await createMainWorkzoneComponent();
  }
}



