<template>
  <div>
    <h1>判断数据是不是响应式数据</h1>
  </div>
</template>

<script>
import {reactive, ref, readonly, isRef, isReactive, isReadonly, isProxy} from 'vue'

export default {
  name: 'HelloWorld',
  setup() {
    let car = reactive({
      name:'奔驰',
      price:'40w'
    })
    let sum = ref(0)
    let car2 = readonly(car)

    console.log(isRef(sum))
    console.log(isReactive(car))
    console.log(isReadonly(car2))
    console.log(isProxy(car))

    return {
      car,
      sum,
      car2
    }
  }
}
</script>
