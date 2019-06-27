<template>
    <!-- 级联框 -->
    <!-- v-model：双向绑定的 value 值 -->
    <!-- options：绑定的数据源 -->
    <!-- props：级联框的配置项 -->
    <div>
        {{ casval }}
        <el-cascader v-model="casval" :options="options" :props="obj">
        </el-cascader>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                {
                    name: '零食', id: '1', children: [
                        {
                            name: '巧克力', id: '2', children: [
                                { name: '德芙', id: '3' }
                            ]
                        }
                    ],
                },
                {
                    name: '家电', id: '4', children: [
                        {
                            name: '冰箱', id: '5', children: [
                                { name: '海尔', id: '6' }
                            ]
                        }
                    ]
                }
            ],
            obj: {
                expandTrigger: 'hover', // 设置触发子分类的方式
                label: 'name',
                value: 'id'
            },
            // 级联框双向绑定的数据，必须要是一个数组
            casval: ["4", "5", "6"]
        }
    }
}
</script>

<style scoped>

</style>
