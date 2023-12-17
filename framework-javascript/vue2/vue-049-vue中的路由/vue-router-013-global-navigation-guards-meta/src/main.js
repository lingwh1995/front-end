import Vue from 'vue'
import App from './App.vue'
//引入vue-router插件
import VueRouter from 'vue-router'

//引入路由配置
import router from "@/router/index"

Vue.config.productionTip = false

//应用vue-router插件
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
