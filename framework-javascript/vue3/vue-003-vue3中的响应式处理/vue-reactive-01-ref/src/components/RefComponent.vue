<template>
  <div >
    {{name}}<br/>
    <button @click="sayHello">sayhello</button><br/>
    <button @click="updateName">修改name[ref处理基本类型数据]</button><br/>
    {{item.itemId}} - {{item.todo}}<br/>
    <button @click="updateItem">修改item[ref处理引用类型数据]</button><br/>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: 'HelloWorld',
  setup() {
    let name = ref('张三')
    function sayHello() {
      alert(`名字是:${name.value}`)
    }
    //ref处理基本类型数据
    function updateName() {
      name.value = '张三修改后'
    }

    let item = ref({
      itemId:'001',
      todo:'吃饭'
    })
    //ref处理引用类型数据
    function updateItem() {
      console.log(item)
      console.log(item.value)
      item.value.itemId = '002',
      item.value.todo = '睡觉'
    }
    return {
      name,
      sayHello,
      updateName,
      item,
      updateItem
    }
  }
}
</script>

<style scoped>

</style>
