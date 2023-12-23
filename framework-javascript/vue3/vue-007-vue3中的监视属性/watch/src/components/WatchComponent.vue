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
    //reactive定义的引用数据类型
    let person = reactive({
      id:'001',
      name:'张三',
      age:10,
      job: {
        slary:10
      }
    })
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
    /**
     * 监视ref定义的基本类型数据时，
     *    错误写法: watch(first.value,(newValue,oldValue) => {})
     *    正确写法: watch(first,(newValue,oldValue) => {})
     */
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
    /**/
    watch([first,second],(newValue,oldValue) => {
      console.log('first或second的值改变了...')
      console.log(newValue,oldValue)
    })


    //情况五：(监视失败)监视reactive定义的响应式数据(一个引用类型数据的全部属性)的变化
      //vue3存在的问题:1.vue3无法正确监视reactive定义的响应式数据 2.监视reactive定义的数据时，vue3默认开启深度监视，配置deep:false也无法关闭
    /*
    watch(person,(newValue,oldValue) => {
      console.log('person的值改变了...')
      console.log(newValue,oldValue)
    })
    */


    //情况五：监视reactive定义的响应式数据(一个引用类型数据的某个属性)的变化
    /*
    watch(() => person.age,(newValue,oldValue) => {
      console.log('person的age属性的值改变了...')
      console.log(newValue,oldValue)
    })
    */


    //情况六：监视reactive定义的响应式数据(一个引用类型数据的某些属性)的变化
    watch([() => person.name,() => person.age],(newValue,oldValue) => {
      console.log('person的name或age属性的值改变了...')
      console.log(newValue,oldValue)
    })


    //特殊情况：需要配置deep:true
    watch(() => person.job,(newValue,oldValue) => {
      console.log('person的job属性的值改变了...')
      console.log(newValue,oldValue)
    },{deep:true})


    /**
     * 监视ref定义的引用类型数据时，
     *    错误写法: watch(() => cat.age, (newValue,oldValue) => {})
     *    正确写法: watch(() => cat.value.age, (newValue,oldValue) => {})
     */
    watch(() => cat.value.age, (newValue,oldValue) => {
      console.log('cat的age属性的值改变了...')
      console.log(newValue,oldValue)
    })

    return {
      first,
      second,
      person,
      cat,
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
