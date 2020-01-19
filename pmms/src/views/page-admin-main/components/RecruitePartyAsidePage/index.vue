<template>
  <el-row class="tac">
    <el-col>
      <h5>中共中央天津商业大学信息工程学院</h5>
      <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>通信自动化支部</span>
          </template>
          <el-menu-item-group>
            <!-- 若后台返回1-5为自动化支部对应的各种级别学生 -->
            <el-menu-item @click="handleSelect(1)" index="1">申请人</el-menu-item>
            <el-menu-item @click="handleSelect(2)" index="2">积极分子</el-menu-item>
            <el-menu-item @click="handleSelect(3)" index="3">发展对象</el-menu-item>
            <el-menu-item @click="handleSelect(4)" index="4">预备党员</el-menu-item>
            <el-menu-item @click="handleSelect(5)" index="5">正式党员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>计算机软件支部</span>
          </template>
          <el-menu-item-group>
            <!-- 若后台返回6-10为计算机软件支部对应的各种级别学生 -->
            <el-menu-item @click="handleSelect(6)" index="6">申请人</el-menu-item>
            <el-menu-item @click="handleSelect(7)" index="7">积极分子</el-menu-item>
            <el-menu-item @click="handleSelect(8)" index="8">发展对象</el-menu-item>
            <el-menu-item @click="handleSelect(9)" index="9">预备党员</el-menu-item>
            <el-menu-item @click="handleSelect(10)" index="10">正式党员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>电商信管支部</span>
          </template>
          <el-menu-item-group>
            <!-- 若后台返回11-15为电商信管支部对应的各种级别学生 -->
            <el-menu-item @click="handleSelect(11)" index="11">申请人</el-menu-item>
            <el-menu-item @click="handleSelect(12)" index="12">积极分子</el-menu-item>
            <el-menu-item @click="handleSelect(13)" index="13">发展对象</el-menu-item>
            <el-menu-item @click="handleSelect(14)" index="14">预备党员</el-menu-item>
            <el-menu-item @click="handleSelect(15)" index="15">正式党员</el-menu-item>
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
      handleSelect : function (key) {
        //console.log("aside:" + key);
        Bus.$emit('val', key)
      }
    }
  }
</script>