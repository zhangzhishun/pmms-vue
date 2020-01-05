<template>
  <el-row class="tac">
    <el-col>
      <el-menu default-active="0"  @open="handleOpen" @close="handleClose">
        <el-submenu index="0">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>基本信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="handleSelect('ViewBasicInfo')" index="1">查看基本信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="handleSelect('ChangePsw')" index="2">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-zoom-in"></i>
            <span>党费信息查询</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="handleSelect('CheckPayFee')" index="3">查看是否缴纳党费</el-menu-item>
            <el-menu-item @click="handleSelect('StatementFee')" index="4">党费费用说明</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>个人资料</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="handleSelect('ViewUpload')" index="5">查看上传的资料</el-menu-item>
            <el-menu-item @click="handleSelect('UploadInfo')" index="6">上传资料</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '@/components/Bus/bus.js'
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key) {
        //console.log("aside:" + key);
        Bus.$emit('select', key)
      }
    }
  }
</script>

<style scoped>

</style>