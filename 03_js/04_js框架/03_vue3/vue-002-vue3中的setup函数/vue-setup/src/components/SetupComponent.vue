<template>
  <div >
    {{name}}
    {{age}}
    <button @click="sayHello">sayhello</button>
  </div>
</template>

<script>

export default {
  name: 'SetupComponent',
  setup() {
    let name = '张三'
    let age = 10
    function sayHello() {
      alert(`名字是:${name},年龄是:${age}`)
    }
    return {
      name,
      age,
      sayHello
    }
  }
}
</script>

<style scoped>

</style>
