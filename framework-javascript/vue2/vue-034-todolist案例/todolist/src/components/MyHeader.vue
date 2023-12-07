<template>
  <div>
    <input type="text" v-model="inputValue" @keyup.enter="addItem" placeholder="请输入你的任务名称，按回车键确定！"/>
  </div>
</template>

<script>
export default {
  name:'MyHeader',
  //接收父组App.vue传来的receive函数
  props:['receive'],
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    addItem() {
      const item = {'001'}
      this.receive(this.inputValue)
    }
  },
}
</script>

<style>

</style>