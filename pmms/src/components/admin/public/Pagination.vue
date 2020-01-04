<template>
    <el-pagination
        background
        layout="total,prev, pager, next"
        :total= 'total'
        @current-change="handleCurrentChange"
        :page-size= 'pageSize'>
    </el-pagination>
</template>

<script>
    // 引入公共的bug，来做为中间传达的工具
    import Bus from '@/components/admin/public/bus.js'
    export default {
        date() {
            return {
                total : 1000,
                pageSize : 100
            }
        },
        methods: {
            // 方法：获取用户点击的页面传给父组件partyAdmin/MainPage.vue
            handleCurrentChange(newPage) {
                //console.log(page);
                Bus.$emit('newPage', newPage)
            }
        }
    }
</script>