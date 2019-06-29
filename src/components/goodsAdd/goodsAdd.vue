<template>
    <el-card>
        <!-- 面包屑 -->
        <mybread one="商品管理" two="商品列表" />
        <!-- 提示框 -->
        <el-alert class="myalert" title="添加商品信息" type="info" center show-icon>
        </el-alert>
        <!-- 步骤条 -->
        <!-- active: 激活的步骤 -->
        <!-- finish-status: 完成步骤的样式 -->
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- tab 标签页 -->
        <!-- tabPosition： 设置 tab 的位置 -->
        <!-- tab-click: 点击下面的 el-tab-pane 会被触发  -->
        <!-- v-model： 双向绑定的数据源，用来决定当前显示的 tab 栏 -->
        <!-- v-model 一般配合 el-tab-pane 中的 name 属性来使用 -->
        <el-tabs tabPosition="left" v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="基本信息" name="first">
                <el-form label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="addObj.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="name">
                        <el-input v-model="addObj.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="name">
                        <el-input v-model="addObj.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="name">
                        <el-input v-model="addObj.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="name">
                        {{ cateVal }}
                        <el-cascader v-model="cateVal" :options="cateList" :props="propsObj">
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="second">
                <div v-for="(item, index) in goodsMany" :key="index">
                    <div class="mybox">{{ item.attr_name }}</div>
                    <div>
                        <el-checkbox v-for="(val, index) in item.attr_vals.split(',')" :key="index" v-model="checked" border>
                            {{ val }}
                        </el-checkbox>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="third">
                <el-form label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item v-for="(item, index) in goodsOnly" :key="index" :label="item.attr_name">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="fourth">
                <!-- action：图片上传的地址 -->
                <!-- 由于后台服务器需要添加 token 才能接收信息，所以需要在上传的图片请求中也添加 token(添加到请求头中) -->
                <!-- on-preview：钩子函数，可以添加一段逻辑代码：当上传的图片被点击时执行 -->
                <!-- on-success：文件成功时执行的函数 -->
                <!-- on-remove：文件移除时执行的函数 -->
                <!-- on-preview： 点击文件列表中已经上传过的图片时触发 -->
                <!-- list-type：上传元素显示的方式： 以图片方式显示 -->
                <el-upload :on-preview="mypreview" :on-remove="remove" :on-success="uploadSuccess" class="upload-demo" :headers="uploadheader" action="http://localhost:8888/api/private/v1/upload" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                {{ fileList }}
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="fifth">
                <el-button type="primary" @click="addGoods">添加商品</el-button>
                <!-- 富文本编辑框 -->
                <quill-editor v-model="content" ref="myQuillEditor">
                </quill-editor>
            </el-tab-pane>
        </el-tabs>
        <!-- 预览图片的对话框 -->
        <el-dialog title="预览图片" :visible.sync="imgDialog">
            <!-- 预览的图片 -->
            <img ref="myimg" src="" alt="">
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="imgDialog = false">确 定</el-button>
            </div>
        </el-dialog>

    </el-card>
</template>
<script>
import mybread from '../layout/mybread.vue'

export default {
    data() {
        return {
            // 步骤条的激活下标
            active: 0,
            // tab 选项的默认选中项
            activeName: 'first',
            // 分类级联中的数据源
            cateList: [],
            // 级联框中的配置项
            propsObj: {
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id'
            },
            // 级联框中的数据
            cateVal: [],
            // 商品参数
            goodsMany: [],
            // 商品属性
            goodsOnly: [],
            // 默认选中
            checked: true,
            // 上传图片时设置的请求头
            uploadheader: {
                Authorization: window.localStorage.getItem('token')
            },
            // 上传的图片集合
            fileList: [],
            // 预览图片框
            imgDialog: false,
            content: "我是富文本编辑框中的默认值",
            // 新增对象
            addObj: {
                goods_name: '',
                goods_cat: '',
                goods_price: '',
                goods_number: '',
                goods_weight: ''
            }
        }
    },
    components: {
        mybread: mybread
    },
    methods: {
        // tab 选项中的 tab 被点击时触发
        tabClick(tag) {
            // 让步骤条与 tab 同步
            this.active = +tag.index
            // 商品参数
            if (tag.index === '1') {
                this.getParams('many')
            }
            if (tag.index === '2') {
                this.getParams('only')
            }
        },
        // 得到商品参数&商品属性
        // sel: 判断是 many 还是 only
        getParams(sel) {
            // 判断级联框是否选中
            if (this.cateVal.length !== 0) {
                // 如果选中根据分类去查询参数
                this.$http({
                    url: `categories/${this.cateVal[this.cateVal.length - 1]}/attributes?sel=${sel}`
                }).then(res => {
                    let { meta, data } = res.data
                    if (meta.status === 200) {
                        // 判断参数是否是 only 如果是，给商品属性赋值，否则给商品参数赋值
                        if (sel === 'only') {
                            this.goodsOnly = data
                        } else {
                            this.goodsMany = data
                        }
                    } else {
                        this.$message.error(meta.msg)
                    }
                })
            } else {
                this.$message.error('请选择商品分类')
            }
        },
        // 得到级联框中的数据
        getCateList() {
            this.$http({
                url: 'categories'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    this.cateList = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 上传图片成功时执行的函数
        uploadSuccess(response, file, fileList) {
            // reponse: 上传成功后响应的内容
            // file: 上传成功的文件信息
            // fileList: 上传成功的文件集合
            this.fileList.push(response.data.tmp_path)
        },
        remove(file, fileList) {
            let img = file.response.data.tmp_path
            // 将删除的图片从数组中删除
            this.fileList.forEach((item, index) => {
                if (item === img) {
                    this.fileList.splice(index, 1)
                }
            })
        },
        // 预览图片
        mypreview(file) {
            // 得到图片的在线地址
            var img = file.response.data.url
            // 渲染到一个对话框中
            // 打开对话框
            this.imgDialog = true
            // 当页面渲染完成后，会马上执行（将回调延迟到下次 DOM 更新循环之后执行）
            this.$nextTick(() => {
                this.$refs.myimg.src = img
            })

            // setTimeout(() => {
            //     // 将图片进行显示
            //     this.$refs.myimg.src = img
            //     console.log(this.$refs)
            // }, 1000)
        },
        // 添加商品
        addGoods() {
            // 得到数据： addObj
            this.addObj.goods_cat = this.cateVal.join(',') // 将分类转换为字符串
            // 请求接收
            this.$http({
                url: 'goods',
                method: 'post',
                data: {
                    ...this.addObj, // 将新增对象中的属性展开
                    goods_introduce: this.content
                }
            }).then(res => {
                let { meta } = res.data
                if (meta.status === 201) {
                    // 提示新增成功
                    this.$message.success(meta.msg)
                    // 跳转到 goods 组件
                    this.$router.push('/goods')
                } else {
                    this.$message.error(meta.msg)
                }
            })
        }
    },
    mounted() {
        this.getCateList()
    }
}
</script>

<style>
/* 只要当前组件中起使用 */

.myalert {
    margin-top: 20px;
    margin-bottom: 20px;
}

.el-step__title {
    font-size: 12px;
}

.mybox {
    margin: 20px 0px;
}

label.el-checkbox.is-bordered.is-checked {
    margin-right: 0px;
}

.ql-editor {
    height: 400px;
}
</style>
