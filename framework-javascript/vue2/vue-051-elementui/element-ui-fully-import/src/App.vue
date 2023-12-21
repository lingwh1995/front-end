<template>
  <div id="app">
    <Layout/>
    <Button/>
    <DataPicker/>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'
import Button from './components/Button.vue'
import DataPicker from './components/DataPicker.vue'

export default {
  name: 'App',
  components: {
    Layout,
    Button,
    DataPicker
  }
}
</script>

<style>

</style>
