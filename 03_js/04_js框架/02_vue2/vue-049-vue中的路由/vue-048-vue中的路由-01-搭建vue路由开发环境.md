1.安装vue-router
    vue2版本：  npm install vue-router@3
    vue3版本：  npm install vue-router@4
2.复制vue-router项目中的router文件夹到xxx项目中
3.引入并使用插件
    //引入vue-router插件
    import VueRouter from 'vue-router'
    //应用vue-router插件
    Vue.use(VueRouter)
4.在xxx项目中的main.js中引入 roter/index.js
    import router from './roter/index.js'
5.在xxx项目中的main.js中的 new Vue()中使用router
    new Vue({
      render: h => h(App),
      router:router
    }).$mount('#app')
6.<router-link/>标签和<router-view/>
    vue中使用<router-link></router-link>标签实现路由的切换
    vue中使用<router-view></router-view>指定组件的呈现位置
    
    