<template>
  <div>
    {{$store.state.content}}
    <button @click="dispatch">点击测试DISPATCH的链式处理能力</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      content: 'abcde'
    }
  },
  methods: {
    dispatch() {
        this.$store.dispatch('step_1',this.content)
    }
  },
}
</script>

<style>

</style>
