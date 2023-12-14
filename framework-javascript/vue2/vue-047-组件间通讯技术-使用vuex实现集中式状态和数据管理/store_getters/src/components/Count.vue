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
    总和是{{$store.state.sum}}
    总和放大10倍后是{{$store.getters.bigSum}}
  </div>
</template>

<script>
export default {
  name: 'Count',
  data() {
    return {
      number:1,
      sum:0
    }
  },
  methods: {
    add() {
      this.$store.dispatch('addBehavior',this.number)
    },
    sub() {
      this.$store.dispatch('subBehavior',this.number)
    },
    addDelay() {
      this.$store.dispatch('addDelayBehavior',this.number)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
