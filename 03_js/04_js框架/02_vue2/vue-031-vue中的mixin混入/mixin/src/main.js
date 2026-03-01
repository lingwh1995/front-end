import Vue from 'vue'
import App from './App.vue'
//全局引入代码片段
import {mixin} from './components/mixin.js'
Vue.config.productionTip = false

//配置全局混入
Vue.mixin(mixin)

new Vue({
  render: h => h(App),
}).$mount('#app')
