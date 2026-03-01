<template>
  <div>
      <span>{{msg}}</span><br/>
      <button @click="show('MixinOne')">点击测试使用mixin混入特性引入公共代码片段中的方法</button><br/>
      <button @click="showCurrentComponentName">显示当前页面的组件名称</button>
  </div>
</template>

<script>
export default {
  name: 'MixinOne',
  data(){
    return {
      msg:'第一个组件中：使用mixin混入特性引入公共代码片段'
    }
  },

  methods: {
    //当前组件中和公共代码片段中重名的方法
    // show(param) {
    //   alert(param)
    // },
    //当前组件中的方法
    showCurrentComponentName() {
      alert('MixinOne')
    }
  }
}
</script>

</style>
