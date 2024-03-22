import {CreateTaskTypeSectionComponent} from './tasktypesection-component.js';
import {BaseComponent} from './base/BaseComponent.js';

const CreateTaskTypeSection = new CreateTaskTypeSectionComponent();

async function createTaskBoardComponentTemplate() {
    return (
    `<div class="TaskBoard">
    ${await CreateTaskTypeSection.getTemplate()}
    </div>`
    );
}

export class CreateTaskBoardComponent extends BaseComponent{
  async getTemplate() {
    return await createTaskBoardComponentTemplate();
  }
}