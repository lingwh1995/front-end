<template>
  <div>
    <h2>我是Home组件的内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <!-- vue中使用编程式路由完成路由跳转 -->
          <button class="list-group-item" active-class="active" @click="toMessage">Message</button>
        </li>
        <li>
          <!-- vue中使用编程式路由完成路由跳转 -->
          <button class="list-group-item" active-class="active" @click="toNews">News</button>
        </li>
      </ul>
      <!-- 缓存News组件
          include中配置的是组件名
          1.一个组件直接写就行
          多个组件使用数据写法
                :include=['Message','News']
      -->
      <keep-alive include="News">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    toMessage() {
      this.$router.push({
        path:'/home/message'
      })
    },
    toNews(){
      this.$router.push({
        path:'/home/news'
      })
    }
  }
}
</script>

<style scoped>
</style>
