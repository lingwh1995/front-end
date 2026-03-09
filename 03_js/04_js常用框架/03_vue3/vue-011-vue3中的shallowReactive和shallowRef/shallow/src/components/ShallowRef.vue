<template>
  <div>
    <h1>shallowRef</h1>
    <div>年龄：{{age}}</div>
    <button @click="updateAge">修改年龄</button>
  </div>
</template>

<script>
/**
 * shallowRef的场景
 * 定义基本类型，可以提高性能
 * 使用shallowRef可以避免不必要的响应式更新，提高性能。当我们知道某个数据不需要进行深层次的响应式处理时，就可以选择使用shallowRef。
 *
 * 例如，当我们从服务器获取到一个包含大量数据的对象时，我们可能只需要对该对象的某个属性进行响应式处理，而不需要对整个对象进行响应式处理。这时候，使用shallowRef可以更好地满足我们的需求。
 */
import { shallowRef } from 'vue';

export default {
  name: 'ShallowRef',
  setup() {
    const age = shallowRef(10);
    const updateAge = () => {
      age.value++
    }

    return {
      age,
      updateAge
    }
  }
}
</script>
