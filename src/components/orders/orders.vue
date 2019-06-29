<template>
    <div id="mapBox" style="width:100%;height:500px">
    </div>
</template>

<script>
// 引入 
import BMap from 'BMap'

export default {
    // 初始化时执行
    mounted() {
        // 创建地图实例
        var map = new BMap.Map('mapBox')
        // 设置中心点
        var point = new BMap.Point(116.404, 39.915)
        // 添加控制件：
        // 平移缩放控件
        map.addControl(new BMap.NavigationControl())
        // 比例尺
        map.addControl(new BMap.ScaleControl())
        // 缩略图
        map.addControl(new BMap.OverviewMapControl())
        // 初始化地图
        map.centerAndZoom(point, 15)
        // 设置 路线
        var driving = new BMap.DrivingRoute(map, {
            renderOptions: {
                map: map,
                autoViewport: true
            }
        })
        // // 起点经纬度
        var start = new BMap.Point(116.310791, 40.003419);
        // // 终点经纬度
        var end = new BMap.Point(116.486419, 39.877282);
        // 开启搜索路线
        driving.search(start, end);
    }
}
</script>

<style>

</style>
