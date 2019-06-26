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
            defaultChecked: [],
            // 设置权限的角色 id
            setRoleId: 0
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
                    // for (var i = 0; i < this.tableData.length; i++) {
                    //     // 找到当前修改权限的角色
                    //     if (this.tableData[i].id === roleId) {
                    //         this.tableData[i].son = data
                    //     }
                    // }
                    scope.row.children = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 打开分配权限面板
        openRole(rightsData, id) {
            // 将当前角色的 id 保存起来
            this.setRoleId = id
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
        },
        // 设置权限
        setRightFn() {
            // 获取更新后权限
            // getCheckedKeys: 
            //      特点：只会得到全选的 id，不会得到半选
            // getHalfCheckedKeys
            //      特点：只能得到半选的 id
            let idsAll = this.$refs.mytree.getCheckedKeys()
            let idsHarf = this.$refs.mytree.getHalfCheckedKeys()
            // 将全选与半选组合
            let ids = [...idsAll, ...idsHarf]
            // 将 ids 转为字符串
            ids = ids.join(',')
            // 提交到服务器
            this.$http({
                method: 'POST',
                url: `roles/${this.setRoleId}/rights`,
                data: {
                    rids: ids
                }
            }).then(res => {
                let { meta } = res.data
                if (meta.status === 200) {
                    this.$message({
                        message: meta.msg,
                        type: 'success'
                    })
                    // 重新获取数据
                    this.getRolesList()
                } else {
                    this.$message.error(meta.msg)
                }
            })
            this.roleDialog = false
        }
    },
    mounted() {
        this.getRolesList()
    }
}
