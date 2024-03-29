import Vue from 'vue'
import Router from 'vue-router'
// 单独引入 message
import { Message } from 'element-ui'

// 引入路由对应的组件
const Login = () => import('@/components/login/login.vue')
const UseElement = () => import('@/components/useElement/useElement.vue')
const userTreeGrid = () => import('@/components/useElement/userTreeGrid.vue')
const usejl = () => import('@/components/useElement/usejl.vue')
const Home = () => import('@/components/home/home.vue')
const Users = () => import('@/components/users/users.vue')
const Rights = () => import('@/components/rights/rights.vue')
const Roles = () => import('@/components/roles/roles.vue')
const Categories = () => import('@/components/categories/categories.vue')
const Goods = () => import('@/components/goods/goods.vue')
const GoodsAdd = () => import('@/components/goodsAdd/goodsAdd.vue')
const orders = () => import('@/components/orders/orders.vue')
const reports = () => import('@/components/reports/reports.vue')

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
    {
      path: '/userTreeGrid',
      component: userTreeGrid
    },
    {
      path: '/usejl',
      component: usejl
    },
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
        { path: '/roles', component: Roles }, // 角色列表
        { path: '/categories', component: Categories }, // 角色列表
        { path: '/goods', component: Goods }, // 商品列表
        { path: '/goodsAdd', component: GoodsAdd }, // 商品添加
        { path: '/orders', component: orders },
        { path: '/reports', component: reports }
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
      // 提示用户没有登录，将要跳转到登录页面
      // this.$message.error('您还没有登录，请先登录')
      Message.error('您还没有登录，请先登录')
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
