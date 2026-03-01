<template>
  <div>
    <h1>MarkRaw</h1>
    {{person}}<br/>
    <button @click="addCar">添加车辆</button>
    <button @click="updateCarPrice">修改车辆价格</button>
  </div>
</template>

<script>
/**
 * markRaw是将一个对象标记为普通对象，而toRaw是将reactive对象变为普通对象。
 *
 * 多用于我们给对象添加了一个新的对象，但是我们不需要使用该对象的响应式，让他作为一个普通对象就行。（如果不适用markRaw，新添加进reactive对象中的属性都会有响应式）
 */
import { reactive ,markRaw } from 'vue';
export default {
  name: 'MarkRaw',
  setup() {
    let person = reactive({
      name: "张三"
    })

    const addCar = () => {
      const car = {
        name: '奔驰',
        price: 40
      }
      //使用markRaw使添加的属性变成非响应式属性
      person.car = markRaw(car)
    }

    const updateCarPrice = () => {
      person.car.price++
    }

    return {
      person,
      addCar,
      updateCarPrice
    }
  }
}
</script>
