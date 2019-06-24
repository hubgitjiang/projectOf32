import Vue from 'vue'
import Router from 'vue-router'
// 引入路由对应的组件
import Login from '@/components/login/login.vue'
import UseElement from '@/components/useElement/useElement.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/roles/roles.vue'

Vue.use(Router)

let router = new Router({
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
        { path: '/users', component: Users }, // 用户列表路由
        { path: '/rights', component: Rights }, // 权限列表
        { path: '/roles', component: Roles } // 角色列表
      ]
    }
  ]
})

// 添加一个全局前置守卫
router.beforeEach(function (to, from, next) {
  // express 中间件 如果要执行后续代码必须执行 next
  // to: 要去的路由对应的对象
  // from：离开的路由对应的对象
  // next： 后续代码
  // 登录验证： 判断 localStorage 中是否存在 token
  // 判断请求的是否是 login
  if (to.name !== 'login') {
    // 获取 token
    let token = window.localStorage.getItem('token')
    // 判断: 是否存在  token （有一种情况是不需要判断 token  ，当请求 Login 时）
    if (!token) {
      // 跳转到 Login 路由
      // this.$router.push('/login') // 这种写法是在 vue 组件中写的 this 指的是 vue 的实例
      router.push('/login')
    } else {
      // 存在，继续向后执行
      next()
    }
  } else {
    // 继续执行
    next()
  }
})

export default router
