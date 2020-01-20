<template>
    <!-- 弹出添加学生信息对话框 -->
    <el-dialog title="学生详细信息" :visible.sync="addStudentFormVisible">
        <el-form :model="browseDetailData">
        <el-form-item label="照片" :label-width="formLabelWidth">
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-form-item>
        <el-form-item  label="姓名" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuSex" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuOriginPlace" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.majorName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuclassName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="browseDetailData.stuContactInformation" autocomplete="off" ></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">添 加</el-button>
        </div>
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
                formLabelWidth: '130px',
                // 弹出添加学生记录对话框
                addStudentFormVisible: false,
            }
        }
    }
</script>