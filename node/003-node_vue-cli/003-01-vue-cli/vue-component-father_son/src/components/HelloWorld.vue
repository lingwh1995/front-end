<template>
  <div class="hello">
    <h2>父组件向子组件通信(父组件调用子组件的方法和属性)</h2>
    <ul>
      <li>
        <router-link to="/p2c">P2C</router-link>
      </li>
    </ul>
    <h2>子组件向父组件通信(子组件调用父组件的方法)</h2>
    <ul>
      <li>
        <router-link to="/c2p">C2P</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
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
