<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <!--
          基于to的字符串式写法的路径传参
              1.to前面要加:
              2.to后面的内容是用es6语法 `` 和 模板字符串完成传值
              3.模板字符串外面要套一层 '' 或者 “”，否则无法解析
              4.在路由配置文件中要进行特别的配置
                  path: 'detail/:id/:content'
              5.接收参数时使用params接收
          基于to的对象式写法的路径传参
              1.to前面要加:
              2.path后面的内容是用es6语法 `` 和 模板字符串完成传值
              3.模板字符串外面要套一层 '' 或者 “”，否则无法解析
              4.在路由配置文件中要进行特别的配置
                  path: 'detail/:id/:content'
              5.接收参数时使用params接收
        -->

        <!-- 基于to的字符串式写法的路径传参 -->
        <!--
        <router-link active-class="active" :to="`/home/message/detail/${message.id}/${message.content}`">
          to的路径传参风格-{{message.title}}
        </router-link>
        -->

        <!-- 基于to的对象式写法的路径传参 -->
        <router-link active-class="active"
          :to="{
                  path: `/home/message/detail/${message.id}/${message.content}`
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