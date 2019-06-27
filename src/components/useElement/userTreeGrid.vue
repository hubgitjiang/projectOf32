<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <!-- treeKey： 给当前元素设置一个唯一标识 -->
            <!-- parentKey: 给当前子元素设置它的父元素 -->
            <!-- levelKey: 当前元素的层级 -->
            <el-table-tree-column levelKey="level" parentKey="parentId" treeKey="id" file-icon="icon icon-file" folder-icon="icon icon-folder" prop="name" label="名称">
            </el-table-tree-column>
            <el-table-column label="层级" width="180">
                <template slot-scope="scope">
                    {{ scope.row.level === 0 ? '一级': '二级' }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 1,
          parentId: 0,
          level: 0,
          name: '家电',
          children: [
            {
              id: 3,
              parentId: 1,
              level: 1,
              name: '空调',
              children: [
                { id: 5, parentId: 3, level: 2, name: '格力' }
              ]
            },
            { id: 4, parentId: 1, level: 1, name: '洗衣机' }
          ]
        },
        { id: 2, parentId: 0, level: 0, name: '手机' }
      ]
    }
  }
}
</script>

<style>

</style>
