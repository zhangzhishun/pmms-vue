<template>
    <!-- 弹出学生详细信息对话框 -->
    <el-form :model="browseDetailData">
    <el-form-item  label="学号" >
        <el-input v-model="browseDetailData.stuId" autocomplete="off" :readonly=true></el-input>
    </el-form-item>
    <el-form-item  label="姓名" >
        <el-input v-model="browseDetailData.stuName" autocomplete="off" :readonly=true></el-input>
    </el-form-item>
        <span v-for="(value,index) in browseDetailData.levelName" :key="value">
        <el-form-item :label="value+'-附件'" >
            <div style="float:right">
                <div style="float:left">
                    <el-button @click="downLoad(browseDetailData.fileName[index])" size="small" type="primary">
                    下载附件
                    <i class="el-icon-download el-icon--right"></i>
                </el-button>
                </div>
            </div>
        </el-form-item>
        </span>
    </el-form>
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
                    stuId: '',
                    stuName: '',
                    levelId: [],
                    levelName: [],
                    applyTime: [],
                    fileName: [],
                    // vue使用的值 不传递
                    fileList: [],
                },
            }
        },
        created() {
            console.log("弹窗收到");
            console.log(this.$store.state.user );
            // 通过then方法获取promise对象
            this.$axios({
                method: "get",
                url: "admin/getStudentByStuId/"+this.$store.state.user ,
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
            // 上传文件成功后执行的函数
            handleUploadSuccess(response, file, fileList) {
                console.log(response.data);
                // 后台返回存储图片的名字  保存起来用于POST
                this.browseDetailData.fileName = [];
                this.browseDetailData.fileName.push(response.data);
                console.log(this.browseDetailData);
            },
            // 删除上传的文件执行的函数
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 预览上传文件
            handlePreview(file) {
                console.log(file);
            },
            // 检查文件个数
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            // 移除文件
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 下载学生附件
            downLoad(fileName){
                console.log("下载文件"+ encodeURIComponent(fileName));
                window.location.href = "http://localhost:9000/pmms/download/"+fileName;
                // POST方式提交表单信息，所有管理员登录成功后跳转到Main.vue界面
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