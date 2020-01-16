<template>
  <div style="line-height:20px">
    <el-table border ref="multipleTable" 
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="browseDetails(scope.row.stuId)">
              {{ scope.row.stuName}}
            </el-button>
            <!-- 弹出对话框 -->
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
        :total= tableData.length
        @current-change="handleCurrentChange"
        :page-size= 'pageSize'>
        </el-pagination>
    </div>

    <div style="margin:20px;float:right">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="toggleSelection()">导出到excel</el-button>
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
        pageSize: 10,
        // 设置当前页
        currentPage: 1,
        // 区分点击不同支部
        branchNo: 0,
        // 记录标记了哪些数据 用于excel输出
        multipleSelection: [],
        // 存储表格所有数据
        tableData: [],
        // 弹出对话框
        dialogFormVisible: false,
        form: {
          stuSex: '',
          stuName: '',
          stuOriginPlace: '',
          majorName: '',
          stuclassName: '',
          stuPhoto: '',
          stuContactInformation: '',
          applyTime: [],
        },
        formLabelWidth: '120px'
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
        this.getRequest("admin/getAllPartyByPartyBranch/"+data).then(res=>{
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
      },
      // 点击学生查看详细信息
      browseDetails(stuId){
        this.dialogFormVisible = true;
        // 通过then方法获取promise对象
        this.getRequest("admin/getStudentByStuId/"+stuId).then(res=>{
          // res为获得到的state里的数据 记录所有申请的申请时间
          this.applyTime = [];
          this.stuSex = res[0].stuSex ;
          this.stuName = res[0].stuName ;
          this.stuOriginPlace = res[0].stuOriginPlace ;
          this.majorName = res[0].majorName ;
          this.stuclassName = res[0].stuclassName ;
          this.stuPhoto = res[0].stuPhoto ;
          this.stuContactInformation = res[0].stuContactInformation ;
          for(var i = 0; i <res.length; i++){
            this.applyTime.push(res[i].applyTime);
          }
          console.log(this.applyTime);
        })
      }
    }
  }
</script>

<style>

</style>