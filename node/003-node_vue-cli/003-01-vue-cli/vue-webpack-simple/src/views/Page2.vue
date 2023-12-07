<template>
    <div>
        {{msg}}
        <!-- {{$route.query.goodsId}}对应的url格式:/page2?goodsId=123 -->
        <span>传递过来的参数goodsId的值:{{$route.query.goodsId}}</span>
    </div>
</template>

<script>
export default {
  name: 'Page2',
  data () {
    return {
      msg: '编程式路由:跳转到页面2并传递参数!'
    }
  }
}
</script>
