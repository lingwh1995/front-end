<template>
  <div>
    <ul>
      <li v-for="news in newsList" :key="news.id">
        <!--
          vue路由使用props简化接收路由传递的参数
            基于to的对象式写法的 + 使用query传递参数
                1.to前面要加:
                2.to后面的对象中不能使用path配置路径，要使用name来配置路径，不然会出问题
                3.使用 query 进行参数传递
                4.接收参数时使用props接收
           vue中使用编程式路由完成路由跳转
             之前to里面怎么写 this.$router.push({})中就怎么写
        -->

        <!-- 基于to的对象式写法的 + 使用query传递参数 -->
        <!--
        <router-link active-class="active"
            :to="{
                  //注意：使用query传参时可以使用path或者name设置路径，使用params传参时只能使用name设置路径
                  //name: 'news_detail_',
                  path:'/home/news/news_detail',
                  query: {
                    id: news.id,
                    content: news.content
                  }
               }">
          vue路由使用props简化接收路由传递的参数 + 基于to的对象式写法的 + 使用params传递参数-{{news.title}}
        </router-link>
        -->

        <!-- vue中使用编程式路由完成路由跳转 -->
        <button class="list-group-item" active-class="active" @click="toNewsDetail(news)">
          vue路由使用props简化接收路由传递的参数 + 使用编程式路由写法 + 使用params传递参数-{{news.title}}
        </button>
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
      newsList:[
        {id:'001',title:'news001',content:'我是第一条News的内容'},
        {id:'002',title:'news002',content:'我是第二条News的内容'},
        {id:'003',title:'news003',content:'我是第三条News的内容'}
      ]
    }
  },
  methods: {
    toNewsDetail(news) {
      this.$router.push({
        //注意：使用query传参时可以使用path或者name设置路径，使用params传参时只能使用name设置路径
        //name: 'news_detail_',
        path:'/home/news/news_detail',
        query: {
          id: news.id,
          content: news.content
        }
      })
    }
  }
}
</script>

<style>

</style>