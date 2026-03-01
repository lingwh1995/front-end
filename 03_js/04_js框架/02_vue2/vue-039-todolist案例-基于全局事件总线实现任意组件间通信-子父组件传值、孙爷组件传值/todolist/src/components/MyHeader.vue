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
      //当子组件中的addItem()方法执行时会触发子组件向事件总线组件$bus中发射一个参数
      this.$bus.$emit('add-item-bus',item)
      this.inputValue = ''
    }
  },
}
</script>

<style>

</style>