<template>
  <div>
    <button @click="add">点击给Student组件传递数据</button>
  </div>
</template>

<script>

export default {
  name: 'School',
  data() {
    return {
      name:'zhagnsan'
    }
  },
  methods: {
    add() {
      PubSub.publish('topic','hello pubsubjs~')
    }
  },
}
</script>

<style scoped>

</style>
