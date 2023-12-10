<template>
  <div>
    <MyHeader @add-item-bus="addItemBus"></MyHeader>
    <MyItemList 
        @switch-item-checked-state-bus="switchItemCheckedStateBus"
        @delete-item-bus="deleteItemBus"
        :items="items">
    </MyItemList>
    <MyFooter 
        :items="items" 
        @delete-completed-items-bus="deleteCompletedItemsBus"
        @switch-items-checked-state-bus="switchItemsCheckedStateBus">
    </MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyItemList from './components/MyItemList.vue'
import MyFooter from './components/MyFooter.vue'

import {nanoid} from 'nanoid'

export default {
  name: 'App',
  data() {
    return {
      items: JSON.parse(localStorage.getItem('items')) || []
    }
  },
  components: {
    MyHeader,
    MyItemList,
    MyFooter
  },
  watch: {
    items: {
      deep: true,
      handler(afterChangeValue) {
        localStorage.setItem('items',JSON.stringify(afterChangeValue))
      }
    }
  },
  methods: {
    //接收MyHeader组件中输入的数据并添加到当前组件的data中的items对象上
      //param就是Header组件传递给当前组件的值
    addItemBus(item) {
      this.items.unshift(item)
    },
    //接收MyItem组件中传递的参数
    switchItemCheckedStateBus(itemId) {
      this.items.forEach((item) => {
        if(itemId == item.id) {
          item.completed = ! item.completed
        }
      })
    },
    //接收MyItem组件中传递的参数
    deleteItemBus(itemId){
      //实现方案1
      this.items = this.items.filter((item) => {
        return item.id != itemId
      })
      //实现方案2
      /**
      let deleteIndex = 0
      this.items.forEach((item,index) => {
        if(itemId == item.id) {
          deleteIndex = index
        }
      })
      this.items.splice(deleteIndex,deleteIndex+1)
      */
    },
    deleteCompletedItemsBus(deletedItemIndexs){
      this.items = this.items.filter((item,index) => {
        return deletedItemIndexs.indexOf(index) == -1
      })
    },
    switchItemsCheckedStateBus(isChecked){
      this.items.forEach(item => {
        item.completed = isChecked
      })
    }
  },
}
</script>

<style>

</style>
