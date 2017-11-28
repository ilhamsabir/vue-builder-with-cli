<template>
  <div class="element-wrapper" ref="message">

    <div class="element-content" v-for="key in elements" :data-element="key.initial" draggable="true">
      <div class="element-content-item">
        <div class="element-icon-wrapper">
          <i :class="key.icon"></i>
        </div>
        <div class="element-title-wrapper">
          <div class="title">{{ key.name }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import * as Helper from '../../../helper/helper.js'

export default {
  name: 'Elements',
  data() {
    return {
      elements: [],
      errors: [],
      dataElement: false
    }
  },
  created() {
    // fetch element
    this.fetchElementData()

    // listener all drag
    this.initHandleListenerDrag()
  },
  methods: {

    // fetch element data
    fetchElementData() {
      const url = './elements.json'
      axios.get(url)
      .then(response => {
        this.elements = response.data
      })
      .catch(e => {
       this.errors.push(e)
      })
    },

    // init all listener drag
    initHandleListenerDrag() {
      // lsiten drag start
      document.addEventListener("dragstart", this.handleDragStart)

      // drag end
      document.addEventListener("dragend", this.handleDragEnd)

      // drag over
      document.addEventListener("dragover", this.handleDragOver)

      // drag enter dropzone area
      document.addEventListener("dragenter", this.handleDragEnter)

      // drag leave dropzone area
      document.addEventListener("dragleave", this.handleDragLeave)

      // drag exit
      document.addEventListener("dragexit", this.handleDragExit)

      // listen drop
      document.addEventListener("drop", this.handleDropZone)
    },

    // handle drag start
    handleDragStart() {
      let dragElement = event.target

      // set value for element drag
      this.dataElement = dragElement.dataset.element
    },

    // handle drag end
    handleDragEnd() {
      // prevent default to allow drop
      event.preventDefault()

      // set value for element drag to false
      this.dataElement = false

      console.log(event)
      // this.removeHoverDropTarget(dragged)
    },

    // handle drag over
    handleDragOver() {
      // prevent default to allow drop
      event.preventDefault()

      let dragged = event.target;
      this.addHoverDropTarget(dragged)
    },

    // handle dropZone
    handleDropZone() {
      // prevent default action (open as link for some elements)
      // event.preventDefault();
      let dragged = event.target
      let elements = this.elements

      console.log('closets', dragged.closest("div"))

      if ( dragged.className.indexOf('dropzone') > 0 ) {

        // initified html
        let html = Helper.elementParagraph(this.dataElement)

        if(dragged.childNodes.length > 0)
        {
          // append to html
          dragged.insertAdjacentHTML('beforeend', html)
        }
          else
        {
          // append to html
          dragged.insertAdjacentHTML('afterbegin', html)
        }

        // remove placeholder
        this.removeHoverDropTarget(dragged)

      }

      this.dataElement = false
    },

    // handle drag enter
    handleDragEnter() {
      let dragged = event.target;
      this.addHoverDropTarget(dragged)
    },

    // handle drag leave
    handleDragLeave() {
      let dragged = event.target;
      this.removeHoverDropTarget(dragged)
    },

    // handle drag exut
    handleDragExit() {
      let dragged = event.target;
      this.removeHoverDropTarget(dragged)
    },

    // add drop target
    addHoverDropTarget(dropzoneElement) {

      if ( dropzoneElement.className.indexOf('dropzone') > 0 ||
           dropzoneElement.className.indexOf('element') > 0 ||
           dropzoneElement.className.indexOf('editable') > 0 )
      {
        if( dropzoneElement.childNodes.length > 0)
        {
          dropzoneElement.classList.add('squeeze-before')
          dropzoneElement.classList.add('drop-target')
        }
          else
        {

          dropzoneElement.classList.add('drop-target')
        }
      }
    },

    // remove drop target
    removeHoverDropTarget(dropzoneElement) {
      // if ( dropzoneElement.className.indexOf('dropzone') > 0 ) {
        dropzoneElement.classList.remove('drop-target')
        dropzoneElement.classList.remove('squeeze-before')
      // }
    },

  }
}
</script>

<style>
  .element-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .element-content {
    flex: 0 0 50%;
    padding: 0.5rem;
    text-align: center;
  }

  .element-content-item {
    background-color: #1e2429;
    border-radius: 0.2rem;
    padding: 2rem 1rem;
    cursor: grab;
    cursor: -webkit-grab;
    border: 1px dashed;
  }

  .element-content-item:hover {
    background: #191919;
    color: #fff;
    -webkit-box-shadow: 0 2px 6px rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 6px rgba(255, 255, 255, 0.2);
  }

  .drop-place-holder {
    background-image: repeating-linear-gradient(45deg, #46e679, #46e679 30px, #30d665 30px, #30d665 60px);
  }

  .drop-target:after,
  .drop-target:before {
    content: "";
    background-color: rgba(0, 105, 255, .6);
    background-image: repeating-linear-gradient(135deg, transparent, transparent 12px, rgba(0, 0, 0, .1) 0, rgba(0, 0, 0, .1) 24px);
    border: 1px dashed #0069ff;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    /*position: relative;*/

  }

  .drop-target.squeeze-before:before {
    width: 100%;
    height: 15px;
    bottom: 19px;
    top: -20px;
  }
  .drop-target.squeeze-before:after {
    width: 100%;
    height: 15px;
    bottom: 19px;
    top: 0;
  }
</style>
