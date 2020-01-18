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
            <!-- 弹出对话框 -->
            <el-dialog title="学生详细信息" :visible.sync="dialogFormVisible">
            <el-form :model="browseDetailData">
              <el-form-item label="照片" :label-width="formLabelWidth">
                <el-col :span="12">
                  <div class="demo-basic--circle">
                    <div class="block"><el-avatar shape="square" :size="50" :src="browseDetailData.stuPhoto"></el-avatar></div>
                  </div>
                </el-col> 
              </el-form-item>
              <el-form-item  label="姓名" :label-width="formLabelWidth">
                <el-input v-model="browseDetailData.stuName" autocomplete="off" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="browseDetailData.stuSex" autocomplete="off" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="籍贯" :label-width="formLabelWidth">
                <el-input v-model="browseDetailData.stuOriginPlace" autocomplete="off" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="browseDetailData.stuContactInformation" autocomplete="off" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="级别" :label-width="formLabelWidth">
                <el-input v-model="browseDetailData.levelName" autocomplete="off" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="家庭住址" :label-width="formLabelWidth">
                <el-input v-model="browseDetailData.stuAddress" autocomplete="off" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="班主任" :label-width="formLabelWidth">
                <el-input v-model="browseDetailData.teaName" autocomplete="off" :readonly="true"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          </template>
        </el-table-column>
        <el-table-column prop="stuSex" label="性别"> </el-table-column>
        <el-table-column prop="majorName" label="专业"> </el-table-column>
        <el-table-column prop="stuclassName" label="班级"> </el-table-column>
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

  export default {
    components: {
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
        // 弹出对话框
        dialogFormVisible: false,

        // 详细信息展示的数据
        browseDetailData: {
          // 照片，姓名，性别，籍贯，联系方式，级别，家庭住址，班主任
          stuPhoto: '',
          stuName: '',
          stuSex: '',
          stuOriginPlace: '',
          stuContactInformation: '',
          levelName: '',
          stuAddress: '',
          teaName: ''
        },
        // 设置弹出信息宽度
        formLabelWidth: '80px'
      }
    },

    create: function() {
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
      // 点击学生查看详细信息
      browseDetails(stuId){
        this.dialogFormVisible = true;
        // 通过then方法获取promise对象
        this.getRequest("admin/getStudentByStuId/"+stuId).then(res=>{
          // res为获得到的state里的数据
          // 包含 照片，姓名，性别，籍贯，联系方式，级别，家庭住址，班主任
          this.browseDetailData.stuPhoto = res[0].stuPhoto ;
          this.browseDetailData.stuName = res[0].stuName ;
          this.browseDetailData.stuSex = res[0].stuSex ;
          this.browseDetailData.stuOriginPlace = res[0].stuOriginPlace ;
          this.browseDetailData.stuContactInformation = res[0].stuContactInformation ;
          this.browseDetailData.levelName = res[0].levelName ;
          this.browseDetailData.stuAddress = res[0].stuAddress ;
          this.browseDetailData.teaName = res[0].teaName ;
        })
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