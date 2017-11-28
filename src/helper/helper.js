"use strict"

export const drag = () => {
  console.log('drag di helper')
  // $('.element-content-item').draggable()
};

export const createIdentifier = () => {
	const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
	return id
}

export const draggableOptions = () => {
	let drag = {
		cursor: 'move',
		helper: 'clone',
		revert: false,
		connectToSortable: ".dropzone",
	}
	return drag
};

export const sortableOptions = () => {
	let sorts = {
    connectWith: '.dropzone',
    revert: false,
    placeholder: "drop-placeholder",
    appendTo: ".dropzone",
    handle: ".handle",
    scroll: false,
    helper: (event, ui) => {
      const elementName = ui.get(0).dataset.element
      const elementIcon = ui.get(0).dataset.iconclass
      return helperHTML(elementName, elementIcon)
    },
    // start: (event, ui) => handleSortableStart(event, ui),
    // stop: (event, ui) => handleSortableStop(event, ui)
	}
	return sorts
};

const handleSortableStop = (event, ui) => {

};

export const editableAction = (identifier) => {
  let html = `<div class="builder-selected-element-wrapper text-center">
                <div class="builder-selected-element styler clearfix">
                  <div class="box-action-element styler-list">
                    <div class="box-action-element__item styler-button" data-action="edit" data-id="${identifier}">
                      <i class="fa fa-pencil"></i>
                    </div>
                    <div class="box-action-element__item styler-button" data-action="delete" data-id="${identifier}">
                      <i class="fa fa-trash"></i>
                    </div>
                    <div class="box-action-element__item styler-button handle" data-action="move" data-id="${identifier}">
                      <i class="fa fa-arrows"></i>
                    </div>
                  </div>
                </div>
              </div>`
  return html
};

export const elementHtml = (initial, identifier) => {
  const actionEditable = editableAction(identifier);
  let html;
  switch (initial) {
    case "elParagraph":
      html = `<div class="element clearfix" data-element="text-editable">
                ${actionEditable}
                <div class="editable" data-id="${identifier}" contenteditable="false">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum</p>
                </div>
              </div>`
      break;
    case "elHeading":
      html = `<div class="element clearfix" data-element="text-editable">
								${actionEditable}
								<div class="editable" data-id="${identifier}">>
									<h2 class="" contenteditable="true">Heading</h2>
								</div>
							</div>`
      break;
    case "elButton":
      html = `<div class="element clearfix" data-element="link-editable" data-align="left">
								${actionEditable}
								<div class="editable" data-id="${identifier}">>
									<button class="btn btn-default btn-md" contenteditable="true">Click Me</button>
								</div>
							</div>`
      break;
    default:

  }
  return html
};
