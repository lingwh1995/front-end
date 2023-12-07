<template>
  <div>
    <MinxinOne/>
    <MinxinTwo/>
  </div>
</template>

<script>
import MinxinOne from './components/MixinOne.vue'
import MinxinTwo from './components/MixinTwo.vue'

export default {
  name: 'App',
  components: {
    MinxinOne,
    MinxinTwo
  }
}
</script>

<style>
</style>
