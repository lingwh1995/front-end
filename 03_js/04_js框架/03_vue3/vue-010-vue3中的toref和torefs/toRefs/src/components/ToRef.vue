<template>
  <div>
    <h1>ToRef</h1>
    姓名：{{name}}<br/>
    年龄：{{age}}<br/>
    <button @click="updateAge">修改年龄</button><br/>
    薪水：{{slary}}<br/>
    <button @click="updateSlary">修改薪水</button>
  </div>
</template>

<script>
import {reactive, toRef} from 'vue'

export default {
  name: 'ToRef',
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
      name: toRef(person,'name'),
      //使用toRef简化返回值并且使得简化后的返回值变成响应式数据
      age: toRef(person,'age'),
      slary:toRef(person.job,'slary'),
      updateAge,
      updateSlary
    }
  }
}
</script>

