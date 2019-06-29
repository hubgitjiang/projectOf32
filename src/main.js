// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 element-ui
import Element from 'Element-ui'
// 引入 element 的插件
import ElTreeGrid from 'element-tree-grid'

import 'element-ui/lib/theme-chalk/index.css'
// 引入 myaxios
import myaxios from '@/assets/js/myaxios.js'

// 引入富文本编辑框
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

// 引入样式
import '@/assets/css/index.css'

// 使用 elemnt
Vue.use(Element)
// 使用 myaxios 插件
Vue.use(myaxios)

// 将插件注册为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
