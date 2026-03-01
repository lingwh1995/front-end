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
      
    }
  },
  components: {
    MyHeader,
    MyItemList,
    MyFooter
  },
  computed:{
    items: {
      get() {
        return this.$store.state.items
      },
      set(value) {
        this.$store.state.items = value
      }
    }
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
    //页面挂载时通从localStorage中获取数据并同步数据到this.$store.state.items中
    this.$store.state.items = JSON.parse(localStorage.getItem('items')) || []
  }
}
</script>

<style>

</style>
