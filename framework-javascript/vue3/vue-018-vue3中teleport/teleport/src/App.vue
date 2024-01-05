<template>
  <div class="app">
    <h1>我是父组件</h1>
    <Child/>
  </div>
</template>

<script>
import Child from './components/Child.vue'

export default {
  name: 'App',
  components: {
    Child
  },
  setup() {

  }
}
</script>

<style>
  .app {
    background: green;
  }
</style>
