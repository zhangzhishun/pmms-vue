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
            <!-- 弹出学生详细信息对话框 -->
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
                  <el-input v-model="browseDetailData.stuName" autocomplete="off" :readonly="tableConfig.readonly"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-input v-model="browseDetailData.stuSex" autocomplete="off" :readonly="tableConfig.readonly"></el-input>
                </el-form-item>
                <el-form-item label="籍贯" :label-width="formLabelWidth">
                  <el-input v-model="browseDetailData.stuOriginPlace" autocomplete="off" :readonly="tableConfig.readonly"></el-input>
                </el-form-item>
                <el-form-item label="专业" :label-width="formLabelWidth">
                  <el-input v-model="browseDetailData.majorName" autocomplete="off" :readonly="tableConfig.readonly"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth">
                  <el-input v-model="browseDetailData.stuclassName" autocomplete="off" :readonly="tableConfig.readonly"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                  <el-input v-model="browseDetailData.stuContactInformation" autocomplete="off" :readonly="tableConfig.readonly"></el-input>
                </el-form-item>
                <div>
                  <span v-for="(value,index) in browseDetailData.levelName" :key="value">
                    <el-form-item :label="value+'-确立时间'" :label-width="formLabelWidth">
                      <el-input v-model="browseDetailData.applyTime[index]" autocomplete="off" :readonly="tableConfig.readonly"></el-input>
                      <div style="margin-top:5px;float:right">
                        <el-button @click="downLoad(browseDetailData.fileName[index])">下载附件</el-button>
                      </div>
                    </el-form-item>
                  </span>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <!-- 如果管理员有权限删除那么显示删除记录按钮 -->
                <div v-if="tableConfig.couldDel" style="float:right;margin-left:20px">
                  <el-button type="danger" @click="deleteStudent(browseDetailData.stuId)">删除记录</el-button>
                </div>
                <!-- 如果是可编辑状态那么显示更新按钮 -->
                <div v-if="tableConfig.readonly==false" style="float:right;margin-left:10px">
                  <el-button type="primary" @click="updateStudent(browseDetailData.stuId)">更 新</el-button>
                </div>
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
              </div>
            </el-dialog>
          <!-- 弹出学生详细信息对话框 END -->
          <el-dialog title="添加学生记录" :visible.sync="addStudentFormVisible">
            <AddStudent/>
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

    <div style="margin:10px;float:right">
      <el-button @click="addStudentFormVisible = true">添加</el-button>
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
  // 添加学生对话框组件
  import AddStudent from '@/views/page-admin-main/components/AddStudent';
  export default {
    components: {
      AddStudent,
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
          // 是否为只读（不可编辑） 如果管理员等级小于3那么设置为只读（不可编辑）
          readonly: this.$store.state.role<3?true:false,
          // 是否可删除  如果管理员等级大于2那么管理员可以删除学生
          couldDel: this.$store.state.role>2?true:false
        },
        // 弹出学生详细信息对话框
        dialogFormVisible: false,
        // 弹出添加学生记录对话框
        addStudentFormVisible: false,
        // 详细信息展示的数据
        browseDetailData: {
          // 姓名 性别 籍贯 专业 班级 照片 联系方式 所有身份 成为每一步的时间 所有附件
          stuId: '',
          stuName: '',
          stuSex: '',
          stuOriginPlace: '',
          majorName: '',
          stuclassName: '',
          stuPhoto: '',
          stuContactInformation: '',
          levelName: [],
          applyTime: [],
          fileName: [],
        },
        // 设置弹出信息宽度
        formLabelWidth: '130px'
      }
    },
    create: function() {
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
          pb = 1; level = data-5;
        }else {
          // 电商信管支部
          pb = 1; level = data-10;
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
        console.log(stuId);
        // 通过then方法获取promise对象
        this.getRequest("admin/getStudentByStuId/"+stuId).then(res=>{
          console.log(res);
          // res为获得到的state里的数据
          // 包含：姓名 性别 籍贯 专业 班级 照片 联系方式 所有身份 成为每一步的时间 所有附件
          this.browseDetailData.stuId = res[0].stuId ;
          this.browseDetailData.stuName = res[0].stuName ;
          this.browseDetailData.stuSex = res[0].stuSex ;
          this.browseDetailData.stuOriginPlace = res[0].stuOriginPlace ;
          this.browseDetailData.majorName = res[0].majorName ;
          this.browseDetailData.stuclassName = res[0].stuclassName ;
          this.browseDetailData.stuPhoto = res[0].stuPhoto ;
          this.browseDetailData.stuContactInformation = res[0].stuContactInformation ;
          this.browseDetailData.levelName = [];
          this.browseDetailData.applyTime = [];
          this.browseDetailData.fileName = [];
          for(var i=0;i<res.length;i++){
            this.browseDetailData.levelName.push(res[i].levelName);
            this.browseDetailData.applyTime.push(res[i].applyTime);
            this.browseDetailData.fileName.push(res[i].fileName);
          }
          console.log(this.browseDetailData.applyTime);
        })
      },
      // 下载学生附件
      downLoad(fileName){
        console.log("下载文件"+fileName+" "+this.$store.state.role);
      },
      // 删除学生记录
      deleteStudent(stuId){
        console.log("删除记录：" + stuId);
      },
      // 更新学生记录
      updateStudent(stuId){
        console.log("更新记录：" + stuId);
      },
    }
  }
</script>

<style>

</style>