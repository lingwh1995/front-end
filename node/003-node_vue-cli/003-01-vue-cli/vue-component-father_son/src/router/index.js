import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import P2C from '@/components/p2c/Parent'
import C2P from '@/components/c2p/Parent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/p2c',
      name: 'P2C',
      component: P2C
    },
    {
      path: '/c2p',
      name: 'C2P',
      component: C2P
    },
  ]
})
