<template>
    <!-- 弹出学生详细信息对话框 -->
    <el-form :model="browseDetailData">
    <el-form-item  label="学号" >
        <el-input v-model="browseDetailData.stuId" autocomplete="off" :readonly=true></el-input>
    </el-form-item>
    <el-form-item  label="姓名" >
        <el-input v-model="browseDetailData.stuName" autocomplete="off" :readonly=true></el-input>
    </el-form-item>
    <el-form-item label="提交的附件对应的学生身份" >
    <el-select v-model="browseDetailData.levelId" placeholder="请选择学生要添加的身份" >
        <el-option
        v-for="item in browseDetailData.options"
        :key="item.levelId"
        :label="item.label"
        :value="item.levelId">
        </el-option>
    </el-select>
    </el-form-item>    
    <el-form-item label="附件" >
        <el-upload
            class="upload-demo"
            action="http://localhost:9000/pmms/admin/uploadHeadFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleUploadSuccess"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="this.browseDetailData.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

    </el-form-item>
    <el-button type="primary" @click="submit">添 加</el-button>
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
                    // vue使用的值 不传递
                    fileList: [],
                    // 附件名
                    fileName: [],
                    // 身份选项
                    options: [{levelId: '1',label: '申请人'},
                    {levelId: '2',label: '积极分子'}, {levelId: '3',label: '发展对象'
                    }, {levelId: '4',label: '预备党员'}, {levelId: '5',label: '正式党员'}],
                    // 身份选项值
                    levelId:'请选择',

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
            // 点击添加(提交)按钮
            submit(){
                console.log("submit");
                // POST方式提交表单信息
                this.$axios({
                    method: "post",
                    url: "student/updateFile",
                    data: qs.stringify({data:JSON.stringify(this.browseDetailData)}),
                }).then((res) => {
                    console.log(res.data);
                    // 如果返回code为200说明后台处理了请求  否则输出网络错误
                    if(res.data.code == "200"){
                        // 如果返回的success为true代表后台添加成功 否则直接输出返回的msg消息
                        if(res.data.success == true){
                            alert("添加成功");
                        }else {
                            alert(res.data.msg);
                        }
                    }else {
                        alert("网络错误");
                    }
                })
            },
        }
    }
    
</script>