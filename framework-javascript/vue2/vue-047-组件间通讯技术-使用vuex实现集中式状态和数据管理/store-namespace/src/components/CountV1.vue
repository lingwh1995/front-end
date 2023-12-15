<template>
  <div>
    <select v-model="number">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="addDelay">延迟1s加</button>
    
    <h3>不使用计算属性从$store中取值</h3>
    <div>
      总和是：{{$store.state.countV1.sum}}
      总和放大10倍后是：{{$store.getters['countV1/bigSum']}}
    </div>  
    <div>
      学校名称: {{$store.state.countV1.school.schooName}}<br/>
      学校地址：{{$store.state.countV1.school.schooAddress}}
    </div>

    <h3>普通方式(通过计算属性)从store(vuex)的state和getters中获取数据数据</h3>
    <div>
      总和是：{{sumFromComputed}}
      总和放大10倍后是：{{bigSumFromComputed}}
    </div>  
    <div>
      学校名称: {{schooNameComputed}}<br/>
      学校地址：{{schooAddressComputed}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Count',
  data() {
    return {
      number:1
    }
  },
  mounted() {
    //仅用于测试
    console.log(this.$store.getters['countV1/bigSum']);
  },
  methods: {
    //-----------  普通方式调用store(vuex)的actions中的方法开始  -----------
    /** 调用store(vuex)的actions中的方法v1.0 -普通写法 */
    /***/
    add() {
      this.$store.dispatch('countV1/addBehavior',this.number)
    },
    sub() {
      this.$store.dispatch('countV1/subBehavior',this.number)
    },
    addDelay() {
      this.$store.dispatch('countV1/addDelayBehavior',this.number)
    },
    //-----------  普通方式调用store(vuex)的actions中的方法结束  -----------


    //-----------  普通方式调用store(vuex)的mutations中的方法开始  -----------
    /** 调用store(vuex)的mutations中的方法v1.0 - 普通写法 */
    /**
    add() {
      this.$store.commit('countV1/ADD',this.number)
    },
    sub() {
      this.$store.commit('countV1/SUB',this.number)
    },
    addDelay() {
      this.$store.commit('countV1/ADDDELAY',this.number)
    },
    */
    //-----------  普通方式调用store(vuex)的mutations中的方法开始  -----------
    
  },
  computed: {
    /** 从store(vuex)的state中获取值v1.0 */
    //使用计算属性从state中获取值
    sumFromComputed() {
      return this.$store.state.countV1.sum
    },
    bigSumFromComputed() {
      return this.$store.getters['countV1/bigSum']
    },
    schooNameComputed() {
      return this.$store.state.countV1.school.schooName
    },
    schooAddressComputed() {
      return this.$store.state.countV1.school.schooAddress
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
