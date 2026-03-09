<template>
  <div>
    <h2>我是Home组件的内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <!-- 使用name代替path进行配置跳转路径 -->
          <router-link active-class="active" :to="{name:'message_'}">Message</router-link>
        </li>
        <li>
          <!-- 使用name代替path进行配置跳转路径 -->
          <router-link active-class="active" :to="{name:'news_'}">News</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
</style>
