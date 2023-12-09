<template>
  <div>
    <my-item 
        v-for="item in items" :key="item.id"
        :item="item" 
        :switch-item-checked-state-bus="switchItemCheckedStateBus"
        :delete-item-bus="deleteItemBus"
        :delete-completed-items-bus="deleteCompletedItemsBus">
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
    switchItemCheckedStateBus:Function,
    deleteItemBus:Function,
    deleteCompletedItemsBus:Function
  }
}
</script>

<style>

</style>