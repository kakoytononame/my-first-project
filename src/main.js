import {HeaderComponent} from './components/header-component.js';
import {CreateMainWorkzoneComponent} from './components/mainworkzone-component.js'
import {render, RenderPosition} from './render.js';
import { formSubmitHandler, deleteTasksHandler } from './components/tasktypesection-component.js';


const bodyContainer = document.querySelector('.board-app');

const mainComponents = [new HeaderComponent(), new CreateMainWorkzoneComponent()]

await render(mainComponents, bodyContainer, RenderPosition.BEFOREEND);

let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          checkNode(node);
        }
      });
    });
  });
  
  let config = { attributes: true, childList: true, subtree: true };
  observer.observe(document.body, config);
  
  function checkNode(node) {
    node.childNodes.forEach(function(childNode) {
      if (childNode.nodeType === 1 && childNode.classList.contains('CreateTaskButton')) {
        childNode.addEventListener('click', function() {
          formSubmitHandler();
        });
      } else if (childNode.nodeType === 1) {
        checkNode(childNode);
      }
      if (childNode.nodeType === 1 && childNode.classList.contains('DeleteTask')) {
        childNode.addEventListener('click', function() {
          deleteTasksHandler();
        });
      } else if (childNode.nodeType === 1) {
        checkNode(childNode);
      }
    });
  }






function rerender(){
    bodyContainer.replaceChildren();
    var mainComponents = [new HeaderComponent(), new CreateMainWorkzoneComponent()];
    render(mainComponents, bodyContainer, RenderPosition.BEFOREEND);
}

export {rerender}
