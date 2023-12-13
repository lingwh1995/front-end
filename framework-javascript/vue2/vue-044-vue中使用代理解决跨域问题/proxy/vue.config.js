const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave: false,
  //devServer配置方式一
  //配置解决跨域问题的代理服务器
  // devServer:{
  //   proxy: 'http://localhost:5000/'
  // }
  //devServer配置方式二：模仿nginx风格配置
  devServer: {
    // disableHostCheck: true,
    // open: false,
    port: 8888,
    proxy: {
      '^/rewrite': {
              ws: false, //用于支持websocket
              target: 'http://localhost:6000/',
              //后端是否可以获取到发起请求的真实ip
              changeOrigin: true,
              // secure: false,
              pathRewrite: {
                '^/rewrite': ''
              }
            }
    },
  }
  //devServer配置方式三
  // devServer: {
  //   // disableHostCheck: true,
  //   // open: false,
  //   // port: 8083,
  //   proxy: {
  //     '^/rewrite': {
  //             ws: false, //用于支持websocket
  //             target: 'http://localhost:6000/',
  //             //后端是否可以获取到发起请求的真实ip
  //             changeOrigin: true,
  //             // secure: false,
  //             pathRewrite: {
  //               '^/rewrite': ''
  //             }
  //           }
  //   },
  // }
})
