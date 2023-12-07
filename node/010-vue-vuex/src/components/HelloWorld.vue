<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!-- 获取vuex中存储的状态 -->
    <h2>{{$store.state.count}}</h2>
    <!-- 获取vuex中存储的状态中的派生属性的值 -->
    <h2>{{$store.getters.remark}}</h2>
    <button @click="touchMutations1">触发mutations中存储的方法(不传递参数)</button> <br/>
    <button @click="touchMutations2">触发mutations中存储的方法(传递参数)</button> <br/>
    <button @click="touchActions1">触发actions中存储的方法(不传递参数)</button> <br/>
    <button @click="touchActions2">触发actions中存储的方法(传递参数)</button> <br/>
    <h2>Ecosystem</h2>

    <!-- 
        注意:如果这个值是使用插值表达式来获取的,那么需要配合computed
             来事实监控属性值的改变,此时data()并不能直接就监测到值的变化
             {{$store.state.count}}可以实时监控到该值的变化
    -->
    <div>
      {{count}}
      {{dataCount}}
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataCount: this.$store.state.count //用data接收
    }
  },
  computed:{
    count(){
      return this.$store.state.count //用computed接收
    }
  },
  methods: {
    touchMutations1() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
    touchMutations2() {
      this.$store.commit('incrementByStep',5)
      console.log(this.$store.state.count)
    },
    touchActions1() {
      this.$store.dispatch('increment')
    },
    touchActions2() {
      this.$store.dispatch('incrementByStep',10)
    },
    increment () {
      this.$store.commit('increment')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
