<template>
  <div>
    Student组件
  </div>
</template>

<script>

export default {
  name: 'Student',
  mounted() {
    this.pubsubId = PubSub.subscribe('topic',(topicName,msg) => {
      console.log('有人发布了hello消息,hello消息订阅成功~')
      console.log(topicName,msg)
    })
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.pubsubId)
  },
}
</script>

<style scoped>

</style>
