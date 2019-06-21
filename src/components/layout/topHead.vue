<template>
    <el-row>
        <el-col :span="4">
            <img src="../../assets/imgs/logo.png" alt="">
        </el-col>
        <el-col :span="16">
            <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="4">
            <a class="mylink" href="#" @click.prevent="logout">退出</a>
        </el-col>
    </el-row>
</template>

<script>
export default {
    methods: {
        logout() {
            // 提示框
            this.$confirm('是否退出系统?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 跳转到登录页面
                // 以 path 为跳转路径
                // this.$router.push('/login')
                // 以 name 为跳转路径
                this.$router.push({ name: 'login' })
                // 清除登录时保存到的 token
                window.localStorage.removeItem('token')
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
            })

        }
    }
}
</script>

<style>

</style>
