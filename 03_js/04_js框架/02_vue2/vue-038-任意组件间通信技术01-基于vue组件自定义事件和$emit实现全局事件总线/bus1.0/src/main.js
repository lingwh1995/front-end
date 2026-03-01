import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const Bus = Vue.extend({})
Vue.prototype.$bus = new Bus()

new Vue({
  render: h => h(App),
}).$mount('#app')
