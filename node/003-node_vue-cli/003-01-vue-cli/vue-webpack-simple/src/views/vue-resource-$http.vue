<template>
    <div id="app">
        <div><h1>vue-resource插件讲解</h1></div>
        <a href="javascript:;" @click="get1">测试CET请求:从前端项目的static目录中获取json文件</a><br/>
        <a href="javascript:;" @click="get2">测试CET请求:从后端获取json格式的数据(es6语法)</a><br/>
        <a href="javascript:;" @click="get3">测试CET请求:从后端获取json格式的数据(es5语法)</a><br/>
        <a href="javascript:;" @click="post">测试POST请求</a><br/>
        <a href="javascript:;" @click="delete1">测试DELETE请求1</a><br/>
        <a href="javascript:;" @click="put1">测试PUT请求1</a><br/>
        <a href="javascript:;" @click="jsonp">测试JSONP请求</a><br/>
        <hr/>
        <a href="javascript:;" @click="get4">测试使用$http发送CET请求</a><br/>
        <a href="javascript:;" @click="post1">测试通用$http发送POST请求</a><br/>
        <a href="javascript:;" @click="put2">测试通用$http发送PUT请求</a><br/>
        <a href="javascript:;" @click="delete2">测试通用$http发送DELETE请求</a><br/>
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
  http: {
    // 设置base url
    // root: '/api'
  },
  /**
   * 1.then里面回调的error和catch中error的区别:
   *  this.$http.get(url, [options])
   *    .then(response =>{},error => {})
   *    .catch(error =>{})
   *    then里面的error只能显示出在调用后台时返回的错误
   *    catch里面的error可以显示此方法调用的整个过程中发生的错误,如get1
   * 2.$http调用格式
   *    get(url, [options])
   *    head(url, [options])
   *    delete(url, [options])
   *    jsonp(url, [options])
   *    post(url, [body], [options])
   *    put(url, [body], [options])
   *    patch(url, [body], [options])
   */
  methods: {
    /**
     * get(url, [options])
     */
    get1: function () {
      this.$http.get('static/package.json', {
        params: {
          id: '001'
        },
        headers: {
          token: 'header_token_get'
        }
      }).then(result => {
        // 如果注掉catch部分的代码,则捕获不到abc()未定义的错误,否则错误信息为: ReferenceError: abc is not defined
        // abc()
        this.msg = result.data
        console.log(result)
      }, error => {
        this.msg = error
        console.log(error)
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * es6 lambda写法
     */
    get2: function () {
      this.$http.get(this.contextPath + '/get/1', {

      }).then(result => {
        this.msg = result.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * 正常写法
     */
    get3: function () {
      this.$http.get(this.contextPath + '/get/3', {

      }).then(function (response) {
        this.msg = response.data
      }, function (error) {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * post(url, [body], [options])
     * put方法的两种Content-Type:
     * application/x-www-form-urlencoded:普通表单提交
     * multipart/form-data:上传时使用
     */
    post: function () {
      this.$http.post(this.contextPath + '/post', {
        id: '008',
        name: 'zhangsan',
        age: '58'
      }, {
        /**
         * emulateJSON:
         * true:发送给后台的数据不是Json格式,启用该选项后,请求会以application/x-www-form-urlencoded作为Content-Type，就像普通的HTML表单一样
         * false:发送给后台的数据是Json格式
         */
        emulateJSON: false,
        headers: {
          token: 'header_token_post'
        }
      }).then(result => {
        this.msg = result.data
      }, error => {
        this.msg = error
        console.log(error)
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * delete(url, [options])
     */
    delete1: function () {
      this.$http.delete(this.contextPath + '/delete/1', {
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * put(url, [body], [options])
     */
    put1: function () {
      this.$http.put(this.contextPath + '/put', {
        id: '1',
        name: 'new name',
        age: 28
      }, {
        emulateJSON: true
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    jsonp: function () {
      let url = 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web'
      this.$http.jsonp(url, {
        params: {
          wd: 'keyword'
        },
        jsonp: 'cb'
      }).then(response => {
        this.msg = response.data
        console.log(response)
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * 测试通用get请求
     */
    get4: function () {
      this.$http({
        url: this.contextPath + '/get/1',
        method: 'get',
        timeout: 5000,
        before: function () {
          console.log('before init...')
        }
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    post1: function () {
      this.$http({
        url: this.contextPath + '/post',
        method: 'post',
        params: {
          id: '005',
          name: 'lingwh',
          age: 25
        }
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    put2: function () {
      this.$http({
        url: this.contextPath + '/put',
        method: 'put',
        params: {
          id: '005',
          name: 'lingwh',
          age: 25
        }
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    delete2: function () {
      this.$http({
        url: this.contextPath + '/delete/1',
        method: 'delete'
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    }
  }
}
</script>
