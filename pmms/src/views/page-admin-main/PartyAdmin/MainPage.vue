<template>
  <div style="line-height:20px">
    <el-table border ref="multipleTable" 
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.stuName }}</template>
        </el-table-column>
        <el-table-column prop="stuName" label="姓名"> </el-table-column>
        <el-table-column prop="stuSex" label="地址" show-overflow-tooltip> </el-table-column>
    </el-table>
    
    <div style="margin-top:20px;float:center">
        <el-pagination
        background
        layout="total,prev, pager, next"
        :total= tableData.length
        @current-change="handleCurrentChange"
        :page-size= 'pageSize'>
        </el-pagination>
    </div>

    <div style="margin:20px;float:right">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '@/components/Bus/bus.js'

  export default {
    components: {
    },
    data() {
      return {
        // 设置每一页显示多少数据
        pageSize: 3,
        // 设置当前页
        currentPage: 1,
        // 区分点击不同支部
        branchNo: 0,
        // 记录标记了哪些数据 用于excel输出
        multipleSelection: [],
        // 存储表格所有数据
        tableData: [],
      }
    },

    create: function() {
      
    },
    mounted: function () {
      // 用$on事件来接收参数
      Bus.$on('val', (data) => {
        this.branchNo = data;
        console.log("branchNoPartyAdmin:::" + data);
        // 通过then方法获取promise对象
        this.getRequest("admin/getAllParty").then(res=>{
          // res为获得到的state里的数据
          this.tableData = [];
          for(var i = 0; i <res.length; i++){
            this.tableData.push(res[i]);
            //console.log(this.tableData);
          }
        })
      })
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 方法：获取用户点击的页面传给父组件partyAdmin/MainPage.vue
      handleCurrentChange(newPage) {
          this.currentPage = newPage;
      },
      // Get方法 返回一个Promise对象
      getRequest : async function(url) {
        //console.log('calling');
        let getAwait = ()=>{
            return new Promise(resolve => {
              this.$axios({
                method: "get",
                url: url,
              }).then((response) => {
              if (response.data['data'] != null) {
                resolve(response.data['data']);
              }
            })
          });
        }
        let result = await getAwait();
        //console.log(result); 
        return result;
      }

    }
  }
</script>

<style>

</style>