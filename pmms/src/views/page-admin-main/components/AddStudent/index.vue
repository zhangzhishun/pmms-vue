<template>
    <!-- 弹出添加学生信息对话框 -->
    <el-dialog title="学生详细信息" :visible.sync="addStudentFormVisible">
        <el-form :model="addStudentFormData">
            <div style="text-align:left">
            <el-form-item label="学生照片" :label-width="formLabelWidth" ref="uploadElement" prop="img">
                <el-input v-model="configForm.img" v-if="false"></el-input>
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9000/pmms/admin/uploadHeadFile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="addStudentFormData.imageUrl" :src="addStudentFormData.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item  label="姓名" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuName" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item  label="学号" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuId" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuSex" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="班级" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuClassName" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuContactInformation" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="籍贯" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuOriginPlace" autocomplete="off" ></el-input>
            </el-form-item>            
            <el-form-item label="家庭住址" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuAddress" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="学生身份" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.levelName" :readonly=true></el-input>
            </el-form-item>    
            <el-form-item label="学生登录密码" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuPassword"></el-input>
            </el-form-item>     
            <el-form-item label="附件" :label-width="formLabelWidth">
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
                    :file-list="this.addStudentFormData.fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            </div>
            <el-button type="primary" @click="submit">添 加</el-button>
        </el-form>
        <!-- 弹出添加学生信息对话框 END -->
    </el-dialog>
</template>

<script>
    // 引入公共的bug，来做为中间传达的工具
    import Bus from '@/components/Bus/bus.js'
    // 引入qs实现字符串转换为可以提交的类型
    import * as qs from "qs";

    export default {
        components: {
        },
        mounted: function () {
            // 用$on事件来接收参数 判断查看/编辑详细信息页面是否显示
            Bus.$on('addStudentFormVisible', (data) => {
                this.addStudentFormVisible = data;
            })     
        },
        data() {
            return {
                addStudentFormData: {
                    // 密码 姓名 性别 照片 籍贯 班级名 联系方式 家庭住址 是否交纳党费
                    stuId:'20160001',
                    stuPassword: '123456',
                    stuName: '张三',
                    stuSex: '男',
                    stuPhoto: '',
                    stuOriginPlace: '河北省保定市',
                    stuClassName: '计科1601',
                    stuContactInformation: '12345678900',
                    stuAddress: '河北省承德市',
                    // 身份值
                    levelName: '申请人',
                    // 附件名
                    fileName: [],
                    // vue使用的值 不传递
                    fileList: [],
                    imageUrl: '',
                },
                // 设置弹出信息宽度
                formLabelWidth: '130px',
                // 弹出添加学生记录对话框
                addStudentFormVisible: false,
            }
        },
        methods: {
            // 上传头像成功后执行的函数
            handleAvatarSuccess(res, file) {
                console.log(res.data);
                // 预览图片
                this.addStudentFormData.imageUrl = URL.createObjectURL(file.raw);
                // 后台返回存储图片的名字  保存起来用于POST
                this.addStudentFormData.stuPhoto = res.data;
                console.log(this.addStudentFormData);
            },
            // 上传头像过程
            beforeAvatarUpload(file) {
                const isJPEG = file.type === 'image/jpeg';
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                if((isJPG || isJPEG || isPNG) && isLt2M){
                    this.addStudentFormData.imageUrl = file.url;
                    return true;
                }else{
                    return false;
                }
            },
            // 点击添加(提交)按钮
            submit(){
                console.log("submit");
                // POST方式提交表单信息
                this.$axios({
                    method: "post",
                    url: "admin/addStudent",
                    data: qs.stringify({data:JSON.stringify(this.addStudentFormData)}),
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
            // 上传文件成功后执行的函数
            handleUploadSuccess(response, file, fileList) {
                console.log(response.data);
                // 后台返回存储图片的名字  保存起来用于POST
                this.addStudentFormData.fileName.push(response.data);
                console.log(this.addStudentFormData);
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
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>