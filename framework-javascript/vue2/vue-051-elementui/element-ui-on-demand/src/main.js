import Vue from 'vue'
import App from './App.vue'
import {Button,Row} from "element-ui";

//部分引入组件方式一
/**
const components = [
    {name:Button.name,component:Button},
    {name:Row.name,component:Row},
]
components.forEach((component) => {
    //Vue.component：全局注册组件
    //特别注意：Vue.component()中注册的name是什么，使用时就用什么名字
    Vue.component(component.name,component.component)
})
*/

//部分引入组件方式二
const components = [ Button,Row ]
components.forEach((component) => {
  Vue.use(component)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
