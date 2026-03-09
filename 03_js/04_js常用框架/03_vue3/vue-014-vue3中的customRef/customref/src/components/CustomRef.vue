<template>
  <div>
    <input type="text" v-model="keyWord">
    <h3>{{keyWord}}</h3>
  </div>
</template>

<script>
import {customRef} from "vue";

export default {
  name: 'CustomRef',
  setup() {
    //自定义ref，`本质是一个函数
    function myRef(value){
      return customRef((track,trigger) => {
        return {
          get(){
            console.log("正在读取value,当前值为:",value);
            //通知Vue追踪value的变化
            track();
            return value;
          },
          set(newValue){
            console.log("正在修改value，新值为:",newValue);
            value = newValue;
            //通知Vue重新解析模板
            trigger();
          }
        }
      })
    }

    let keyWord = myRef("hello");

    return {
      keyWord
    }
  }
}
</script>
