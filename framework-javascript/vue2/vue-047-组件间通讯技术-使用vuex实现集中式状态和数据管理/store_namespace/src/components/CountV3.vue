<template>
  <div>
    <select v-model="number">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="addBehavior(number)">+</button>
    <button @click="subBehavior(number)">-</button>
    <button @click="addDelayBehavior(number)">延迟1s加</button>
    
    <h3>不使用计算属性从$store中取值</h3>
    <div>
      总和是：{{$store.state.countV3.sum}}
      总和放大10倍后是：{{$store.getters['countV3/bigSum']}}
    </div>  
    <div>
      学校名称: {{$store.state.countV3.school.schooName}}<br/>
      学校地址：{{$store.state.countV3.school.schooAddress}}
    </div>

    <h3>使用mapState和mapGetters从计算属性从$store中取值[数组式写法]</h3>
    <div>
      总和是：{{sum}}
      总和放大10倍后是：{{bigSum}}
    </div>  
    <div>
      学校名称: {{school.schooName}}<br/>
      学校地址：{{school.schooAddress}}
    </div>
  </div>
</template>

<script>
//使用mapState前要先导入mapState
import {mapState} from 'vuex'
//使用mapGetters前要先导入mapState
import {mapGetters} from 'vuex'
//使用mapActions前要先导入mapState
import {mapActions} from 'vuex'
//使用mapMutations前要先导入mapState
import {mapMutations} from 'vuex'

//也可以一次性导入mapState和mapGetters
//import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  name: 'Count',
  data() {
    return {
      number:1
    }
  },
  methods: {
    //-----------  mapActions调用store(vuex)的actions中的方法开始  -----------
    
    /** 调用store(vuex)的actions中的方法v3.0  - 数组式写法 */
    ...mapActions('countV3',{addBehavior:'addBehavior',subBehavior:'subBehavior',addDelayBehavior:'addDelayBehavior'})
    
    //-----------  mapActions调用store(vuex)的actions中的方法结束  -----------
  

    //-----------  mapMutations调用store(vuex)的mutations中的方法开始  -----------
    
    /** 调用store(vuex)的mutations中的方法v3.0 - 数组式写法 */
    //...mapMutations('countV3',['addBehavior','subBehavior','addDelayBehavior'])
    
    //-----------  mapMutations调用store(vuex)的mutations中的方法结束  -----------
  },
  computed: { 
    /** 从store(vuex)的state中获取值v3.0 */
    //使用mapState从state中获取值-数组式写法
    ...mapState('countV3',['sum','school']),
    //使用mapState从state中获取值-数组式写法
    ...mapGetters('countV3',['bigSum'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
