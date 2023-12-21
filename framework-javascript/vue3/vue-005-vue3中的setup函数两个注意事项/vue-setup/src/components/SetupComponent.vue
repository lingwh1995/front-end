<template>
  <div >
  </div>
</template>

<script>

export default {
  name: 'SetupComponent',
  props:['id','name','age'],
  //setup可以接收两个参数: 1.props(需要在当前组件中配置props配置项) 2.context 包含了 attrs、slots、emit
  setup(props,contex) {
    console.log(props,contex)
  }
}
</script>

<style scoped>

</style>
