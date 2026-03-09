<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <!--
          基于to的对象式写法的 + 使用params传递参数
              1.to前面要加:
              2.to后面的对象中不能使用path配置路径，要使用name来配置路径，不然会出问题
              3.使用 params 进行参数传递
              4.在路由配置文件中要进行特别的配置
                  path: 'detail/:id/:content'
              5.接收参数时使用params接收
        -->


        <!-- 基于to的对象式写法的 + 使用params传递参数 -->
        <router-link active-class="active"
          :to="{
                  name: 'detail_',
                  params: {
                    id: message.id,
                    content: message.content
                  }
               }">
          基于to的对象式写法的 + 使用params传递参数-{{message.title}}
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