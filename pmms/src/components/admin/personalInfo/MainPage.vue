<template>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">修改密码</el-button>
        <el-button @click="toggleSelection()">修改信息</el-button>
    </div>
</template>

<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '@/components/admin/public/bus.js'

  export default {
    data() {
      return {
      }
    },

    mounted: function () {
      
    },
    methods: {
    }
  }
</script>