<template>
  <div>
    <h1>ToRaw(打开控制台查看)</h1>
    姓名：{{person.name}}
  </div>
</template>

<script>
/**
 * 我们可以使用ref 和 reactive 将普通对象类型的数据变为响应式的数据。
 *
 * 我们可以使用toRaw 将reactive 对象的数据变为一般对象类型的数据。
 * 注意：toRaw不能用在ref 对象上，如果用在ref 对象上将不起作用
 */
import { reactive,toRaw } from 'vue';
export default {
  name: 'ToRaw',
  setup() {
    let person = reactive({
      name: "张三"
    })

    console.log(person)
    person = toRaw(person);
    console.log(person)
    return {
      person
    }
  }
}
</script>
