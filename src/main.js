// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as Helper from './helper/helper.js'
import router from './router'
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)
Vue.config.productionTip = false
// Vue.component('app-header', Header)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
