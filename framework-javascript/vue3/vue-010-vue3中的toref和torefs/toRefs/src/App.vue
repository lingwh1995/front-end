<template>
  <ToRef/>
  <ToRefs/>
</template>

<script>
import ToRef from './components/ToRef.vue'
import ToRefs from './components/ToRefs.vue'

export default {
  name: 'App',
  components: {
    ToRef,
    ToRefs
  }
}
</script>