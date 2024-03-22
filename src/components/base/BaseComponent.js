import {createElement} from '../../render.js';


export class BaseComponent {
  constructor() {
    if (new.target === BaseComponent) {
      throw new Error(`It's AbstractComponent, we dont need to create them!`);
    }

    this.container = this.constructor;
  }


  async getTemplate() {
    throw new Error(`It's BaseComponent method, please implement it! `);
  }


  getElement() {
    if (!this.element) {
      this.element = this.createElement(this.getTemplate());
    }

    return this.element;
  }

  async getElements(){
    if (!this.element) {
        this.element = this.createElement(await this.getTemplate());
    }
  
      return this.element.parentElement;
  }


  removeElement() {
    this.element = null;
  }

  createElement(template) {
    var newElement = document.createElement('div');
    newElement.innerHTML = template;
  
  
    return newElement.firstElementChild;
  }


}
