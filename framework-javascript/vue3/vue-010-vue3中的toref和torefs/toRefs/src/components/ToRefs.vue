<template>
  <div>
    <h1>ToRefs</h1>
    姓名：{{name}}<br/>
    年龄：{{age}}<br/>
    <button @click="updateAge">修改年龄</button><br/>
    薪水：{{job.slary}}<br/>
    <button @click="updateSlary">修改薪水</button>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'

export default {
  name: 'Ref',
  setup(){
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        jobName: '程序员',
        slary: 2500
      }
    })

    function updateAge() {
      person.age++
    }

    function updateSlary() {
      person.job.slary++
    }
    return {
      //使用toRefs简化返回值并且使得简化后的返回值变成响应式数据
      //toRefs和toRef功能是一样的，只不过可以批量处理多个属性
      ...toRefs(person),
      updateAge,
      updateSlary
    }
  }
}
</script>

