<template>
  <div>
    <button @click="open">打开弹窗</button>
    <teleport to="body">
      <div class="mask" v-if="dialogVisible">
        <div class="dialog">
          <h3>这里是弹窗内容</h3>
          <button @click="close">关闭弹窗</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'Dialog',
  setup() {
    let dialogVisible = ref(true)
    const open = ()=> {
      dialogVisible.value = true
    }
    const close = ()=> {
      dialogVisible.value = false
    }
    return {
      dialogVisible,
      open,
      close
    }
  }
}
</script>

<style>
 .mask {
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(0,0,0,0.5);
 }
 .dialog {
   width: 400px;
   height: 400px;
   background: green;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
 }
</style>
