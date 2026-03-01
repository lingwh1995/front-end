<template>
  <div>
    first：{{first}}<br/>
    <button @click="changeFirstBasicDataTypeValue">改变第一个基本类型数据的值</button><br/>
    second：{{second}}<br/>
    <button @click="changeSecondBasicDataTypeValue">改变第二个基本类型数据的值</button><br/>
    员工编号：{{person.id}}<br/>
    员工姓名：{{person.name}}<br/>
    员工年龄：{{person.age}}<br/>
    员工薪水：{{person.job.slary}}<br/>
    <button @click="changeReferenceDataTypeValueDefineByReactive1">改变reactive定义的引用类型数据的值1</button><br/>
    <button @click="changeReferenceDataTypeValueDefineByReactive2">改变reactive定义的引用类型数据的值2</button><br/>
    宠物编号：{{cat.id}}<br/>
    宠物名字：{{cat.name}}<br/>
    宠物年龄：{{cat.age}}<br/>
    <button @click="changeReferenceDataTypeValueDefineByRef">改变ref定义的引用类型数据的值</button><br/>

    <h4>--------展示watchEffect返回值开始--------</h4>
    {{watchEffectReturnValue}}
    <h4>--------展示watchEffect返回值结束--------</h4>

  </div>
</template>

<script>
import {ref,reactive,watchEffect} from "vue";
export default {
  name: 'WatchComponent',
  /**
   *  watchEffect
   *  1.watchEffect可以监视所有发生改变的数据，前提是把要监视的数据写在watchEffect()函数中
   *  2.watchEffect的返回值可以像computed()函数一样使用，区别是
   *    computed()函数更注重返回值
   *    watchEffect更注重数据发生变改的过程
   */
  setup() {
    //第一个基本类型数据
    let first = ref('0')
    //第二个基本数据类型
    let second = ref('1000')
    //reactive定义的引用数据类型
    let person = reactive({
      id:'001',
      name:'张三',
      age:10,
      job: {
        slary:10
      }
    })

    //用于保存watchEffect返回值
    let watchEffectReturnValue = reactive({})

    //ref定义的引用数据类型
    let cat = ref({
      id:'001',
      name:'煤球',
      age:1
    })

    //修改第一个基本类型的数据
    function changeFirstBasicDataTypeValue() {
      first.value++
    }
    //修改第二个基本类型的数据
    function changeSecondBasicDataTypeValue() {
      second.value++
    }

    //修改reactive定义的引用类型的数据
    function changeReferenceDataTypeValueDefineByReactive1() {
      person.age++
    }

    //修改reactive定义的引用类型的数据(测试特殊情况）
    function changeReferenceDataTypeValueDefineByReactive2() {
      person.job.slary++
    }

    //修改ref定义的引用类型的数据(
    function changeReferenceDataTypeValueDefineByRef() {
      cat.value.age++
    }

    watchEffect(() => {
      console.log('watchEffect被调用了...')
      //监视first值的改变(使用ref定义的基本类型数据)
      watchEffectReturnValue.first = first.value
      //监视second值的改变(使用ref定义的基本类型数据)
      watchEffectReturnValue.second = second.value
      //监控person.age属性的改变(使用reactive定义的引用类型数据)
      watchEffectReturnValue.personAge = person.age
      //监控person.job.slary属性的改变(使用reactive定义的引用类型数据)
      watchEffectReturnValue.slary = person.job.slary
      //监控cat.value.age属性的改变(使用ref定义的引用类型数据)
      watchEffectReturnValue.catAge = cat.value.age
    })

    return {
      first,
      second,
      person,
      cat,
      watchEffectReturnValue,
      changeFirstBasicDataTypeValue,
      changeSecondBasicDataTypeValue,
      changeReferenceDataTypeValueDefineByReactive1,
      changeReferenceDataTypeValueDefineByReactive2,
      changeReferenceDataTypeValueDefineByRef
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
