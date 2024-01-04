<template>
  <div class="grandson">
    <h1>我是孙组件</h1>
    {{name}}---{{price}}
  </div>
</template>

<script>
/**
 * 在孙组件(后代组件)中使用inject接收父组件中暴露的对象
 */
import {inject,toRefs} from 'vue'

export default {
  name: 'Grandson',
  setup() {
    var car = inject('car');
    return {
      ...toRefs(car)
    }
  }
}
</script>

<style>
  .grandson {
    background: yellow;
    width: 90%;
    height: 200px;
  }
</style>
