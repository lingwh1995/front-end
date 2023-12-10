import Vue from 'vue'
import App from './App.vue'
import PubSub from 'pubsub-js'

Vue.config.productionTip = false

Vue.use(PubSub)

new Vue({
  render: h => h(App),
  //安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
