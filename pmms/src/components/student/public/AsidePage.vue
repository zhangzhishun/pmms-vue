<template>
  <el-row class="tac">
    <el-col>
      <h5>选择支部</h5>
      <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="0">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>中共中央天津商业大学信息工程学院</span>
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">所有支部</template> -->
            <el-menu-item @click="handleSelect(1)" index="1">通信自动化支部</el-menu-item>
            <el-menu-item @click="handleSelect(2)" index="2">计算机软件支部</el-menu-item>
            <el-menu-item @click="handleSelect(3)" index="3">电商信管支部</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '@/components/student/public/bus.js'
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect : function (key) {
        //console.log("aside:" + key);
        Bus.$emit('val', key)
      }
    }
  }
</script>