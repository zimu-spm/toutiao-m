/* 路由模块 */
import axios from 'axios'
// 导入处理大数字的包
import JSONbig from 'json-bigint'

// 导入唯一的公共数据源
import store from '@/store'
// http://ttapi.research.itcast.cn/ http://toutiao-app.itheima.net/
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [
    function (data) {
      // 自定义 处理响应数据
      // Do whatever you want to transform the data
      try {
        return JSONbig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})
// 请求拦截器，处理请求的配置对象，添加请求头
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (store.state.userInfo && store.state.userInfo.token) {
      config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
export default request
