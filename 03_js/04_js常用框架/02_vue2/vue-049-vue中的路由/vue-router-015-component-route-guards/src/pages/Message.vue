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
        vue路由使用props简化接收路由传递的参数 + 使用编程式路由写法 + 使用params传递参数 + 路由元信息 + 组件内路由组件 - {{message.title}}
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
  //通过路由规则进入该组件时调用
  beforeRouteEnter(to,from,next){
    console.log('beforeRouteEnter...')
    console.log(to,from)

    //执行当前页面独有的业务逻辑一:修改当前页面的标题
    document.title = to.meta.title

    //执行当前页面独有的业务逻辑二:输入密码正确允许访问当前页面
    // const password = prompt('请输入页面访问密码（密码是123）')
    // if(password != '123') return

    //执行当前页面独有的业务逻辑三:判断用户是否登录了
    if(JSON.parse(localStorage.getItem('authentication'))) {
      next()
    }else {
      alert('请登录后再执行路由跳转操作')
    }
  },
  //通过路由离开进入该组件时调用
  beforeRouteLeave(to,from,next) {
    console.log('beforeRouteLeave...')
    console.log(to,from)

    //执行当前页面独有的业务逻辑一：修改要去的目标页面的标题
    document.title = to.meta.title

    //执行当前页面独有的业务逻辑二：将是否登录标识切换为未登录，下次再进入此页面时要先登录
    //localStorage.setItem('authentication',false)

    //放行 一定不要忘记写
    next()
  }
}
</script>

<style>

</style>