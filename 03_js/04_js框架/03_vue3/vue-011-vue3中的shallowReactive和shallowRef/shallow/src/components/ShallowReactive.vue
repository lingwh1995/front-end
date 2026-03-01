<template>
  <div>
    <h1>shallowReactive</h1>
    <div>年龄[第一层]：{{person.age}}</div>
    <div>年龄[第二层+]：{{person.friend.age}}</div>
    <button @click="updateAgeFirstLevel">修改年龄[第一层]</button><br/>
    <button @click="updateAgeSecondLevel">修改年龄[第二层+]</button><br/>
  </div>
</template>

<script>
/**
 * shallowReactive是一个函数，用于创建一个浅层次的响应式对象。
 * 与reactive不同，shallowReactive只会对对象的第一层属性进行响应式处理，不会递归地将对象内部的属性都变成响应式。
 */
import {shallowReactive} from 'vue'

export default {
  name: 'ShallowReactive',
  setup() {
    let person = shallowReactive({
      age: 18,
      friend: {
        age: '28'
      }
    })

    /** 修改年龄:第一层 */
    const updateAgeFirstLevel = () => {
      person.age++
    }

    /** 修改年龄:第二层 */
    const updateAgeSecondLevel = () => {
      person.friend.age++
    }

    return {
      person,
      updateAgeFirstLevel,
      updateAgeSecondLevel
    }
  }
}
</script>

