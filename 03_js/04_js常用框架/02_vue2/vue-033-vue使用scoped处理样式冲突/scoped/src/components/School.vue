<template>
  <div class="div">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      msg: 'School组件'
    }
  }
}
</script>

<style scoped>
  .div {
    background-color: orange;
  }
</style>
