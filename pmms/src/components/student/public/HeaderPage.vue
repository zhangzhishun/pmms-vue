<template>
<div>

  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

      <el-menu-item index="1">党员管理</el-menu-item>
      <el-menu-item index="2">发展党员</el-menu-item>
      <el-menu-item index="3">个人信息</el-menu-item>
      <!-- 用户操作下拉菜单 -->
      <div style="float:right"><UserButton/></div>
  </el-menu>
</div>
</template>
<script>
  import UserButton from '@/components/student/public/UserButton'
  export default {
    components: {
      UserButton,
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  }
</script>