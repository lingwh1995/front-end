<template>
  <div>
    <h2>V1.0 - 普通方式：   使用计算属性从store(vuex)的state和getters中获取数据数据 + 普通方式调用store(vuex)的actions和mutations中的方法</h2>
    <CountV1/>
    <h2>V2.0 - 对象式写法： 使用mapState从store(vuex)的state和getters中获取数据数据 + mapActions调用store(vuex)的actions中的方法和mapMutationsmutations中的方法</h2>
    <CountV2/>
    <h2>V3.0 - 数组式写法： 使用mapState从store(vuex)的state和getters中获取数据数据 + mapActions调用store(vuex)的actions中的方法和mapMutationsmutations中的方法</h2>
    <CountV3/>
  </div>
</template>

<script>
import CountV1 from './components/CountV1.vue'
import CountV2 from './components/CountV2.vue'
import CountV3 from './components/CountV3.vue'

export default {
  name: 'App',
  components: {
    CountV1,
    CountV2,
    CountV3
  }
}
</script>

<style>

</style>
