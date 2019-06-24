// 创建一个 axios 的插件
// 引入 axios
import axios from 'axios'
// 创建插件对象
var myaxios = {}
// 添加插件方法
myaxios.install = function (Vue) {
  // 统一设置请求的地址(将来只要是 axios 发送的请求，都会在前面添加这个路径)
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 统一设置请求的头部(只会执行一次，一次设置完成之后，后面的值都是一样的)
  // axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
  // 添加一个请求拦截器
  axios.interceptors.request.use(function (config) { // config 本次请求的相关信息
    console.log('-------------拦截器-------------')
    console.log(config.headers.Authorization)
    // 在登录时，不需要添加 Authorization
    if (!config.url.includes('login')) {
      // 这里设置的 token 每次都是不一样的
      config.headers.Authorization = window.localStorage.getItem('token') // 这句代码应该在请求路由不是 Login 时才执行
    }
    // 如果要后续执行，必须 return config
    return config
  })
  // 添加实例方法
  Vue.prototype.$http = axios
}
// 暴露
export default myaxios
