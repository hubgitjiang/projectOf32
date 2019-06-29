<template>
    <!-- el-menu: 菜单栏 -->
    <el-menu :router="true" :unique-opened="true" class="mymenu el-menu-vertical-demo">
        <el-submenu v-for="item in rightsList" :key="item.id" :index="'/' + item.path"> 
            <!-- index="users" -->
            <!-- template：菜单选项的内容 -->
            <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span> {{ item.authName }} </span>
            </template>
            <!-- 菜单选项下的子选项目：二级菜单 -->
            <el-menu-item v-for="son in item.children" :key="son.id" :index="'/' + son.path">
                <i class="el-icon-menu"></i>
                <span> {{ son.authName }} </span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            rightsList: []
        }
    },
    methods: {
        // 动态获取侧边栏数据
        getRightsList() {
            this.$http({
                url: 'menus'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status == 200) {
                    this.rightsList = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        }
    },
    mounted() {
        this.getRightsList()
    }
}
</script>

<style>

</style>
