<template>
  <div>
    <div class="row">
      <Banner></Banner>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 原始的html中使用a标签实现页面跳转 -->
          <!--
          <a class="list-group-item" class="active" href="./about.html">About</a>
          <a class="list-group-item" href="./home.html">Home</a>
          -->

          <!-- vue中使用<router-link></router-link>标签实现路由的切换 -->
          <!-- 使用name代替path进行配置跳转路径 -->
          <router-link class="list-group-item" active-class="active" :to="{name:'home_'}">Home</router-link>
          <!-- 使用name代替path进行配置跳转路径 -->
          <router-link class="list-group-item" active-class="active" :to="{name:'about_'}">About</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- vue中使用<router-view></router-view>指定组件的呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Banner from "@/components/Banner.vue";

export default {
  name: 'App',
  components: {
    Banner
  }
}
</script>

<style>
</style>
