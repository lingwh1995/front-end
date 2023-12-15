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
      总和是：{{$store.state.sum}}
      总和放大10倍后是：{{$store.getters.bigSum}}
    </div>  
    <div>
      学校名称: {{$store.state.school.schooName}}<br/>
      学校地址：{{$store.state.school.schooAddress}}
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
  methods: {
    //-----------  普通方式调用store(vuex)的actions中的方法开始  -----------
    /** 调用store(vuex)的actions中的方法v1.0 -普通写法 */
    /***/
    add() {
      this.$store.dispatch('addBehavior',this.number)
    },
    sub() {
      this.$store.dispatch('subBehavior',this.number)
    },
    addDelay() {
      this.$store.dispatch('addDelayBehavior',this.number)
    },
    //-----------  普通方式调用store(vuex)的actions中的方法结束  -----------


    //-----------  普通方式调用store(vuex)的mutations中的方法开始  -----------
    /** 调用store(vuex)的mutations中的方法v1.0 - 普通写法 */
    /**
    add() {
      this.$store.commit('ADD',this.number)
    },
    sub() {
      this.$store.commit('SUB',this.number)
    },
    addDelay() {
      this.$store.commit('ADDDELAY',this.number)
    },
    */
    //-----------  普通方式调用store(vuex)的mutations中的方法开始  -----------
    
  },
  computed: {
    /** 从store(vuex)的state中获取值v1.0 */
    //使用计算属性从state中获取值
    sumFromComputed() {
      return this.$store.state.sum
    },
    bigSumFromComputed() {
      return this.$store.getters.bigSum
    },
    schooNameComputed() {
      return this.$store.state.school.schooName
    },
    schooAddressComputed() {
      return this.$store.state.school.schooAddress
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
