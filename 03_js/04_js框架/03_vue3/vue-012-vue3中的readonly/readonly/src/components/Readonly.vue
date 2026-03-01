<template>
  <div>
    年龄:{{person.age}}<br/>
    <button @click="updateAge">更新年龄</button>
  </div>
</template>

<script>
import {reactive,readonly,shallowReadonly} from 'vue'

export default {
  name: 'Readonly',
  setup() {
    let person = reactive({
      age: 20
    })
    const updateAge = () => {
      person.age++
    }

    //person = readonly(person)
    person = shallowReadonly(person)
    return {
      person,
      updateAge
    }
  }
}
</script>
