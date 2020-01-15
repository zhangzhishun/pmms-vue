<template>
<el-container>
  <el-container>
    <el-aside width="330px"><AsidePage/></el-aside>
    <el-main><MainPage/></el-main>
  </el-container>
</el-container>


</template>

<script>
    import store from '@/store'
    import AsidePage from '@/views/page-admin-main/components/PartyAdminAsidePage'
    import MainPage from '@/views/page-admin-main/PartyAdmin/MainPage'

    export default {
        name: "PartyAdmin",
        components: {
            //HeaderPage,
            AsidePage,
            MainPage,
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
        create: function(){
          
        },
        methods: {
            handleNodeClick(data) {
                console.log(data.id);
            }
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
    line-height: 20px;
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
