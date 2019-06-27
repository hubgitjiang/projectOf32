<template>
    <el-card>
        <!-- 面包屑 -->
        <mybread one="商品管理" two="商品分类" />
        <!-- 按钮 -->
        <el-button class="mybtn" type="success" @click="openAdd" plain>添加分类</el-button>
        <!-- 表格 -->
        <el-table v-loading="loading" :data="pageList" style="width: 100%">
            <el-table-tree-column file-icon="icon icon-file" folder-icon="icon icon-folder" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" prop="cat_name" label="分类名称" width="180">
            </el-table-tree-column>
            <el-table-column label="级别" width="180">
                <template slot-scope="scope">
                    {{ scope.row.cat_level === 0 ? '一级' : scope.row.cat_level === 1 ? '二级': '三级' }}
                </template>
            </el-table-column>
            <el-table-column label="是否有效">
                <template slot-scope="scope">
                    {{ scope.row.cat_deleted ? '有效': '无效' }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination @size-change="sizeChange" @current-change="curChange" :current-page="pagenum" :page-size="pagesize" :page-sizes="pagesizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 新增面板 -->
        <el-dialog title="新增分类" :visible.sync="addDialog">
            <el-form label-position="right">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="cateName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <!-- 级联框 -->
                    {{ selValue }}
                    <el-cascader clearable v-model="selValue" :options="selList" :props="propsObj">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCateFn">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import mybread from '../layout/mybread.vue'

export default {
  data () {
    return {
      loading: true,
      // 表格的数据源
      categoriesList: [],
      pagesize: 5,
      pagenum: 1,
      // 分页的数据源
      pageList: [],
      // 数据总条数
      total: 0,
      // 页容量集合
      pagesizes: [5, 10, 15],
      // 对话框的控制属性
      addDialog: false,
      // 标题宽度
      formLabelWidth: '80px',
      // 级联框绑定的数据
      selValue: [],
      // 级联框的数据源
      selList: [],
      // 级联框的配置项
      propsObj: {
        checkStrictly: true, // 是否可以选择一项
        expandTrigger: 'hover', // 触发的方式
        label: 'cat_name', // 选中的文本
        value: 'cat_id' // 对应的值
      },
      // 分类数据
      cateName: ''
    }
  },
  components: {
    mybread: mybread
  },
  methods: {
    // 得到所有的分类数据
    getCategoriesList () {
      this.$http({
        method: 'GET',
        url: 'categories'
      }).then(res => {
        let { meta, data } = res.data
        if (meta.status === 200) {
          // 将数据进行保存
          this.categoriesList = data
          // 设置数据总长度
          this.total = this.categoriesList.length
          // 给分页数据赋值
          this.getPageList()
          // 关闭 loading
          setTimeout(() => {
            this.loading = false
          }, 1000)
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 根据数据源得到分页的数据
    getPageList () {
      // this.pageList =
      // 得到开始的下标
      let begin = this.pagesize * (this.pagenum - 1)
      // 结束的下标
      let end = this.pagesize * this.pagenum
      // 根据下标去数组中取得数据
      this.pageList = this.categoriesList.slice(begin, end)
    },
    // 当前页发生了改变
    //  currentPage：当前页
    curChange (currentPage) {
      this.pagenum = currentPage
      // 重新获取数据
      this.getPageList()
    },
    // 当页容量改变时
    sizeChange (pagesize) {
      // 赋值
      this.pagesize = pagesize
      // 重新获取数据
      this.getPageList()
    },
    // 打开新增面板，动态加载级联数据
    openAdd () {
      this.addDialog = true
    },
    // 得眰二级分类数据
    getTwoData () {
      this.$http({
        method: 'GET',
        url: `categories?type=2`
      }).then(res => {
        let { meta, data } = res.data
        if (meta.status === 200) {
          // 将数据保存起来
          this.selList = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 新增分类
    addCateFn () {
      // 得到当前分类的父 id
      let pid = this.selValue.length === 0 ? 0 : this.selValue[this.selValue.length - 1]
      // 得到当前 层级
      let level = this.selValue.length
      this.$http({
        method: 'POST',
        url: 'categories',
        data: {
          cat_pid: pid, // 父元素的 id
          cat_name: this.cateName,
          cat_level: level
        }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 201) {
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
  mounted () {
    // 获取所有分类
    this.getCategoriesList()
    // 获取二级分类
    this.getTwoData()
  }
}
</script>

<style scoped>
/* scoped：让样式只在当前组件中起作用 */

.mybtn {
    margin-top: 20px;
}
</style>
