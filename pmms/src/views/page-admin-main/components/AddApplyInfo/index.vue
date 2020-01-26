<template>
    <!-- 弹出添加积极分子学生信息对话框 -->
    <el-dialog title="添加学生身份信息" :visible.sync="addApplyInfoFormVisible">
        <el-form :model="addStudentFormData">
            <div style="text-align:left">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuName" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="学号" :label-width="formLabelWidth">
                <el-input v-model="addStudentFormData.stuId" autocomplete="off" ></el-input>
            </el-form-item>  
            <el-form-item label="学生身份" :label-width="formLabelWidth">
                <el-select v-model="addStudentFormData.levelId" placeholder="请选择学生要添加的身份" >
                    <el-option
                    v-for="item in addStudentFormData.options"
                    :key="item.levelId"
                    :label="item.label"
                    :value="item.levelId">
                    </el-option>
                </el-select>
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
            Bus.$on('addApplyInfoFormVisible', (data) => {
                this.addApplyInfoFormVisible = data;
            })     
        },
        data() {
            return {
                addStudentFormData: {
                    // 密码 姓名 性别 照片 籍贯 班级名 联系方式 家庭住址 是否交纳党费
                    stuName: '',
                    stuId: '',
                    // 身份选项
                    options: [{levelId: '1',label: '积极分子'}, {levelId: '2',label: '发展对象'
                    }, {levelId: '3',label: '预备党员'}, {levelId: '4',label: '正式党员'}],
                    // 身份选项值
                    levelId: '',
                    // 附件名
                    fileName: [],
                    // vue使用的值 不传递
                    fileList: [],
                    imageUrl: '',
                },
                // 设置弹出信息宽度
                formLabelWidth: '130px',
                // 弹出添加学生记录对话框
                addApplyInfoFormVisible: false,
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
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                if((isJPG || isBMP || isGIF || isPNG) && isJPG && isLt2M){
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
                    if(res.data.code == "200"){
                        alert("添加成功");
                    }else {
                        alert("添加失败");
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