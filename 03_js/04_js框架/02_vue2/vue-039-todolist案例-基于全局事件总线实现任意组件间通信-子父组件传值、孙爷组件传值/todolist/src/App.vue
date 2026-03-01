<template>
  <div>
    <MyHeader></MyHeader>
    <MyItemList :items="items"></MyItemList>
    <MyFooter :items="items"></MyFooter>
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
  mounted() {
    //接收MyHeader组件中发射的数据并添加到当前组件的data中的items对象中
    this.$bus.$on('add-item-bus',(item) => {
      this.items.unshift(item)
    })
    //接收MyItem组件中发射的数据并修改到当前组件的data中的items对象中的数据
    this.$bus.$on('switch-item-checked-state-bus',(itemId) => {
      this.items.forEach((item) => {
        if(itemId == item.id) {
          item.completed = ! item.completed
        }
      })
    })
    //接收MyItem组件中发射的数据并修改到当前组件的data中的items对象中的数据
    this.$bus.$on('delete-item-bus',(itemId) => {
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
    }),
    //接收MyFooter组件中发射的数据并修改到当前组件的data中的items对象中的数据
    this.$bus.$on('delete-completed-items-bus',(deletedItemIndexs) => {
      this.items = this.items.filter((item,index) => {
        return deletedItemIndexs.indexOf(index) == -1
      })
    })
    //接收MyFooter组件中发射的数据并修改到当前组件的data中的items对象中的数据
    this.$bus.$on('switch-items-checked-state-bus',(isChecked) => {
      this.items.forEach(item => {
        item.completed = isChecked
      })
    })
  },
  beforeDestroy() {
    //组件销毁前解绑事件总线对象上的自定义事件 add-item-bus
    this.$bus.$off('add-item-bus')
    //组件销毁前解绑事件总线对象上的自定义事件 switch-item-checked-state-bus
    this.$bus.$off('switch-item-checked-state-bus')
    //组件销毁前解绑事件总线对象上的自定义事件 switch-item-checked-state-bus
    this.$bus.$off('delete-item-bus')
    //组件销毁前解绑事件总线对象上的自定义事件 delete-completed-items-bus
    this.$bus.$off('delete-completed-items-bus')
    //组件销毁前解绑事件总线对象上的自定义事件 switch-items-checked-state-bus
    this.$bus.$off('switch-items-checked-state-bus')
  },
}
</script>

<style>

</style>
