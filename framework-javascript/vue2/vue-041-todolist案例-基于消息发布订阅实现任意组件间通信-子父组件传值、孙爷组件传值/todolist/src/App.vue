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
    //接收MyHeader组件中发布的消息并添加到当前组件的data中的items对象中
    this.addItemPubsub = PubSub.subscribe('add-item-pubsub',(topicName,item) => {
      this.items.unshift(item)
    })
    //接收MyItem组件中发布的消息并修改到当前组件的data中的items对象中的数据
    this.switchItemCheckedStatePubsub = PubSub.subscribe('switch-item-checked-state-pubsub',(topicName,itemId) => {
      this.items.forEach((item) => {
        if(itemId == item.id) {
          item.completed = ! item.completed
        }
      })
    })
    //接收MyItem组件中发布的消息并修改到当前组件的data中的items对象中的数据
    this.deleteItemPubsub = PubSub.subscribe('delete-item-pubsub',(topicName,itemId) => {
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
    })
    //接收MyFooter组件中发布的消息并修改到当前组件的data中的items对象中的数据
    this.deleteCompletedItemsPubsub = PubSub.subscribe('delete-completed-items-pubsub',(topicName,deletedItemIndexs) => {
      this.items = this.items.filter((item,index) => {
        return deletedItemIndexs.indexOf(index) == -1
      })
    }),
    //接收MyFooter组件中发布的消息并修改到当前组件的data中的items对象中的数据
    this.switchItemsCheckedStatePubsub = PubSub.subscribe('switch-items-checked-state-pubsub',(topicName,isChecked) => {
      this.items.forEach(item => {
        item.completed = isChecked
      })
    })
  },
  beforeDestroy() {
    //组件取消订阅消息 this.addItemPubsub
    PubSub.unsubscribe(this.addItemPubsub)
    //组件取消订阅消息 this.switchItemCheckedStatePubsub
    PubSub.unsubscribe(this.switchItemCheckedStatePubsub)
    //组件取消订阅消息 this.deleteItemPubsub
    PubSub.unsubscribe(this.deleteItemPubsub)
    //组件取消订阅消息 this.deleteCompletedItemsPubsub
    PubSub.unsubscribe(this.deleteCompletedItemsPubsub)
    //组件取消订阅消息 this.switchItemsCheckedStatePubsub
    PubSub.unsubscribe(this.switchItemsCheckedStatePubsub)
  },
}
</script>

<style>

</style>
