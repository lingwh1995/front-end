<template>
    <div>
        这是商品列表页面
        {{msg}}
        <!-- {{$route.params.xxx}}对应的url格式:http://localhost:8088/#/goods/556/user/admin -->
        <div>路由路径中传递的第一个参数:{{$route.params.goodsId}}</div>
        <div>路由路径中传递的第二个参数:{{$route.params.name}}</div>
        <div>
          <!-- 必须要有下面这行代码,否则下面两行代码的配置子路由点击时没有任何效果，只有地址栏的地址会改变 -->
          <router-view></router-view>
        </div>
        <!-- 1.普通路由+嵌套路由 -->
        <router-link to="/goods/title">进入商品标题组件</router-link><br/>
        <router-link to="/goods/photo">进入商品图片组件</router-link><br/>

        <router-link to="/page1">普通路由:跳转到页面1</router-link><br/>
        <!-- 编程式路由 -->
        <button @click="jump">编程式路由:跳转到页面2并传递参数</button><br/>
        <!-- 命名路由:路由路径中没有参数 -->
        <router-link v-bind:to="{name:'page3'}">命名路由跳转到页面3:路由路径中没有参数(完全写法格式)</router-link><br/>
        <router-link :to="{name:'page3'}">命名路由跳转到页面3:路由路径中没有参数(简单写法格式)</router-link><br/>
        <!-- 命名路由:路由路径中有参数 -->
        <router-link v-bind:to="{name:'page4',params:{goodsId:15291183358}}">命名路由跳转到页面4:路由路径中包含参数</router-link><br/>

        <!-- vue-resource使用 -->
        <router-link to="/vue-resource-$http" style="color:blue;">vue-resource-$http使用</router-link><br/>
        <router-link to="/vue-resource-$resource" style="color:blue;">vue-resource-$resourcec使用</router-link><br/>
        <router-link to="/vue-axios" style="color:blue;">axios使用</router-link>
        <hr/>

        <!-- 嵌套路由 -->
        <router-link to="/me">嵌套路由</router-link>
        <hr/>
    </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data () {
    return {
      msg: 'goodlist!'
    }
  },
  methods: {
    jump () {
      /**
       * 编程式路由
       *  注意: $router是对history对象的封装
       */
      // 形式1:直接把路径传进来
      // this.$router.push('/page1')

      // 形式2:传进去一个JSON对象,这个对象的key是path,对应的值是要跳转的路径
      // this.$router.push({path: '/page1'}) // 不携带参数
      this.$router.push({path: '/page2?goodsId=15291183358'}) // 携带参数
    }
  }
}
</script>
