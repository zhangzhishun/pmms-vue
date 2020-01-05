<template>
<div >
    <h2>党员管理系统</h2>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="StudentInfo">个人信息</el-menu-item>
      <!-- 用户操作下拉菜单 -->
      <div style="float:right"><UserButton/></div>
    </el-menu>
    <keep-alive>
        <prince :is="currentTab" keep-alive></prince>
    </keep-alive>
</div>
</template>

<script>
  // 引入子组件
  import StudentInfo from '@/views/page-student-main/studentInfo';
  import UserButton from '@/components/UserButton'
  import store from '@/store'
  export default {
    name: 'app',
    data () {
      return {
          activeIndex: 'StudentInfo',
          currentTab: 'StudentInfo'  // currentTab 用于标识当前触发的子组件
      };
    },
    components: {  // 声明子组件
      StudentInfo,
      UserButton
    },
    // 创建前状态
      beforeCreate () {
          // 在页面加载前读取sessionStorage
          if (sessionStorage.getItem('token') != '') {
              store.state.token = sessionStorage.getItem('token')
          }
          // 在页面刷新前将store保存到sessionStorage里
          window.addEventListener('beforeunload', () => {
              sessionStorage.token = store.state.token
          })
      },
    methods: {
        handleSelect(key, keyPath) {
          console.log(key);
          this.currentTab = key;
        }
    }
  }
</script>

<style scoped>

</style>