<template>
  <h3>我是App组件</h3>
  <Suspense>
    <template v-slot:default>
      <Child/>
    </template>
    <template v-slot:fallback>
      <h3>加载中.....</h3>
    </template>
  </Suspense>
</template>

<script>
/**
 * 异步引入组件
 * Suspense等待异步组件时渲染一些额外内容，让应用有更好的用户体验，要配合 defineAsyncComponent 使用
 * */
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))

export default {
  name: 'App',
  components: {
    Child
  }
}
</script>