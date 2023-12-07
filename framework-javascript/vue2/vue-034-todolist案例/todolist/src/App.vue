<template>
  <div>
    <MyHeader :receive="recevice"/>
    <MyItemList/>
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyItemList from './components/MyItemList.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyItemList,
    MyFooter
  },
  methods: {
    recevice(param) {
      console.log(param)
    }
  },
}
</script>

<style>

</style>
