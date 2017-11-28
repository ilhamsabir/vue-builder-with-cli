<template>
  <div class="element-wrapper">

    <div class="element-content" v-for="key in propsElement" :data-element="key.initial" ref="elementContent" :data-iconclass="key.icon">
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
  props: ['propsElement'],
  data() {
    return {
      dataElement: false
    }
  },
  created() {},
  methods: {

  },
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
