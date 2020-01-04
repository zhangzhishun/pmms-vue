
<template>
<div>
  <h1>个人信息</h1>
  <MainPage/>
</div>
</template>

<script>
    import store from '@/store'
    import MainPage from '@/components/admin/personalInfo/MainPage'
    export default {
        name: "PersonalInfo",
        components: {
          MainPage
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
            
        },
        data() {
            return {
            };
        }
    };
</script>


<style>
  .el-header, .el-footer {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
