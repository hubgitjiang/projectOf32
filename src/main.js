// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 element-ui
import Element from 'Element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 myaxios
import myaxios from '@/assets/js/myaxios.js'

// 引入样式
import '@/assets/css/index.css'

// 使用 elemnt
Vue.use(Element)
// 使用 myaxios 插件
Vue.use(myaxios)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
