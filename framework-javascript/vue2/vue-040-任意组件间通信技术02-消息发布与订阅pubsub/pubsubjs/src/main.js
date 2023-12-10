import Vue from 'vue'
import App from './App.vue'
import PubSub from 'pubsub-js'

Vue.config.productionTip = false

Vue.use(PubSub)

new Vue({
  render: h => h(App),
}).$mount('#app')
