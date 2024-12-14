<template>
  <router-view />
</template>

<script>

import { onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      document.title = '条码生成系统'
    })
  }
}
</script>

<style>
html  {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
