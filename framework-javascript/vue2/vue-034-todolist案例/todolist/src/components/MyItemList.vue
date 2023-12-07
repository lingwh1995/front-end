<template>
  <div>
    <my-item v-for="item in items" :key="item.id" :item="item"></my-item>
  </div>
</template>

<script>
import MyItem from './MyItem.vue'

export default {
  name:'MyItemList',
  components: { MyItem },
  props: ['items']
}
</script>

<style>

</style>