import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login'),
      meta: {
        authentication: true
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('@/views/main/main.vue'),
      meta: {
        authentication: true
      } 
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/home.vue'),
      meta: {
        authentication: true
      }
    },
    {
      path: '/test',
      meta: {
        authentication: false
      }
    },
    {
      path: '/nopermission',
      name: 'Nopermission',
      component: () => import('@/views/permission/nopermission.vue'),
      meta: {
        authentication: true
      }
    }
  ]
})