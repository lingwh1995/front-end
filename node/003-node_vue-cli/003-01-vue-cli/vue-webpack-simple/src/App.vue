<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- 命名视图 -->
    <router-view/>
    <router-view name="title123"></router-view>
    <router-view name="photo"></router-view>
    <!-- 自定义一个Loading组件,通过这个来展示 Vue.use()的使用时机以及使用方法 -->
    <Loading></Loading>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
