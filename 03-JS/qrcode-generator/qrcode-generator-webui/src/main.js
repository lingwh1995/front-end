import { createApp } from "vue"
import App from "./App.vue"
//引入element-plus插件
import ElementPlus from "element-plus"
//引入element-plus插件css文件
import "element-plus/dist/index.css"
//引入中文插件
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入全局css样式
import './assets/css/global.css' 
//引入路由配置
import router from "@/router"

import print from 'vue3-print-nb'

const app = createApp(App)

//应用ElementPlus插件
app.use(ElementPlus,{ locale: zhCn })
  //应用vue-router插件
  .use(router)
  .use(print)
  .mount("#app")
