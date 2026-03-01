<template>
  <div>
    Child组件
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'Child',
  async setup() {
    let sum = ref(0)
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({sum})
      }, 3000)
    })
    return await p
  }
}
</script>