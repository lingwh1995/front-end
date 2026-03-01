<template>
  <div>
    请输入姓:<input type="text" v-model="person.firstName"/><br/>
    请输入名:<input type="text" v-model="person.lastName"/><br/>
    姓名:<input type="text" v-model="person.fullName"/>
  </div>
</template>

<script>
import {computed, reactive} from "vue";
export default {
  name: 'ComputedComponent',
  setup() {
    let person = reactive({
      firstName:'',
      lastName:'',
      fullName:''
    })

    //计算属性的简写形式，缺点：没有考虑计算属性被修改的形式
    // person.fullName = computed(() => {
    //   return person.firstName + '-' + person.lastName
    // })

    //计算属性的简写形式，缺点：考虑了计算属性被修改的形式
    person.fullName = computed({
        get(){
          return person.firstName + '-' +person.lastName
        },
        set(value){
          const nameArr = value.split('-')
          person.firstName = nameArr[0]
          person.lastName = nameArr[1]
        }
    })
    return {
      person
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
