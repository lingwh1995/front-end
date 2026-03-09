<template>
  <div class="div">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      msg: 'Student组件'
    }
  }
}
</script>

<style scoped>
  .div {
    background-color: red;
  }
</style>
