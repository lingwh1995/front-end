<template>
  <SetupComponent id="001" name="zhangsan" :age="18"/>
</template>

<script>
import SetupComponent from './components/SetupComponent.vue'

export default {
  name: 'App',
  components: {
    SetupComponent
  }
}
</script>

<style>

</style>
