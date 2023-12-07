<template>
    <div>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <p>{{num}}</p>
        <p>{{msg}}</p>
    </div>
</template>
<script>
export default {
  name: 'counter',
  data () {
    return {
      msg: 'hello Counter!',
      num: 10
    }
  },
  methods: {
    increment: function () {
      this.num++
    },
    decrement: function () {
      this.num--
    }
  }
}
</script>
