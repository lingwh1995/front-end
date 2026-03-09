<template>
  <ShallowReactive/>
  <ShallowRef/>
</template>

<script>
import ShallowRef from './components/ShallowRef.vue'
import ShallowReactive from './components/ShallowReactive.vue'

export default {
  name: 'App',
  components: {
    ShallowRef,
    ShallowReactive
  }
}
</script>
