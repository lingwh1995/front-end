<template>
  <div class="grandson">
    <h1>我是孙组件</h1>
    <Dialog/>
  </div>
</template>

<script>
/***
 * Teleport能够将我们的组件html结构移动到指定位置的技术
 */
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Grandson',
  components: {
    Dialog
  },
  setup() {

  }
}
</script>

<style>
  .grandson {
    background: yellow;
    width: 90%;
  }
</style>
