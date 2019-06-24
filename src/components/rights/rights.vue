<template>
    <el-card>
        <!-- 面包屑导航：使用自己封装的组件 -->
        <mybread one="权限管理" two="权限列表" />
        <!-- 表格 -->
        <el-table class="mytable" :data="tableData" style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="180">
            </el-table-column>
            <el-table-column prop="path" label="路径" width="180">
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scope">
                    <!-- {{ scope.row.level === "0" ? '一级' : scope.row.level === "1" ? '二级' : '三级' }} -->
                    <span v-if="scope.row.level === '0'">一级</span>
                    <span v-if="scope.row.level === '1'">二级</span>
                    <span v-if="scope.row.level === '2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
// 导入
import mybread from '../layout/mybread.vue'

export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {
    mybread: mybread
  },
  methods: {
    getRightList () {
      this.$http({
        method: 'GET',
        url: 'rights/list'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getRightList()
  }
}
</script>

<style>
.mytable {
    margin-top: 20px;
}
</style>
