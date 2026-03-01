<template>
  <div>
    <ul>
      <li v-for="message in messageList" :key="message.id">
        <!--
          vue路由使用props简化接收路由传递的参数
            基于to的对象式写法的 + 使用params传递参数
                1.to前面要加:
                2.to后面的对象中不能使用path配置路径，要使用name来配置路径，不然会出问题
                3.使用 params 进行参数传递
                4.使用 params 进行参数传递在路由配置文件中要进行特别的配置
                    path: 'detail/:id/:content'
                5.接收参数时使用props接收
           vue中使用编程式路由完成路由跳转
             之前to里面怎么写 this.$router.push({})中就怎么写
        -->

        <!-- 基于to的对象式写法的 + 使用params传递参数 -->
        <!--
        <router-link active-class="active"
          :to="{
                  name: 'message_detail_',
                  params: {
                    id: message.id,
                    content: message.content
                  }
               }">
          vue路由使用props简化接收路由传递的参数 + 基于to的对象式写法的 + 使用params传递参数-{{message.title}}
        </router-link>
        -->

        <!-- vue中使用编程式路由完成路由跳转 -->
        <button class="btn btn-default" active-class="active" @click="toMessageDetail(message)">
          vue路由使用props简化接收路由传递的参数 + 使用编程式路由写法 + 使用params传递参数 + 缓存路由组件 - {{message.title}}
          <input type="text"/>
        </button>
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
      messageList:[
        {id:'001',title:'message001',content:'我是第一条Message的内容'},
        {id:'002',title:'message002',content:'我是第二条Message的内容'},
        {id:'003',title:'message003',content:'我是第三条Message的内容'}
      ]
    }
  },
  methods: {
    toMessageDetail(message) {
      this.$router.push({
        name: 'message_detail_',
        params: {
          id: message.id,
          content: message.content
        }
      })
    }
  },
  beforeDestroy() {
    console.log('Message组件将被销毁...')
  }
}
</script>

<style>

</style>