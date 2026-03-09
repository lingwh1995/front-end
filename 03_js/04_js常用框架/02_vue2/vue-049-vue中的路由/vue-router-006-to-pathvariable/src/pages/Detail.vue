<template>
  <ul>
    <li>消息编号:{{$route.params.id}}</li>
    <li>消息标题:{{$route.params.content}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Detail',
  mounted() {
    console.log(this.$route.params)
  }
}
</script>

<style>

</style>