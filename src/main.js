// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 element-ui
import Element from 'Element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 axios
import axios from 'axios'

// 引入样式
import '@/assets/css/index.css'

// 使用 elemnt
Vue.use(Element)
// 挂载到 Vue 实例中
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
