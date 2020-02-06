<template>
<el-container>
  <el-container>
    <el-aside width="200px" ><AsidePage/></el-aside>
    <el-main>
      <keep-alive>
        <prince :is="currentTab" keep-alive></prince>
      </keep-alive>
    </el-main>
  </el-container>

  
</el-container>


</template>

<script>
    // 引入公共的bug，来做为中间传达的工具
    import Bus from '@/components/Bus/bus.js'
    import store from '@/store'
    import AsidePage from '@/views/page-admin-main/components/PersonalInfoAsidePage'
    import ChangePsw from '@/views/page-admin-main/components/ChangePsw'
    import ViewBasicInfo from '@/views/page-admin-main/components/ViewBasicInfo'
    
    export default {
        name: "StudentInfo",
        components: {
            AsidePage,
            ChangePsw,
            ViewBasicInfo,
        },
        mounted: function () {
          // 用$on事件来接收参数
          Bus.$on('select', (data) => {
            //this.branchNo = data;
            console.log("select:::" + data);
            this.currentTab = data;
          })
        },
        // 创建前状态
        created () {
          // 在页面加载时读取sessionStorage
          if (sessionStorage.getItem('store')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
          }
          // 在页面刷新时将store保存到sessionStorage里
          window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state))
          })
        },
        methods: {
          
        },
        data() {
            return {
              activeIndex: 'ViewBasicInfo',
              currentTab: 'ViewBasicInfo'  // currentTab 用于标识当前触发的子组件
            };
        }
    };
</script>


<style scoped>
  .el-header, .el-footer {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: left;
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
