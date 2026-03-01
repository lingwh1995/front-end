<template>
  <div class="child">
    <h1>我是子组件</h1>
    <Grandson/>
  </div>
</template>

<script>
import Grandson from './Grandson.vue'
export default {
  name: 'Child',
  components: {
    Grandson
  },
  setup() {
  }
}
</script>

<style>
  .child {
    background: orange;
    width: 90%;
  }
</style>