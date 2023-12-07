<template>
    <div id="app">
        <div><h1>vue-resource插件讲解</h1></div>
        <a href="javascript:;" @click="get1">测试CET方法:从前端项目的static目录中获取json文件</a><br/>
        <a href="javascript:;" @click="get2">测试CET方法:从后端获取json格式的数据(es6语法)</a><br/>
        <a href="javascript:;" @click="save">测试SAVE方法</a><br/>
        <a href="javascript:;" @click="update">测试UPDATE方法</a><br/>
        <a href="javascript:;" @click="delete1">测试DELETE方法</a><br/>
        <a href="javascript:;" @click="remove">测试REMOVE方法</a><br/>
        <hr/>
         {{msg}}
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'vueResourceTest',
  data () {
    return {
      msg: '请求的结果将会展示在这里',
      contextPath: this.bus.$data.BASE_URL
    }
  },
  mounted: function () {
    /**
     * 全局拦截器
     */
    Vue.http.interceptors.push(function (request, next) {
      console.log('request init...')
      next(function (response) {
        console.log('response init...')
        return response
      })
    })
  },
  /**
   * 1.then里面回调的error和catch中error的区别:
   *  this.$http.get(url, [options])
   *    .then(response =>{},error => {})
   *    .catch(error =>{})
   *    then里面的error只能显示出在调用后台时返回的错误
   *    catch里面的error可以显示此方法调用的整个过程中发生的错误,如get1
   * 2.$http调用格式
   *  get: {method: 'GET'},
   *  save: {method: 'POST'},
   *  query: {method: 'GET'},
   *  update: {method: 'PUT'},
   *  remove: {method: 'DELETE'},
   *  delete: {method: 'DELETE'}
   *  目前没发现:remove和delete方法有什么区别
   */
  methods: {
    get1: function () {
      var apiUrl = 'static/package.json'
      var resource = this.$resource(apiUrl)
      resource.get()
        .then(response => {
          this.msg = response.data
          // 如果注掉catch部分的代码,则捕获不到abc()未定义的错误,否则错误信息为: ReferenceError: abc is not defined
          // abc()
        })
        .catch(error => {
          this.msg = error
        })
    },
    get2: function () {
      var apiUrl = this.contextPath + '/get/1'
      var resource = this.$resource(apiUrl)
      resource.get()
        .then(response => {
          this.msg = response.data
          // 如果注掉catch部分的代码,则捕获不到abc()未定义的错误,否则错误信息为: ReferenceError: abc is not defined
          // abc()
        })
        .catch(error => {
          this.msg = error
        })
    },
    save: function () {
      var apiUrl = this.contextPath + '/post'
      var data = {'name': 'kangyj', age: 28}
      var resource = this.$resource(apiUrl, data)
      resource.save()
        .then(response => {
          this.msg = response.data
          // 如果注掉catch部分的代码,则捕获不到abc()未定义的错误,否则错误信息为: ReferenceError: abc is not defined
          // abc()
        })
        .catch(error => {
          this.msg = error
        })
    },
    update: function () {
      var apiUrl = this.contextPath + '/put'
      var data = {'name': 'kangyj', age: 28}
      var resource = this.$resource(apiUrl, data)
      resource.update()
        .then(response => {
          this.msg = response.data
          // 如果注掉catch部分的代码,则捕获不到abc()未定义的错误,否则错误信息为: ReferenceError: abc is not defined
          // abc()
        })
        .catch(error => {
          this.msg = error
        })
    },
    delete1: function () {
      var apiUrl = this.contextPath + '/delete'
      var data = {'id': '005'}
      var resource = this.$resource(apiUrl, data)
      resource.delete()
        .then(response => {
          this.msg = response.data
          // 如果注掉catch部分的代码,则捕获不到abc()未定义的错误,否则错误信息为: ReferenceError: abc is not defined
          // abc()
        })
        .catch(error => {
          this.msg = error
        })
    },
    remove: function () {
      var apiUrl = this.contextPath + '/delete'
      var data = {'id': '005'}
      var resource = this.$resource(apiUrl, data)
      resource.remove()
        .then(response => {
          this.msg = response.data
          // 如果注掉catch部分的代码,则捕获不到abc()未定义的错误,否则错误信息为: ReferenceError: abc is not defined
          // abc()
        })
        .catch(error => {
          this.msg = error
        })
    }
  }
}
</script>
