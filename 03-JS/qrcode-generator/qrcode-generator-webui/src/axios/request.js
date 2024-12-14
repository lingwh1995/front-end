import axios from 'axios'
import router from '@/router'

//全局封装axios
const request = axios.create({
  baseURL: '/qrcode-generator',
  // timeout 指定请求超时的毫秒数。 如果请求时间超过 `timeout` 的值，则请求会被中断 默认值是 `0` (永不超时)
  timeout: 1000 * 60 * 3
})

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code !== 200) {
      if(res.code == 403) {
        router.push('/login')
      }
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      if (res.code === 401 || res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您的登录状态已过期, 继续留在此页面, 或重新登录', '重新登录确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '停在此页',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        return res;
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default request  
