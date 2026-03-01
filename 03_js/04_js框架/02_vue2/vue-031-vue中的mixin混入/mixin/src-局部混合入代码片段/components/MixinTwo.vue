<template>
  <div>
      <span>{{msg}}</span><br/>
      <button @click="show('MixinTwo')">点击测试使用mixin混入特性引入公共代码片段中的方法</button><br/>
      <button @click="showCurrentComponentName">显示当前页面的组件名称</button>
  </div>
</template>

<script>
import {mixin} from './mixin.js'

export default {
  name: 'MixinTwo',
  data(){
    return {
      msg:'第二个组件：使用mixin混入特性引入公共代码片段'
    }
  },
  mixins: [mixin],
  methods: {
    //当前组件中和公共代码片段中重名的方法
    show(param) {
      alert(param)
    },
    //当前组件中的方法
    showCurrentComponentName() {
      alert('MixinTwo')
    }
  }
}
</script>

</style>
