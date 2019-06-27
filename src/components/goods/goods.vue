<template>
    <el-card>
        <!-- 面包屑导航 -->
        <!-- 父传 -->
        <mybread one="用户管理" two="用户列表" />
        <!-- 搜索框 -->
        <el-row class="myrow">
            <el-col :span="6">
                <el-input v-model="query" placeholder="请输入内容" class="input-with-select">
                    <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="success" @click.prevent="$router.push('/goodsAdd')" plain>添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table :data="goodsList" style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="400">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量">
            </el-table-column>
            <el-table-column prop="add_time" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="sizeChange" @current-change="curChange" :current-page="pagenum" :page-sizes="pagesizes" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
import mybread from '../layout/mybread.vue'
export default {
    data() {
        return {
            // 数据源
            goodsList: [],
            // 当前页
            pagenum: 1,
            // 页容量
            pagesize: 10,
            // 容量集合
            pagesizes: [10, 20, 30],
            // 总条数
            total: 0,
            // 查询的关键字
            query: ''
        }
    },
    components: {
        mybread: mybread
    },
    methods: {
        // 得到商品数据
        getGoodsList() {
            this.$http({
                url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    // 数据源
                    this.goodsList = data.goods
                    // 总数
                    this.total = data.total
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 当前页改变
        curChange(pagennum) {
            // 赋值
            this.pagenum = pagennum
            // 获取新的数据
            this.getGoodsList()
        },
        // 页容量改变
        sizeChange(pagesize) {
            this.pagesize = pagesize
            this.getGoodsList()
        },
        // 搜索
        search() {
            this.getGoodsList()
        }
    },
    mounted() {
        this.getGoodsList()
    }
}
</script>

<style scoped>
.myrow {
    margin-top: 20px;
}
</style>
