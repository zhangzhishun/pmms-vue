<template>
  <div style="line-height:20px">
    <el-table border ref="multipleTable" 
    class="resultTable"
    :data="tableConfig.tableData.slice((tableConfig.currentPage-1)*tableConfig.pageSize,tableConfig.currentPage*tableConfig.pageSize)"
    @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="browseDetails(scope.row.stuId)">
              {{ scope.row.stuName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="stuSex" label="性别"> </el-table-column>
        <el-table-column prop="majorName" label="专业"> </el-table-column>
        <el-table-column prop="stuClassName" label="班级"> </el-table-column>
        <el-table-column prop="levelName" label="级别" show-overflow-tooltip> </el-table-column>
    </el-table>
    
    <div style="margin-top:20px;float:center">
        <el-pagination
        background
        layout="total,prev, pager, next"
        :total= tableConfig.tableData.length
        @current-change="handleCurrentChange"
        :page-size= tableConfig.pageSize >
        </el-pagination>
    </div>

    <div style="margin:20px;float:right">
        <el-button @click="exportExcel">导出为表格</el-button>
    </div>

    <!-- 浏览学生详细信息 -->
    <div>
      <ScanStudent/>
    </div>
  </div>
</template>

<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '@/components/Bus/bus.js'
  // 引入file-saver和xlsx用于导出数据到表格
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  // 导入包含函数的excel模块
  //import Excel from '@/components/excel'
  // 查看学生对话框组件
  import ScanStudent from '@/views/page-admin-main/components/ScanStudent';

  export default {
    components: {
      ScanStudent,
    },
    data() {
      return {
        tableConfig: {
          // 设置每一页显示多少数据
          pageSize: 10,
          // 设置当前页
          currentPage: 1,
          // 区分点击不同支部
          branchNo: 0,
          // 记录标记了哪些数据 用于excel输出
          multipleSelection: [],
          // 存储表格所有数据
          tableData: [],
        },
      }
    },
    mounted: function () {
      // 用$on事件来接收参数
      Bus.$on('val', (data) => {
        this.tableConfig.branchNo = data;
        console.log("branchNoPartyAdmin:::" + data);
        // 通过then方法获取promise对象
        this.getRequest("admin/getAllPartyByPartyBranch/"+data).then(res=>{
          // res为获得到的state里的数据
          this.tableConfig.tableData = [];
          for(var i = 0; i <res.length; i++){
            this.tableConfig.tableData.push(res[i]);
            //console.log(this.tableData);
          }
        })
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.tableConfig.multipleSelection = val;
      },
      // 方法：获取用户点击的页面传给父组件partyAdmin/MainPage.vue
      handleCurrentChange(newPage) {
          this.tableConfig.currentPage = newPage;
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
      },
      // 点击触发ScanStudent控件
      browseDetails(stuId){
        Bus.$emit('stuId', stuId);
        Bus.$emit('scanStudentFormVisible', true);
      },
      /** 实现导入指定内容到excel中 */
      // 导出数据到表格中
      exportExcel () {
         //Excel.export2Excel('a');
         console.log("exportExcel()函数");
         this.export2Excel();
      },
      formatJson(filterVal, jsonData) {
      　　return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../../excel/Export2Excel.js');
          const tHeader = ['姓名','性别','专业','班级','级别'];
          const filterVal = ['stuName', 'stuSex', 'majorName', 'stuclassName', 'levelName' ];
          const list = this.goodsItems;
          // this.tableConfig.multipleSelection为目前选择的所有数据 以json形式存储
          const data = this.formatJson(filterVal, this.tableConfig.multipleSelection);
          //console.log(this.tableConfig.multipleSelection);
          export_json_to_excel(tHeader, data, '学生党员列表');
        })
      },
      /** 实现导入指定内容到excel中 */
    }
  }
</script>

<style>

</style>