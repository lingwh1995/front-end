<template>
  <div>
    <input type="text" v-model="inputValue" @keyup.enter="addItem" placeholder="请输入你的任务名称，按回车键确定！"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {nanoid} from 'nanoid'

export default {
  name:'MyHeader',
  //接收父组App.vue传来的addItemBus函数
  data() {
    return {
      inputValue: '',
    }
  },
  computed: {
    //获取store(vuex)的state中存放的items
    ...mapState(['items'])
  },
  methods: {
    addItem() {
      if(this.inputValue.trim() == '') return
      //把输入对象封装成一个对象传递给父组件
      const item = {id:nanoid(),todo:this.inputValue,completed:false}
      //当子组件中的addItem()方法执行时触发store(vuex)的mutations中的ADD_ITEM()执行
      this.$store.commit('ADD_ITEM',item)
      this.inputValue = ''
    }
  },
}
</script>

<style>

</style>