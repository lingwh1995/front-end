<template>
  <div>
    xxx
  </div>
</template>

<script>
import {useWindowResize} from '../hooks/useWindowResize.js'

export default {
  name: 'Hooks',
  setup() {
    const { width, height } = useWindowResize()
    console.log(width,height)
  }
}
</script>
