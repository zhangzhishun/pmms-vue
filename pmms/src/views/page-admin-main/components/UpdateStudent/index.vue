<template>
    <!-- 弹出学生详细信息对话框 -->
    <el-dialog title="学生详细信息" :visible.sync="updateStudentFormVisible">
        <el-form :model="browseDetailData">
        <el-form-item label="照片" :label-width="formLabelWidth">
            <el-col :span="12">
            <div class="demo-basic--circle">
                <div class="block"><el-avatar shape="square" :size="50" :src="browseDetailData.stuPhoto"></el-avatar></div>
            </div>
            </el-col> 
        </el-form-item>
        <el-form-item  label="姓名" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuName" autocomplete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuSex" autocomplete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuOriginPlace" autocomplete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.majorName" autocomplete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuClassName" autocomplete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuContactInformation" autocomplete="off" :readonly="readonly"></el-input>
        </el-form-item>
        <div>
            <span v-for="(value,index) in browseDetailData.levelName" :key="value">
            <el-form-item :label="value+'-确立时间'" :label-width="formLabelWidth">
                <el-date-picker
                v-model="browseDetailData.applyTime[index]"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :readonly="readonly">
                </el-date-picker>
                <div style="float:right">
                <el-button @click="downLoad(browseDetailData.fileName[index])">
                    上传附件
                    <i class="el-icon-upload2 el-icon--right"></i>
                </el-button>
                <el-button @click="downLoad(browseDetailData.fileName[index])">
                    下载附件
                    <i class="el-icon-download el-icon--right"></i></el-button>
                </div>
            </el-form-item>
            </span>
        </div>
        </el-form>
        <!-- 如果是可编辑状态那么显示保存按钮 -->
        <div v-if="readonly==false" style="float:right;margin:5px">
            <el-button type="primary" @click="updateStudent">保 存</el-button>
        </div>
        <!-- 如果管理员有权限删除那么显示删除记录按钮 -->
        <div v-if="couldDel" style="float:right;margin:5px">
            <el-button type="danger" @click="deleteStudent">删 除</el-button>
        </div>
    </el-dialog>
</template>

<script>
    // 引入公共的bug，来做为中间传达的工具
    import Bus from '@/components/Bus/bus.js'
    // 引入qs实现字符串转换为可以提交的类型
    import * as qs from "qs";

    export default {
        data() {
            return {
                // 详细信息展示的数据
                browseDetailData: {
                    // 姓名 性别 籍贯 专业 班级 照片 联系方式 所有身份 成为每一步的时间 所有附件
                    stuId: '',
                    stuName: '',
                    stuSex: '',
                    stuOriginPlace: '',
                    majorName: '',
                    stuClassName: '',
                    stuPhoto: '',
                    stuContactInformation: '',
                    levelId: [],
                    levelName: [],
                    applyTime: [],
                    fileName: [],
                },
                // 是否为只读（不可编辑） 如果管理员等级小于3那么设置为只读（不可编辑）
                readonly: this.$store.state.role<3?true:false,
                // 是否可删除  如果管理员等级大于2那么管理员可以删除学生
                couldDel: this.$store.state.role>2?true:false,
                // 设置弹出信息宽度
                formLabelWidth: '130px',
                // 弹出添加学生记录对话框
                updateStudentFormVisible: false,
            }
        },
        mounted: function () {
            // 用$on事件来接收参数 判断查看/编辑详细信息页面是否显示
            Bus.$on('updateStudentFormVisible', (data) => {
                this.updateStudentFormVisible = data;
            })
            // 用$on事件来接收参数  获取用户点击的stuId
            Bus.$on('stuId', (data) => {
                console.log("弹窗收到");
                console.log(data);
                // 通过then方法获取promise对象
                this.$axios({
                    method: "get",
                    url: "admin/getStudentByStuId/"+data,
                }).then((response) => {
                    if (response.data['data'] != null) {
                        console.log(response.data['data']);
                        // 包含：姓名 性别 籍贯 专业 班级 照片 联系方式 所有身份 成为每一步的时间 所有附件
                        this.browseDetailData.stuId = response.data['data'][0].stuId ;
                        this.browseDetailData.stuName = response.data['data'][0].stuName ;
                        this.browseDetailData.stuSex = response.data['data'][0].stuSex ;
                        this.browseDetailData.stuOriginPlace = response.data['data'][0].stuOriginPlace ;
                        this.browseDetailData.majorName = response.data['data'][0].majorName ;
                        this.browseDetailData.stuClassName = response.data['data'][0].stuClassName ;
                        this.browseDetailData.stuPhoto = response.data['data'][0].stuPhoto ;
                        this.browseDetailData.stuContactInformation = response.data['data'][0].stuContactInformation ;
                        this.browseDetailData.levelId = [];
                        this.browseDetailData.levelName = [];
                        this.browseDetailData.applyTime = [];
                        this.browseDetailData.fileName = [];
                        for(var i=0;i<response.data['data'].length;i++){
                            this.browseDetailData.levelId.push(response.data['data'][i].levelId);
                            this.browseDetailData.levelName.push(response.data['data'][i].levelName);
                            this.browseDetailData.applyTime.push(response.data['data'][i].applyTime);
                            this.browseDetailData.fileName.push(response.data['data'][i].fileName);
                        }
                        console.log(this.browseDetailData);
                    }
                })
            })
        },
        methods: {
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
            // 下载学生附件
            downLoad(){
                console.log("下载文件"+fileName );
            },
            // 删除学生记录
            deleteStudent(){
                // 通过then方法获取promise对象
                this.getRequest("admin/delStudentByStuId/"+this.browseDetailData.stuId).then(res=>{
                    if(res == "1"){
                        alert("删除成功");
                    }else {
                        alert("删除失败");
                    }
                })
            },
            // 更新学生记录
            updateStudent(){
                // POST方式提交表单信息，学生登录成功后跳转到StudentInfo.vue界面
                this.$axios({
                    method: "post",
                    url: "admin/updateStudent",
                    data: qs.stringify({data:JSON.stringify(this.browseDetailData)}),
                }).then((res) => {
                    console.log(res.data);
                    if(res.data.code == "200"){
                        alert("更新成功");
                    }else if(res.data.code == "400"){
                        alert("参数错误");
                    }else if(res.data.code == "500"){
                        alert("网络异常");
                    }
                }).catch(err => {
					 console.log(err.response);
				})
            },
        }
    }
</script>