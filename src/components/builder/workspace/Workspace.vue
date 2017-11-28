<template>
  <div class="main-workspace">
    <!-- section  -->
    <div class="main-workspace-wrapper clearfix">
      <div class="" v-for="key in newSection" v-html="key"></div>
    </div>

    <!-- section action bar -->
    <div class="workspace-section-wrap">
      <div class="workspace-add-section-inner" >
        <!-- button -->
        <div class="workspace-add-new-section" v-show="isActive">
    			<button class="workspace-add-section-button workspace-button" @click="handleAddNewSection">Add New Section</button>
    			<button class="workspace-add-template-button workspace-button">Add Template</button>
    		</div>
        <!-- structure -->
        <div class="workspace-select-preset" v-show="!isActive">
          <div class="workspace-select-preset-close">
            <div class="preset-close">
              <i class="fa fa-close" @click="handleAddNewSection"></i>
            </div>
          </div>
        	<div class="workspace-select-preset-title">Select your Structure</div>
        	<ul class="workspace-select-preset-list">
      			<li class="workspace-preset workspace-column workspace-col-16" data-structure="10" v-for="key in presets" @click="handleClickPresetList(key.col)">
      				<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 50"><path d="M100,0V50H0V0Z"></path></svg>
      			</li>
        	</ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as Helper from '../../../helper/helper.js'
import * as Selector from '../../../helper/selector.js'

export default {
  name: 'Workspace',
  props: ['propsElement'],
  data () {
    return {
      msg: '',
      isActive: true,
      section: [''],
      newSection: false,
      presets: [],
      isVisible: true
    }
  },
  created() {
    // listen fetch data
    this.fetchPreset()

    // set new section
    this.initHtmlSection()
  },
  updated() {
    // Code that will run only after the entire view has been re-rendered
    this.$nextTick(function () {
      // listenr sortable
      this.handleSortable()

      // listen mouseenter and mouseleave
      this.hoverSection()

      // click class editable
      this.showEditableActionBar()

    })
  },
  methods: {

    // get preset data
    fetchPreset() {
      const url = './preset.json'
      axios.get(url)
      .then(response => {
        this.presets = response.data
      })
      .catch(e => {
       this.errors.push(e)
      })
    },

    // init section
    initHtmlSection(paramSection) {;
      // this.section.push(paramSection)
      this.newSection = this.section
    },

    // click button add new section
    handleAddNewSection() {
      this.isActive = !this.isActive
    },

    // handle select preset
    handleClickPresetList(preset) {
      // handle hide add preset
      this.isActive = true

      let section;

      // push new section
      switch (preset) {
        case 1:
            section = `<div class="section"><div class="col col-sm-12 dropzone"></div></div>`
          break;
          case 2:
            section = `<div class="section"><div class="col col-sm-6 dropzone"></div><div class="col col-sm-6 dropzone"></div></div>`
            break;
          case 3:
              section = `<div class="section"><div class="col col-sm-4 dropzone"></div><div class="col col-sm-4 dropzone"></div><div class="col col-sm-4 dropzone"></div></div>`
              break;
        default:
      }

      this.section.push(section)
    },

    // handle sortable
    handleSortable() {

      const helperHTML = (elementName, elementIcon) =>
      `<div class="element-content element-content--helper">
				<div class="element-icon-wrapper">
					<i class="fa ${elementIcon}"></i>
				</div>
				<div class="element-title-wrapper">
					<div class="title">${elementName}</div>
				</div>
			</div>`

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
        stop: (event, ui) => this.handleSortableStop(event, ui)
      }

      $('.dropzone').sortable(sorts)
    },

    // handle on stop sortable
    handleSortableStop(event, ui) {
      // element list from props
      const elementList = this.propsElement

      // loop element list
      elementList.forEach(elem => {

        let identifier = Helper.createIdentifier()
        let dataSet = ui.item.get(0).dataset.element
        // let uiItemDraggable = ui.item.hasClass('element-drag')

        // if (dataSet == elem.initial && uiItemDraggable) {
        if (dataSet == elem.initial) {
          let html = Helper.elementHtml(dataSet, identifier)
          let htmlWithId = $(html).attr('id', identifier)
          // let htmlWithIdClass = $(htmlWithId).find('.editable').attr('id', identifier)
          // let htmlWithId = $(htmlWithClass).attr('id', identifier)
          // console.log($(html).find('.editable'))
          ui.item.css({ width: "100%", height: "auto" })
          ui.item.html(htmlWithId)
          // ui.item.html(htmlWithIdClass)
        }
      })
    },

    // hover section
    hoverSection() {
      $('.section').on('mouseenter', function() {
        // $(this).addClass('section-hover')
      }).on('mouseleave', function() {
        // $(this).removeClass('section-hover')
      })
    },

    // click editable
    showEditableActionBar() {
      $('body').on('mouseenter', '.element',function(event) {

        let elementId = $(this).attr('id');
        let selectedElementAction = $('#'+elementId).find('.builder-selected-element-wrapper')

        $(this).addClass('element-border')
        selectedElementAction.addClass('is-visible')

      }).on('mouseleave', '.element', function() {

        $('.element').removeClass('element-border')
        $('.builder-selected-element-wrapper').removeClass('is-visible')

      })
    },

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .workspace-section-wrap {
    padding: 6rem;
  }

  .workspace-add-section-inner {
    padding: 5rem;
    border: 2px dashed #d5dadf;
  }

  .workspace-add-new-section {
    display: inline-block;
  }

  .workspace-add-new-section .workspace-add-section-button {
    background-color: #0eac6a;
  }

  .workspace-add-new-section .workspace-button {
    margin-right: 1.5rem;
    color: #fff;
    background-image: none;
    font-size: 13px;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: 400;
    font-style: normal;
    line-height: 1;
    text-transform: uppercase;
    height: 40px;
    min-width: 170px;
    padding: 0 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .workspace-button {
    display: inline-block;
    line-height: 1;
    background-color: #818a91;
    color: #fff;
    text-align: center;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
  }

  .workspace-select-preset-title {
    font-family: Arial,Helvetica,sans-serif;
    font-size: 13px;
    font-weight: 500;
    font-style: normal;
    text-transform: uppercase;
    color: #556068;
  }

  .workspace-select-preset-list {
    list-style: none;
    padding: 0 25px;
    margin: 20px auto 0;
    overflow: hidden;
    max-width: 700px;
  }

  .workspace-select-preset-list .workspace-preset {
      cursor: pointer;
      margin: 0;
      padding: 10px;
      float: left;
  }

  .workspace-select-preset-list .workspace-preset svg {
      height: 50px;
  }

  .workspace-select-preset-close {
    text-align: right;
  }

  .preset-close {
    cursor: pointer;
  }

  .section {
    padding: 5.5rem;
    min-height: 300px;
    border: 1px solid transparent;
  }

  .section-hover {
    border: 1px solid #e0a40a;
  }

  .col:empty {
    border: 1px dashed #ddd;
    min-height: 200px;
  }

  .drop-placeholder {
    width: 100%;
    background-color: rgba(0, 105, 255, .6);
    background-image: repeating-linear-gradient(135deg, transparent, transparent 12px, rgba(0, 0, 0, .1) 0, rgba(0, 0, 0, .1) 24px);
    border: 1px dashed #0069ff;
    height: 5rem;
  }

  .ui-draggable-dragging {
    width: 130px;
  }

  .element {
    border: 1px solid transparent;
  }

  .element-border {
    border: 1px solid #323c47;
  }

  .editable .h1, .editable .h2, .editable .h3, .editable h1, .editable h2, .editable h3 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .editable:focus {
    border: 1px solid #323c47;
    /*outline: -webkit-focus-ring-color auto 1rem;*/
    outline: none !important;
  }

  .styler {
    position: relative;
    z-index: 100;
    border-radius: 26px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-top: -2rem;
  }

  .styler  ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .styler ul>li {
    display: inline-block;
  }

  .styler-list {
    padding-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .styler-button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    background: #323c47;
    border: 0;
    color: #fff;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 5px 0 0;
    cursor: pointer;
  }

  .styler-button:hover {
    background: #283039;
  }

  .builder-selected-element-wrapper {
    /*display: none;*/
    width: 160px;
    margin-left: auto;
    margin-right: auto;
    visibility: hidden;
    opacity: 0;
  }

  .builder-selected-element-wrapper.is-visible {
    /*display: block;*/
    visibility: visible;
    opacity: 1;
  }


</style>
