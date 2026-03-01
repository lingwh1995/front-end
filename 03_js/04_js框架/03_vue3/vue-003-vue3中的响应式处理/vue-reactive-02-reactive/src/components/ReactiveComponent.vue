<template>
  <div >
    {{item.itemId}} - {{item.todo}}<br/>
    <button @click="updateItem">修改item[reactive处理引用类型数据]</button><br/>
    {{hobby[0]}} - {{hobby[1]}} - {{hobby[2]}}<br/>
    <button @click="updateArray">修改hobby[reactive处理数组类型数据]</button><br/>
  </div>
</template>

<script>
import {reactive} from "vue";

/**
 * 注意:如果使用ref定义了一个引用类型的响应式数据，这个数据vue3最终也会交给reactive处理
 */
export default {
  name: 'ReactiveComponent',
  setup() {
    let item = reactive({
      itemId:'001',
      todo:'吃饭'
    })
    //reactive处理引用类型数据
    function updateItem() {
      console.log(item)
      item.itemId = '002',
      item.todo = '睡觉'
    }

    //reactive处理数组类型数据
    let hobby = reactive(['吃饭','睡觉','打豆豆'])
    function updateArray() {
      //特别注意:vue2是不支持直接修改数组中元素的
      hobby[0] = '烫头'
    }
    return {
      name,
      item,
      updateItem,
      hobby,
      updateArray
    }
  }
}
</script>

<style scoped>

</style>
