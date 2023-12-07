<template>
  <div>
    <MyHeader :receive="recevice"/>
    <MyItemList :items="items"/>
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyItemList from './components/MyItemList.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  data() {
    return {
      items:[]
    }
  },
  components: {
    MyHeader,
    MyItemList,
    MyFooter
  },
  methods: {
    recevice(param) {
      //接收Header组件中输入的数据并添加到当前组件的data中的items对象上
      this.items.unshift(param)
    }
  },
}
</script>

<style>

</style>
