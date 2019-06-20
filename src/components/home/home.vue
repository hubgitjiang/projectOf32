<template>
    <!-- 页面容器 -->
    <el-container>
        <!-- 头部 -->
        <el-header>
            <el-row>
                <el-col :span="4">
                    <img src="../../assets/imgs/logo.png" alt="">
                </el-col>
                <el-col :span="16">
                    <h1>电商后台管理系统</h1>
                </el-col>
                <el-col :span="4">
                    <a class="mylink" href="#">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">Aside</el-aside>
            <!-- 内容区域 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

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
    text-align: center;
    line-height: 200px;
    height: 100%;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 100%;
}
</style>
