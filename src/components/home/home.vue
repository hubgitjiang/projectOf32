<template>
    <!-- 页面容器 -->
    <el-container>
        <!-- 头部 -->
        <el-header>
            <TopHead />
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <SideBar />
            </el-aside>
            <!-- 内容区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入组件
import TopHead from '@/components/layout/topHead'
import SideBar from '@/components/layout/sidebar'

export default {
  // 注册组件
  components: {
    TopHead: TopHead,
    SideBar: SideBar
  },
  // 当 vue 加载完成后执行
  mounted () {
    // 判断是否存在 token
    // 获取 token
    let token = window.localStorage.getItem('token')
    // 判断
    if (!token) {
      // 提示
      this.$message.error('您还没有登录，请先登录')
      // 没有登录，跳转到登录页面
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>
.el-container {
    height: 100%;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-header h1 {
    margin: 0;
    color: #fff;
}

.el-header .mylink {
    text-decoration: none;
    color: green;
    float: right;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
    height: 100%;
}
.mymenu {
    height: 100%;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
}
</style>
