import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    //安装全局事件总线
    Vue.prototype.$bus = this
    //安装axios
    Vue.prototype.$axios = axios
  }
}).$mount('#app')
