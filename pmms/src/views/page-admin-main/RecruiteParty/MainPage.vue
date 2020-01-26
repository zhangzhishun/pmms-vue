<template>
  <div style="line-height:20px">
    <el-table border ref="multipleTable" 
    class="resultTable"
    :data="tableConfig.tableData.slice((tableConfig.currentPage-1)*tableConfig.pageSize,tableConfig.currentPage*tableConfig.pageSize)"
    @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="browseDetailsForm(scope.row.stuId)">
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

    <!-- 添加按钮 点击触发事件 -->
    <div style="margin:10px;float:right">
      <el-button type="primary" @click="addStudentForm">添加申请人</el-button>
      <el-button type="primary" @click="addApplyInfoForm">添加积极分子及以上</el-button>
    </div>

    <!-- 更新和添加学生界面显示在界面，通过点击按钮触发是否显示 -->
    <div>
      <UpdateStudent/><AddStudent/><AddApplyInfo/>
    </div>
  </div>
</template>

<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '@/components/Bus/bus.js'
  // 引入qs实现字符串转换为可以提交的类型
  import * as qs from "qs";
  // 用户登录后将数据保存到store中
  import store from '@/store'
  // 添加学生申请者对话框组件
  import AddStudent from '@/views/page-admin-main/components/AddStudent';
  // 添加学生积极分子对话框组件
  import AddApplyInfo from '@/views/page-admin-main/components/AddApplyInfo';
  // 修改/查看学生对话框组件
  import UpdateStudent from '@/views/page-admin-main/components/UpdateStudent';

  export default {
    components: {
      AddStudent,
      UpdateStudent,
      AddApplyInfo,
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
        // pb为支部编号  level为学生等级
        let pb,level;
        // 根据旁边菜单传过来的data数值判断用户点击了哪个支部
        if(data <= 5){
          // 通信自动化支部
          pb = 1; level = data;
        }else if(data <= 10){
          // 计算机软件支部
          pb = 2; level = data-5;
        }else {
          // 电商信管支部
          pb = 3; level = data-10;
        }
        // 根据支部编号和学生等级发起post查询学生信息
        this.$axios({
          method: "post",
          url: "admin/getStudentByPBAndLevel",
          data: qs.stringify({"pb":pb,"level":level}),
        }).then((res) => {
          console.log(res.data);
          if(res.data.code == "200"){
            // 请求成功 将数据写入tableData
            this.tableConfig.tableData = [];
            for(var i = 0; i <res.data.data.length; i++){
              this.tableConfig.tableData.push(res.data.data[i]);
              //console.log(this.tableConfig.tableData);
            }
          }else {
              alert("请求失败");
          }
        })
      })
    },
    methods: {
      // 处理列表选中事件
      handleSelectionChange(val) {
        this.tableConfig.multipleSelection = val;
      },
      // 方法：修改当前页码
      handleCurrentChange(newPage) {
       this.tableConfig.currentPage = newPage;
      },
      // Get方法 返回一个Promise对象
      getRequest : async function(url) {
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
      // 编辑/查看学生详细记录
      browseDetailsForm(stuId){
        console.log("studentId::" + stuId);
        Bus.$emit('stuId', stuId);
        Bus.$emit('updateStudentFormVisible', true);
        
      },
      // 添加申请者学生记录
      addStudentForm(){
        Bus.$emit('addStudentFormVisible', true);
      },
      // 添加积极分子及以上记录
      addApplyInfoForm(){
        Bus.$emit('addApplyInfoFormVisible', true);
      }
    }
  }
</script>

<style>

</style>