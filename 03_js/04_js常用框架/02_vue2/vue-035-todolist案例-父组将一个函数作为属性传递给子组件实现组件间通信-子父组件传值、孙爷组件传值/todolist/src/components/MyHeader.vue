<template>
  <div>
    <input type="text" v-model="inputValue" @keyup.enter="addItem" placeholder="请输入你的任务名称，按回车键确定！"/>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name:'MyHeader',
  //接收父组App.vue传来的addItemBus函数
  props:{
    addItemBus:Function
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    addItem() {
      if(this.inputValue.trim() == '') return
      //把输入对象封装成一个对象传递给父组件
      const item = {id:nanoid(),todo:this.inputValue,completed:false}
      //this.addItemBus是父组件传递给子组件的函数
      this.addItemBus(item)
      this.inputValue = ''
    }
  },
}
</script>

<style>

</style>