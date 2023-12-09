<template>
  <div>
    <!-- 
      监控checkbox数据改变，这里有三种实现思路:
          1.@change事件：用于监控表单数据的变化
          2.@click时间：点击单选框之后，触发单击事件
          3.vue独有的v-model属性，利用v-model的双向数据流动特点来修改原数据的改变
              不太推荐第3种处理方式，因为vue规定props是只读的，这个操作有点违规
    -->
    <input type="checkbox" :checked="item.completed" @change="switchCheckedState(item.id)"/>
    <!-- <input type="checkbox" v-model="item.completed"/> -->
    {{item.todo}}
    <button @click="deleteItem(item.id)">删除</button>
  </div>
</template>

<script>
export default {
  name:'MyItem',
  //下面这种写法无法接收到父组件传递的boolean类型的数据
  props: {
    item: Object,
    switchItemCheckedStateBus:Function,
    deleteItemBus:Function,
  },
  methods: {
    switchCheckedState(itemId) {
      this.switchItemCheckedStateBus(itemId)
    },
    deleteItem(itemId) {
      this.deleteItemBus(itemId)
    }
  },
}
</script>

<style>
</style>