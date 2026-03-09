<template>
  <div>
    Student组件
  </div>
</template>

<script>
export default {
  name: 'Student',
  mounted() {
    this.$bus.$on('hello',(data) => {
      console.log('我是Student组件，收到了数据:' + data )
    })
  },
  //在收到数据的组件中执行解绑自定义事件操作
  beforeDestroy() {
    this.$bus.$off('hello')
  },
}
</script>

<style scoped>

</style>
