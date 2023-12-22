<template>
  <div>
    {{first}}<br/>
    <button @click="changeFirstBasicDataTypeValue">改变第一个基本类型数据的值</button><br/>
    {{second}}<br/>
    <button @click="changeSecondBasicDataTypeValue">改变第二个基本类型数据的值</button><br/>
    {{person.id}} - {{person.name}} - {{person.age}}<br/>
    <button @click="changeReferenceDataTypeValue">改变基本类型数据的值</button><br/>
  </div>
</template>

<script>
import {ref,reactive,watch} from "vue";
export default {
  name: 'WatchComponent',
  setup() {
    //第一个基本类型数据
    let first = ref('0')
    //第二个基本数据类型
    let second = ref('1000')
    //引用数据类型
    let person = reactive({
      id:'001',
      name:'张三',
      age:10
    })

    //修改第一个基本类型的数据
    function changeFirstBasicDataTypeValue() {
      first.value++
    }
    //修改第二个基本类型的数据
    function changeSecondBasicDataTypeValue() {
      second.value++
    }

    //修改引用类型的数据
    function changeReferenceDataTypeValue() {
      person.age++
    }

    //情况一：监视ref定义的响应式数据(一个基本类型数据)的变化
    /*
    watch(first,(newValue,oldValue) => {
      console.log('first的值改变了...')
      console.log(newValue,oldValue)
    })
    */


    //情况二：监视ref定义的响应式数据(一个基本类型数据)的变化 + watch的配置项
    /*
    watch(first,(newValue,oldValue) => {
      console.log('first的值改变了...')
      console.log(newValue,oldValue)
    },{immediate:true,deep:true})
    */


    //情况三：监视ref定义的响应式数据(多个基本类型数据)的变化写法一
    /*
    watch(first,(newValue,oldValue) => {
      console.log('first的值改变了...')
      console.log(newValue,oldValue)
    })
    watch(second,(newValue,oldValue) => {
      console.log('second的值改变了...')
      console.log(newValue,oldValue)
    })
    */


    //情况四：监视ref定义的响应式数据(多个基本类型数据)的变化写法二
    /*
    watch([first,second],(newValue,oldValue) => {
      console.log('first或second的值改变了...')
      console.log(newValue,oldValue)
    })
    */

    //情况五：监视reactive定义的响应式数据(一个引用类型数据)的变化
      //vue3存在的问题:1.无法正确监视reactive定义的响应式数据 2.vue3默认开启深度监视。配置deep:false也无法关闭
    watch(person,(newValue,oldValue) => {
      console.log('person的值改变了...')
      console.log(newValue,oldValue)
    })
    return {
      first,
      second,
      person,
      changeFirstBasicDataTypeValue,
      changeSecondBasicDataTypeValue,
      changeReferenceDataTypeValue
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
