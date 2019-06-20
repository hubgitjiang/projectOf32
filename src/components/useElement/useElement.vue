<template>
    <div>
        我是 useElement:
        <h3>按钮的使用</h3>
        <el-button type="success">成功按钮</el-button>
        <h3>选择器</h3>
        {{ value }}
        <el-select v-model="value" placeholder="请选择">
            <!-- label 下拉框显示的内容 value：内容对应的值 -->
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <h3>开关</h3>
        {{ value1 }}
        <el-switch v-model="value1" active-color="yellow" inactive-color="black">
        </el-switch>
    </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      value1: ''
    }
  }
}
</script>

<style>

</style>
