<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <!--
          使用to携带参数
          1.字符串写法:
              1.1.to前面要加:
              1.2.to后面的内容是用es6语法 `` 和 模板字符串完成传值
              1.3.模板字符串外面要套一层 '' 或者 “”，否则无法解析
          2.对象写法
        -->
        <!--
        <router-link active-class="active" :to="`/home/message/detail?id=${message.id}&content=${message.content}`">
          to的字符串写法-{{message.title}}
        </router-link>
        -->

        <!-- 使用name代替path进行配置跳转路径 -->
        <router-link active-class="active"
          :to="{
                name:'detail_',
                query: {
                  id: message.id,
                  content: message.content
                }
              }">
          to的对象写法-{{message.title}}
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