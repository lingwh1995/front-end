<template>
  <div>
    <h2>我是About组件的内容</h2>
  </div>
</template>

<script>
export default {
  name: 'About',
  mounted() {
    console.log('About组件挂载完毕了...')
    //每一个组件都有一个独立的路由规则 $route
    window.aboutRoute = this.$route
    //一个工程只有一个的路由器 $router
    window.aboutRouter = this.$router

    /**
     * 要验证上面的内容，打开控制台
     *  验证每一个组件都有一个独立的路由规则  window.homeRoute == window.aboutRoute
     *  验证一个工程只有一个的路由器  window.homeRouter == window.aboutRouter
     */
  },
  beforeDestroy() {
    console.log('About组件即将被销毁...')
  }
}
</script>

<style scoped>
</style>
