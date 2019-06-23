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
                    <el-switch @change="selChange(scope.row.id, scope.row.mg_state)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <!-- slot-scope：设置数据源 -->
                <template slot-scope="scope">
                    {{ scope.row.id }}
                    <el-button @click="update(scope.row.id)" type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                    <el-button @click="roles(scope.row.id)" type="success" icon="el-icon-check" plain size="mini"></el-button>
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
        <!-- 修改对话框 -->
        <el-dialog title="修改用户" :visible.sync="upddialog">
            {{ updUser }}
            <el-form :model="updUser">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="updUser.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="updUser.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="updUser.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="upddialog=false">取 消</el-button>
                <el-button typFe="primary" @click="updUsersFn">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分配角色对话框 -->
        <el-dialog title="分配角色" :visible.sync="roledialog">
            {{ setRoleObj }}
            <el-form :model="setRoleObj">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="setRoleObj.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    {{ setRoleObj.rid }}
                    <el-select v-model="setRoleObj.rid" placeholder="请选择">
                        <el-option label="请选择" :value="-1"></el-option>
                        <el-option v-for="item in selDataList" :key="item.id" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roledialog=false">取 消</el-button>
                <el-button typFe="primary" @click="setRuleFn">确 定</el-button>
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
            // 控制修改对话框的显示和隐藏
            upddialog: false,
            // 控制分配角色对话框的显示和隐藏
            roledialog: false,
            // 设置表头的宽度
            formLabelWidth: '80px',
            addUser: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            // 修改的数据
            updUser: {
                id: '',
                username: '',
                email: '',
                mobile: ''
            },
            // 分配角色时的对象
            setRoleObj: {
                username: '',
                id: '',
                rid: '', // 角色 id
            },
            // 下拉框中的数据源
            selDataList: []
        }
    },
    methods: {
        // 获取所有的数据
        getTableData() {
            // 请求的后端的服务器，每个接口都需要在请求头中添加 token
            this.$http({
                method: 'GET',
                url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
            }).then(res => {
                // 解构
                let { meta, data } = res.data
                // 判断
                if (meta.status === 200) {
                    // 判断 data中的 users 的长度是否为 0, 如果为 0，页数减1，并且重新获取数据
                    if (data.users.length === 0 && this.pagenum !== 1) {
                        this.pagenum--
                        this.getTableData()
                        // 结束后续的操作
                        return
                    }
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
                url: 'users',
                data: this.addUser
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
        },
        // 删除方法
        del(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 通过 axios 发送请求
                this.$http({
                    method: 'DELETE',
                    url: `users/${id}`,
                    // 添加 token
                    headers: {
                        Authorization: window.localStorage.getItem('token')
                    }
                }).then(res => {
                    let { meta } = res.data
                    // 判断
                    if (meta.status === 200) {
                        this.$message({
                            message: meta.msg,
                            type: 'success'
                        })
                        // 更新数据
                        this.getTableData()
                    } else {
                        this.$message.error(meta.msg)
                    }
                })
            })
        },
        // 打开修改面板：
        update(id) {
            // 根据 id 得到数据
            this.$http({
                method: 'GET',
                url: `users/${id}`
            }).then(res => {
                // 解构 
                let { data, meta } = res.data
                // 判断
                if (meta.status === 200) {
                    // 将数据保存起来
                    this.updUser.id = data.id
                    this.updUser.username = data.username
                    this.updUser.mobile = data.mobile
                    this.updUser.email = data.email
                    // 显示修改对话框
                    this.upddialog = true
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 提交修改数据
        updUsersFn() {
            this.$http({
                method: 'PUT',
                url: `users/${this.updUser.id}`,
                data: {
                    mobile: this.updUser.mobile,
                    email: this.updUser.email
                }
            }).then(res => {
                // 将 meta 解析出来
                let { meta } = res.data
                // 判断
                if (meta.status === 200) {
                    this.$message({
                        message: meta.msg,
                        type: 'success'
                    })
                    // 更新数据
                    this.getTableData()
                } else {
                    this.$message.error(meta.msg)
                }
                // 关闭修改面板
                this.upddialog = false
            })
        },
        // 打开分配角色面板
        roles(id) {
            this.$http({
                method: 'GET',
                url: `users/${id}`
            }).then(res => {
                // 解构 
                let { data, meta } = res.data
                // 判断
                if (meta.status === 200) {
                    // 将数据保存起来
                    this.setRoleObj.username = data.username
                    this.setRoleObj.id = data.id
                    this.setRoleObj.rid = data.rid

                    // 获取下拉框中的数据
                    this.$http({
                        method: 'GET',
                        url: 'roles',
                        headers: {
                            Authorization: window.localStorage.getItem('token')
                        }
                    }).then(res => {
                        let { data, meta } = res.data
                        // 判断
                        if (meta.status === 200) {
                            // 给下拉框的数据源赋值
                            this.selDataList = data
                        }
                    })


                    this.roledialog = true
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 设置用户角色
        setRuleFn() {
            this.$http({
                method: 'PUT',
                url: `users/${this.setRoleObj.id}/role`,
                data: {
                    rid: this.setRoleObj.rid
                }
            }).then(res => {
                let { meta } = res.data
                if (meta.status === 200) {
                    this.$message({
                        message: meta.msg,
                        type: 'success'
                    })
                } else {
                    this.$message.error(meta.msg)
                }
                // 关闭面板
                this.roledialog = false
            })
        },
        // 开关按钮的 change 事件
        selChange(uid, type) {
            // 发送 axios 请求
            this.$http({
                method: 'PUT',
                url: `users/${uid}/state/${type}`
            }).then(res => {
                let { meta } = res.data
                if (meta.status === 200) {
                    this.$message({
                        message: meta.msg,
                        type: 'success'
                    })
                } else {
                    this.$message.error(meta.msg)
                }
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
