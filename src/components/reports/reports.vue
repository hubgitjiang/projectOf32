<template>
    <div id="mybox" style="width: 80%; height: 500px;">
    </div>
</template>

<script>
// 引入
import Echarts from 'echarts'
export default {
    mounted() {
        // 初始化
        var echarts = Echarts.init(document.getElementById('mybox'))
        // 设置配置项
        // 发送请求到服务器得到配置项
        this.$http({
            url: 'reports/type/1',
            method: 'GET'
        }).then(res => {
            // 给 x 轴的选项设置属性：
            res.data.data.xAxis[0].boundaryGap = false
            res.data.data.grid = {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            }
            var options = res.data.data
            // 添加到视图中
            echarts.setOption(options)
        })
        // var options = {
        //     title: {
        //         text: 'ECharts 入门示例'
        //     },
        //     tooltip: {},
        //     xAxis: {
        //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // }
    }
}
</script>

<style>

</style>
