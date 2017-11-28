<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-panel">
      <div class="sidebar-panel__wrapper clearfix">
        <div class="sidebar-panel__item" v-for="key in panels" @click="handleActivePanel(key.initial)"
            :data-initial="key.initial"  :class="{ active : panelActive == key.initial}">
          <i :class="key.icon"></i>
          <div class="title">
            {{ key.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar-subpanel">
      <div class="">
        <app-elements v-if="panelActive === 'panel-elements'" :props-element="propsElement"></app-elements>
        <app-layout v-if="panelActive === 'panel-layout'"></app-layout>
        <app-tracking v-if="panelActive === 'panel-tracking'"></app-tracking>
        <app-setting v-if="panelActive === 'panel-settings'"></app-setting>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Elements from './elements/Elements'
  import Layout from './layout/Layout'
  import Tracking from './tracking/Tracking'
  import Setting from './setting/Setting'
  import * as Helper from '../../helper/helper.js'

  export default {
    name: 'Builder',
    components: {
      'app-elements': Elements,
      'app-layout': Layout,
      'app-tracking': Tracking,
      'app-setting': Setting
    },
    props: ['propsElement'],
    data () {
      return {
        params: this.$route.params.id,
        panels: [],
        errors: [],
        isActive: false,
        panelActive: "panel-elements"
      }
    },
    created() {
      this.fetchMainPanel()
    },
    updated() {
      // Code that will run only after the entire view has been re-rendered
      this.$nextTick(function () {
        // run handle drag
        this.handleDraggable()
      })
    },
    methods: {

      // fetch main panel
      fetchMainPanel() {
        const url = './mainpanel.json'
        axios.get(url)
        .then(response => {
          this.panels = response.data
          console.log(this.panels)
        })
        .catch(e => {
         this.errors.push(e)
        })
      },

      // handle active panel
      handleActivePanel(initial, event) {
        this.isActive = this.isActive
        this.panelActive = initial
      },

      // handle drag func
      handleDraggable() {
        let drag = {
          cursor: 'move',
          helper: 'clone',
          revert: false,
          connectToSortable: ".dropzone",
        }

        $('.element-content').draggable(drag)
      },

    }
  }
</script>
<style>
  .sidebar-wrapper {
    max-height: 100%;
    min-height: 100%;
    position: fixed;
    width: 360px;
    background: #23282d;
    color: #9d9d9d;
    display: flex;
  }

  .sidebar-panel {
    flex: 0 0 9rem;
    position: relative;
  }

  .sidebar-subpanel {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
    background-color: rgb(31, 31, 31);
  }

  .sidebar-panel__wrapper {
    display: block;
  }

  .sidebar-panel__item {
    padding: 1.8rem .5rem;
    width: 100%;
    float: left;
    cursor: pointer;
  }

  .sidebar-panel__item:after {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    left: 10px;
    right: 10px;
    background-color: rgb(31, 31, 31);
    margin-top: 1.7rem;
  }

  .sidebar-panel__item:hover {
    background: rgb(31, 31, 31);
  }

  .sidebar-panel__item.active {
    background: rgb(31, 31, 31);
  }

  .sidebar-panel__item i {
    font-size: 1.5rem;
  }

  .sidebar-panel__item .title {
    font-size: 1.2rem;
  }
</style>
