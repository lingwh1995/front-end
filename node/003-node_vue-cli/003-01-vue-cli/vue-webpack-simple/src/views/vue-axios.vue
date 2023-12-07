<template>
    <div id="app">
        <div><h1>axios插件讲解</h1></div>
        <a href="javascript:;" @click="get1">测试使用axios发送CET请求(路径传参)</a><br/>
        <a href="javascript:;" @click="get2">测试使用axios发送CET请求(问号传参)</a><br/>
        <a href="javascript:;" @click="get5">测试使用axios发送CET请求(params传参)</a><br/>
        <a href="javascript:;" @click="post1">测试使用axios发送POST请求</a><br/>
        <a href="javascript:;" @click="put1">测试使用axios发送PUT请求</a><br/>
        <a href="javascript:;" @click="delete1">测试使用axios发送DELETE请求(路径传参)</a><br/>
        <a href="javascript:;" @click="delete3">测试使用axios发送DELETE请求(问号传参)</a><br/>
        <a href="javascript:;" @click="delete5">测试使用axios发送DELETE请求(params传参)</a><br/>
        <hr/>
        <a href="javascript:;" @click="get3">测试使用通用的API发送GET请求(路径传参)</a><br/>
        <a href="javascript:;" @click="get4">测试使用通用的API发送GET请求(问号传参)</a><br/>
        <a href="javascript:;" @click="get6">测试使用通用的API发送GET请求(params传参)</a><br/>
        <a href="javascript:;" @click="post2">测试使用通用的API发送POST请求</a><br/>
        <a href="javascript:;" @click="put2">测试使用通用的API发送PUT请求</a><br/>
        <a href="javascript:;" @click="delete2">测试使用通用的API发送DELETE请求(路径传参)</a><br/>
        <a href="javascript:;" @click="delete4">测试使用通用的API发送DELETE请求(问号传参)</a><br/>
        <a href="javascript:;" @click="delete6">测试使用通用的API发送DELETE请求(params传参)</a><br/>
        <hr/>
        <a href="javascript:;" @click="currentGetFirst">测试使用执行并发请求(形式一)</a><br/>
        <a href="javascript:;" @click="currentGetSecond">测试使用执行并发请求(形式2)</a><br/>
        {{msg}}
    </div>
</template>
<script>

export default {
  name: 'vueResourceTest',
  data () {
    return {
      msg: '请求的结果将会展示在这里',
      contextPath: this.bus.$data.BASE_URL
    }
  },
  /**
   * 全局拦截器
   */
  mounted: function () {
    this.$axios.interceptors.request.use(function (config) {
      console.log('request init.....')
      return config
    })
    this.$axios.interceptors.response.use(function (response) {
      console.log('response init.....')
      return response
    })
  },
  /**
   * 1.相比于vue-resource.vue的编码,能更清晰的认识到一点,
   *   then里面不用写回调了,直接用catch(error => {})捕获前后台所有的错误
   * 2.axios调用格式
   *   axios＃request（config）
   *   axios＃get（url [config]）
   *   axios＃delete（url [config]）
   *   axios＃head（url [config]）
   *   axios＃post（url [data [,config]]）
   *   axios＃put（url [data [,config]]）
   *   axios＃patch（url [data [,config]]）
   */
  methods: {
    get1: function () {
      this.$axios.get(this.contextPath + '/get/1', {
        headers: {
          token: 'test_token'
        }
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    get2: function () {
      this.$axios.get(this.contextPath + '/get?name=xxx', {
        headers: {
          token: 'test_token'
        }
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    get5: function () {
      this.$axios.get(this.contextPath + '/get', {
        params: {
          name: 'ls'
        },
        headers: {
          token: 'test_token'
        }
      }).then(response => {
        this.msg = response.data
      }, error => {
        this.msg = error
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * 使用post时遇到的一个坑,下面两种方式无法设置Content-Type的值为application/x-www-form-urlencoded
     *  this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
     *  headers: {'Content-Type':'application/x-www-form-urlencoded'}
     * 经过大概20分钟的实验,小凌最终还是无法传递一个Content-Type的值为application/x-www-form-urlencoded的参数到
     * 后台,最终传递了一个Content-Type的值为application/json的参数到后台去
     */
    post1: function () {
      this.$axios.post(this.contextPath + '/postjson', {
        name: 'lingyf',
        age: 39
      }, {
        headers: {
          'toekn': 'xxxx_post'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * Content-Type的设置和上面的post1方法是一样的问题
     */
    put1: function () {
      this.$axios.put(this.contextPath + '/putjson', {
        id: '005',
        name: 'lingpj',
        age: 39
      }, {
        headers: {
          'toekn': 'xxxx_put'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    delete1: function () {
      this.$axios.delete(this.contextPath + '/delete/1', {
        id: '005',
        name: 'lingpj',
        age: 39
      }, {
        headers: {
          'toekn': 'xxxx_put'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    delete3: function () {
      this.$axios.delete(this.contextPath + '/delete?id=005', {
        headers: {
          'toekn': 'xxxx_delete3'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    delete5: function () {
      this.$axios.delete(this.contextPath + '/delete', {
        params: {
          id: '008'
        },
        headers: {
          'toekn': 'xxxx_delete5'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    get3: function () {
      this.$axios({
        url: this.contextPath + '/get/1',
        method: 'get',
        headers: {
          'token': 'xxx'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * 设置data属性无法传递参数,要么路径传参,要么问号传参
     */
    get4: function () {
      this.$axios({
        url: this.contextPath + '/get?name=xxxx',
        method: 'get',
        headers: {
          'token': 'xxx'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    get6: function () {
      this.$axios({
        url: this.contextPath + '/get',
        method: 'get',
        params: {
          name: 'zs'
        },
        headers: {
          'token': 'xxx'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    /**
     * 仍然无法设置'Content-Type':'application/x-www-form-urlencoded',即使设置了，后台能调用通，参数无法传递过去,
     * 没有意义,所以不要设置Content-Type了,直接给后台传递json格式的数据,后台使用@RequestBody来接收
     */
    post2: function () {
      this.$axios({
        url: this.contextPath + '/postjson',
        method: 'post',
        data: {
          name: 'zhanghui',
          age: '27'
        },
        headers: {
          'token': 'xxx'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    put2: function () {
      this.$axios({
        url: this.contextPath + '/putjson',
        method: 'put',
        data: {
          name: 'lingmc',
          age: '48'
        },
        headers: {
          'token': 'xxx'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    delete2: function () {
      this.$axios({
        url: this.contextPath + '/delete/1',
        method: 'delete',
        headers: {
          'token': 'xxx_delete'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    delete4: function () {
      this.$axios({
        url: this.contextPath + '/delete?id=006',
        method: 'delete',
        headers: {
          'token': 'xxx_delete'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    delete6: function () {
      this.$axios({
        url: this.contextPath + '/delete',
        params: {
          id: '0065'
        },
        method: 'delete',
        headers: {
          'token': 'xxx_delete6'
        }
      }).then(response => {
        this.msg = response.data
      }).catch(error => {
        this.msg = error
      })
    },
    currentGet1: function () {
      return this.$axios.get(this.contextPath + '/get/1')
    },
    currentGet2: function () {
      return this.$axios.get(this.contextPath + '/get/2')
    },
    /**
     * 待解决的问题:this指向问题,jquery中使用$.proxy(function(),this)解决
     */
    currentGetFirst: function () {
      var _this = this
      this.$axios.all([_this.currentGet1(), _this.currentGet2()])
        .then(_this.$axios.spread(function (get1Reult, get2Reult) {
          console.log(get1Reult.data)
          console.log(get2Reult.data)
        }))
    },
    /**
     * 待解决的问题:this指向问题,jquery中使用$.proxy(function(),this)解决
     */
    currentGetSecond: function () {
      var _this = this
      function a1 () {
        return _this.$axios.get(_this.contextPath + '/get/1')
      }
      function a2 () {
        return _this.$axios.get(_this.contextPath + '/get/2')
      }
      this.$axios.all([a1(), a2()])
        .then(_this.$axios.spread(function (get1Reult, get2Reult) {
          console.log(get1Reult.data)
          console.log(get2Reult.data)
        }))
    }
  }
}
</script>
