<template>
  <div class="app">
    <h1>我是父组件</h1>
    {{name}}---{{price}}
    <Child/>
  </div>
</template>

<script>
/**
 * 在父组件中使用provide暴露对象
 */
import Child from './components/Child.vue'
import {reactive,toRefs,provide} from 'vue'

export default {
  name: 'App',
  components: {
    Child
  },
  setup() {
    let car = reactive({
      name: '奔驰',
      price: '40w'
    })
    provide('car',car)
    return {
      ...toRefs(car)
    }
  }
}
</script>

<style>
  .app {
    background: green;
    height: 600px;
  }
</style>
