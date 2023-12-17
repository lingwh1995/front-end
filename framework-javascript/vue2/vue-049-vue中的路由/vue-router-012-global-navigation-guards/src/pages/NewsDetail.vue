<template>
  <ul>
    <li>消息编号:{{id}}</li>
    <li>消息标题:{{content}}</li>
  </ul>
</template>

<script>
export default {
  name: 'NewsDetail',
  props:['id','content'],
  mounted() {
    console.log(this.$route.params)
  }
}
</script>

<style>

</style>