<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <!--
          使用to传递参数 + 使用query接收参数 的第一种写法：字符串式写法
              1.to前面要加:
              2.to后面的内容是用es6语法 `` 和 模板字符串完成传值
              3.模板字符串外面要套一层 '' 或者 “”，否则无法解析
          使用to传递参数 + 使用query接收参数 的第一种写法：对象式写法
              1.to前面要加:
              2.to后面的对象中要使用 query 属性封装参数
        -->
        <!--
        <router-link active-class="active" :to="`/home/message/detail?id=${message.id}&content=${message.content}`">
          使用to传递参数 + 使用query接收参数-字符串式写法-{{message.title}}
        </router-link>
        -->

        <router-link active-class="active"
          :to="{
                path:'/home/message/detail',
                query: {
                  id: message.id,
                  content: message.content
                }
              }">
          使用to传递参数 + 使用query接收参数-对象式写法{{message.title}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data(){
    return {
      messages:[
        {id:'001',title:'message001',content:'我是第一条消息的内容'},
        {id:'002',title:'message002',content:'我是第二条消息的内容'},
        {id:'003',title:'message003',content:'我是第三条消息的内容'}
      ]
    }
  }
}
</script>

<style>

</style>