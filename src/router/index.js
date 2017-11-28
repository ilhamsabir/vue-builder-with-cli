import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard'
import Post from '@/components/action/Post'
import Builder from '@/components/builder/Builder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/builder/:id',
      name: 'Builder',
      component: Builder
    }

  ]
})
