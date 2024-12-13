const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave: false,
  //解决跨域问题
  devServer: {
    // disableHostCheck: true,
    // open: false,
    port: 8080,
    proxy: {
      '^/qrcode-generator': {
          ws: false, //用于支持websocket
          target: 'http://localhost:8060/',
          //后端是否可以获取到发起请求的真实ip
          changeOrigin: true,
          // secure: false,
          // pathRewrite: {
          //   '^/qrcode-generator': '/qrcode-generator'
          // }
        }
    },
  },
  publicPath: '/qrcode-generator'
})