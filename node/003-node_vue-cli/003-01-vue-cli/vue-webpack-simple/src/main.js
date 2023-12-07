// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// 全局注册 axios
import axios from 'axios'
import Loading from './components/loading/loading.js'
import {sum} from '@/utils/math'
// 这时需要 use(Loading)，如果不写 Vue.use()的话，浏览器会报错，大家可以试一下
Vue.use(Loading)

Vue.prototype.$axios = axios
Vue.use(VueResource)
// 测试import和export以及字符串模板
console.log(`sum:${sum(1, 2)}`)

Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
Vue.prototype.bus.$data.BASE_URL = process.env.BASE_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
