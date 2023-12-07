<template>
    <div>
        {{msg}}
        <!-- {{$route.query.goodsId}}对应的url格式:/page4?goodId=15291183358 -->
        <span>传递过来的参数goodsId的值:{{$route.params.goodsId}}</span>
    </div>
</template>

<script>
export default {
  name: 'Page4',
  data () {
    return {
      msg: '命名路由跳转到页面4:路由路径中包含参数!'
    }
  }
}
</script>
