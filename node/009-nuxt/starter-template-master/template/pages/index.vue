<template>
  <section class="container">
    <div>我是pages目录下的index.vue</div>
    <router-link to="/student">学生列表</router-link>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

