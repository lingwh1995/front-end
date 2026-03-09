<template>
  <div>
    <h1>测试插件中的自定义指令</h1>
    <span v-big:value="n"></span>
    <h1>测试插件中的全局过滤器</h1>
    <span>{{msg | toUpperCase}}</span>
    <h1>测试插件中全局混入的公共代码片段</h1>
    <button @click="show('Plugins.vue')">点击调用全局混入中的方法</button>
    <h1>测试插件中挂载在Vue的原型对象上的数据总线对象bus</h1>
    Vue的原型对象上的属性bus中的isEnablePlugins的值:<span>{{bus.isEnablePlugins}}</span>
  </div>
</template>

<script>
export default {
  name: 'Plugins',
  data() {
    return {
      n: 1,
      msg:'hello'
    }
  }
}
</script>

<style scoped>

</style>
