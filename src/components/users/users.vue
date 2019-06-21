<template>
    <!-- 卡片 -->
    <el-card>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <el-row class="myrow">
            <el-col :span="6">
                <el-input v-model="query" placeholder="请输入内容" class="input-with-select">
                    <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="success" @click.prevent="openAddDialog" plain>添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column label="用户状态">
                <!-- slot-scope: 当前行的数据源 -->
                <template slot-scope="scope">
                    {{ scope.row }}
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                    <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <!-- current-page: 当前页 page-sizes: 设置页容量的选项 page-size：当前页 layout:控制组件的显示内容 -->
        <el-pagination @size-change="sizeChange" @current-change="currChange" :current-page="pagenum" :page-sizes="pagesizes" :page-size="pagesize" :total="total" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 新增对话框 -->
        <el-dialog title="添加用户" :visible.sync="adddialog">
            {{ addUser }}
            <el-form :model="addUser">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="addUser.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="addUser.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="addUser.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCancle">取 消</el-button>
                <el-button typFe="primary" @click="addUserFn">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            // 查询的关键字
            query: '',
            // 当前页
            pagenum: 1,
            // 页容量
            pagesize: 5,
            // 容量选项
            pagesizes: [5, 10, 15],
            // 总条数
            total: 0,
            // 控制新增对话框的显示和隐藏
            adddialog: false,
            // 设置表头的宽度
            formLabelWidth: '80px',
            addUser: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            }
        }
    },
    methods: {
        // 获取所有的数据
        getTableData() {
            // 请求的后端的服务器，每个接口都需要在请求头中添加 token
            this.$http({
                method: 'GET',
                url: `http://localhost:8888/api/private/v1/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            }).then(res => {
                // 解构
                let { meta, data } = res.data
                // 判断
                if (meta.status == 200) {
                    // 得到数据源
                    this.tableData = data.users
                    // 得到总条数
                    this.total = data.total
                }
            })
        },
        // 当当前页改变时触发
        currChange(currentPage) {
            // 当当前页改变时，改变 pagenum
            this.pagenum = currentPage
            // 重新获取数据
            this.getTableData()
        },
        // 页容量改变时执行
        sizeChange(pagesize) {
            // 重新给 pagesize 赋值
            this.pagesize = pagesize
            // 重新获取数据
            this.getTableData()
        },
        // 当点击搜索框时执行
        search() {
            // 调用 getTabelData 方法就可以了
            this.getTableData()
        },
        // 打开新增面板
        openAddDialog() {
            this.adddialog = true
        },
        // 新增中的取消
        addCancle() {
            this.adddialog = false
        },
        // 将数据提交到服务器
        addUserFn() {
            // 将参数提交到服务器
            this.$http({
                method: 'POST',
                url: 'http://localhost:8888/api/private/v1/users',
                data: this.addUser,
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            }).then(res => {
                // 判断
                if (res.data.meta.status === 201) {
                    this.$message({
                        message: res.data.meta.msg,
                        type: 'success'
                    })
                    // 更新数据
                    this.getTableData()
                } else {
                    this.$message.error(res.data.meta.msg)
                }
                // 清空新增面板
                this.addUser.username = ''
                this.addUser.password = ''
                this.addUser.email = ''
                this.addUser.mobile = ''
                // 关闭面板
                this.adddialog = false
            })
        }
    },
    mounted() {
        this.getTableData()
    }
}
</script>

<style>
.myrow {
    margin-top: 20px;
}
</style>
