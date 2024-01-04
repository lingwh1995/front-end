<template>
  <div class="child">
    <h1>我是子组件</h1>
    {{name}}---{{price}}
    <Grandson/>
  </div>
</template>

<script>
/**
 * 在子组件中使用inject接收父组件中暴露的对象
 */
import Grandson from './Grandson.vue'
import {inject,toRefs} from 'vue'
export default {
  name: 'Child',
  components: {
    Grandson
  },
  setup() {
    var car = inject('car');
    return {
      ...toRefs(car)
    }
  }
}
</script>

<style>
  .child {
    background: orange;
    width: 90%;
    height: 400px;
  }
</style>