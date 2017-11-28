<template>
  <div class="sidebar-wrapper">
  ini edit bar

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
    name: 'Editbar',
    // props: ['propsElement'],
    data () {
      return {
        panelActive: "panel-elements"
      }
    },
    created() {

    },
    updated() {
      // Code that will run only after the entire view has been re-rendered
      this.$nextTick(function () {
        // run handle drag

      })
    },
    methods: {


    }
  }
</script>
<style>

</style>
