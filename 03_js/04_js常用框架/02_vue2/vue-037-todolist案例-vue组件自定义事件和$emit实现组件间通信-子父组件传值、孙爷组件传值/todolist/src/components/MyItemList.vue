<template>
  <div>
    <my-item 
        v-for="item in items" :key="item.id"
        :item="item" 
        @switch-item-checked-state-bus="switchItemCheckedStateBus"
        @delete-item-bus="deleteItemBus">
    </my-item>
  </div>
</template>

<script>
import MyItem from './MyItem.vue'

export default {
  name:'MyItemList',
  components: { MyItem },
  props: {
    items: Array,
  },
  methods: {
      switchItemCheckedStateBus(itemId) {
        //当子组件中switchItemCheckedState()方法执行时会会触发子组件向父组件App.vue中发射一个参数
        this.$emit('switch-item-checked-state-bus',itemId)
      },
      deleteItemBus(itemId) {
        this.$emit('delete-item-bus',itemId)
      }
  },
}
</script>

<style>

</style>