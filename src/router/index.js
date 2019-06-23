import Vue from 'vue'
import Router from 'vue-router'
// 引入路由对应的组件
import Login from '@/components/login/login.vue'
import UseElement from '@/components/useElement/useElement.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/home'
    },
    // 添加路由：使用 element=ui 的路由
    {
      path: '/useElement',
      name: 'useElement',
      component: UseElement
    }, // this.$router.push('/userELement')   this.$router.push({ name: 'userElement' })
    // 添加一个 login 路由
    {
      path: '/login',
      name: 'login', // 别名
      component: Login
    },
    // 添加一个首页路由
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/users', component: Users }
      ]
    }
  ]
})
