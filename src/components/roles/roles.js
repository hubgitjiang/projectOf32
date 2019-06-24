// 引入面包屑导航
import mybread from '../layout/mybread.vue'
export default {
    data() {
        return {
            // 数据源
            tableData: [],
            // 面板的开关
            roleDialog: false,
            // 所有的权限数据
            rightsList: [],
            defaultProps: {
                label: 'authName',
                children: 'children'
            },
            // 设置默认选中
            defaultChecked: []
        }
    },
    components: {
        mybread: mybread
    },
    methods: {
        // 获取所角色数据
        getRolesList() {
            this.$http({
                method: 'GET',
                url: 'roles'
            }).then(res => {
                let { data, meta } = res.data
                // 判断
                if (meta.status === 200) {
                    // 赋值
                    this.tableData = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 删除权限
        delRigth(roleId, rightId, scope) {
            this.$http({
                method: 'DELETE',
                url: `roles/${roleId}/rights/${rightId}`
            }).then(res => {
                let { data, meta } = res.data
                if (meta.status === 200) {
                    this.$message({
                        message: meta.msg,
                        type: 'success'
                    })
                    // 已经返回了新的权限 在data中
                    // 根据 roleId 得到当前要修改的数据源
                    for (var i = 0; i < this.tableData.length; i++) {
                        // 找到当前修改权限的角色
                        if (this.tableData[i].id === roleId) {
                            this.tableData[i].son = data
                        }
                    }
                    // scope.row.children = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 打开分配权限面板
        openRole(rightsData) {
            this.defaultChecked = []
            // 获取所有的权限数据
            this.$http({
                method: 'GET',
                url: 'rights/tree'
            }).then(res => {
                let { data, meta } = res.data
                if (meta.status === 200) {
                    // 将权限数据保存起来
                    this.rightsList = data
                    this.roleDialog = true
                    // 将所有三级权限的 id 添加到 defaultChecked 中
                    // 遍历第一级
                    rightsData.forEach(item1 => {
                        // 遍历第二级
                        item1.children.forEach(item2 => {
                            // 遍历第三级
                            item2.children.forEach(item3 => {
                                // 得到 id 添加到 defaultChecked 中
                                this.defaultChecked.push(item3.id)
                            })
                        })
                    })
                } else {
                    this.$message.error(meta.msg)
                }
            })
        }
    },
    mounted() {
        this.getRolesList()
    }
}
