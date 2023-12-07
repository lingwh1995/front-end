'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"/rest"',
  // BASE_URL: '"/easy-mock"',
  PROXY_TABLE: JSON.stringify({
    '/easy-mock': {
      target: 'http://localhost:8080',
      pathRewrite: {
        // "^/easy-mock": ""
      },
      onProxyReq: function (proxyReq, req, res) {
        // 实在不知道代理后的路径，可以在这里打印出出来看看
        console.log('原路径：' + req.originalUrl, '代理路径：' + req.path)
      }
    },
    '/rest': {
      target: 'http://localhost:8080',
      pathRewrite: {
        // "^/crud": ""
      },
      onProxyReq: function (proxyReq, req, res) {
        // 实在不知道代理后的路径，可以在这里打印出出来看看
        console.log('原路径：' + req.originalUrl, '代理路径：' + req.path)
      }
    }  
  })
})
