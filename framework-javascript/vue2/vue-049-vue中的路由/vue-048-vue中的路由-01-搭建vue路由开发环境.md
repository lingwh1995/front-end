1.安装vuex
    vue2版本：  npm install vuex@3
    vue3版本：  npm install vuex@4
2.复制vuex项目中的store文件夹到xxx项目中
3.在xxx项目中的main.js中引入 store/index.js
    import store from './store/index.js'
4.在xxx项目中你的main.js中的 new Vue()中使用store
new Vue({
  render: h => h(App),
  store:store
}).$mount('#app')
    
    