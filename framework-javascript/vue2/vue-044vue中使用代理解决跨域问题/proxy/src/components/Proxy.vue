<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>使用nginx解决跨域问题</h1>
    <button @click="handleCrossOriginByNginx">点击发送get请求-使用nginx解决跨域问题</button>
    <h1>使用vue解决跨域问题(devServer配置方式二:模拟nginx风格进行配置)</h1>
    <button @click="handleCrossOriginByVueMockNginx">点击发送get请求-使用vue解决跨域问题(devServer配置方式二:模拟nginx风格进行配置)</button>
    <h1>使用vue解决跨域问题(devServer配置方式三)</h1>
    <button @click="handleCrossOriginByVue">点击发送get请求-使用vue解决跨域问题(devServer配置方式三)</button>
  </div>
</template>

<script>
export default {
  /**
   * 解决跨域问题的两种方案:
   *    1.使用nginx解决跨域问题：
   *        在nginx安装目录中的conf.d文件夹中引入cross_origin.conf这个配置文件
   *        访问时需要访问nginx配置文件中的域名和端口： http://localhost:8888/
   *          server{
   *            #前端项目和后端项目被nginx代理后统一用这个接口访问
   *            listen       8888;
   *            #前端项目和后端项目被nginx代理后统一用这个域名访问
   *            server_name  localhost;
   *          }
   *    2.使用vue提供的代理服务器 devServer 解决问题
   *         在 vue.config.js 中配置devServer，详细见 vue.config.js 中的配置
   */       
  name: 'Proxy',
  data() {
    return {
      msg: 'Proxy'
    }
  },
  methods: {
    //使用nginx作为代理
    handleCrossOriginByNginx() {
      this.$axios.get('http://localhost:8888/api/list').then(
        response => {
          console.log(response.data)
        },
        error => {
          console.log(error.message)
        }
      )
    },
    //使用vue作为代理，模拟nginx风格配置
    handleCrossOriginByVueMockNginx() {
      //调用时添加前缀rewrite可以避免直接访问前端项目中的资源
      this.$axios.get('http://localhost:8888/rewrite/api/list').then(
        response => {
          console.log(response.data)
        },
        error => {
          console.log(error.message)
        }
      )
    },
    //使用vue作为代理
    handleCrossOriginByVue() {
      //调用时添加前缀rewrite可以避免直接访问前端项目中的资源
      this.$axios.get('http://localhost:8080/rewrite/api/list').then(
        response => {
          console.log(response.data)
        },
        error => {
          console.log(error.message)
        }
      )
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
