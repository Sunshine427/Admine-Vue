// 该文件解决axios发送请求时的三个问题
import axios from 'axios'
import {getToken} from './auth.js'

// 1 创建axios实例 就是复制axios，然后定制自己需要的，但是不会影响axios
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 3 使用axios中的请求拦截器 解决每次发送axios都要在headers中添加token
http.interceptors.request.use(function (config) {
  // 在请求发送之前 做的操作 给每次请求的请求头添加token
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 2 将axios扩展为vue的功能 解决每次都引入axios，要写长长的http路径
const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  Vue.prototype.$http = http
}

export default httpPlugin
