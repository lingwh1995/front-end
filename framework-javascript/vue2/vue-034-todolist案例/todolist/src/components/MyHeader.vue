<template>
  <div>
    <input type="text" v-model="inputValue" @keyup.enter="addItem" placeholder="请输入你的任务名称，按回车键确定！"/>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

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
      //把输入对象封装成一个对象传递给父组件
      const item = {id:nanoid(),todo:this.inputValue,completed:false}
      this.receive(item)
    }
  },
}
</script>

<style>

</style>