import axios from 'axios'

const service = axios.create({
  baseURL: process.env.baseUrl,
  // 请求超时时间
  timeout: 30000 
})

export default service
