<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <!--
          vue路由使用props简化接收路由传递的参数
            基于to的对象式写法的 + 使用query传递参数
                1.to前面要加:
                2.to后面的对象中不能使用path配置路径，要使用name来配置路径，不然会出问题
                3.使用 query 进行参数传递
                4.接收参数时使用props接收
        -->

        <!-- 基于to的对象式写法的 + 使用query传递参数 -->
        <router-link active-class="active"
                     :to="{
                  //注意：使用query传参时可以使用path或者name设置路径，使用params传参时只能使用name设置路径
                  //name: 'news_detail_',
                  path:'/home/news/news_detail',
                  query: {
                    id: message.id,
                    content: message.content
                  }
               }">
          vue路由使用props简化接收路由传递的参数 + 基于to的对象式写法的 + 使用params传递参数-{{message.title}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'News',
  data(){
    return {
      messages:[
        {id:'001',title:'message001',content:'我是第一条News的内容'},
        {id:'002',title:'message002',content:'我是第二条News的内容'},
        {id:'003',title:'message003',content:'我是第三条News的内容'}
      ]
    }
  }
}
</script>

<style>

</style>