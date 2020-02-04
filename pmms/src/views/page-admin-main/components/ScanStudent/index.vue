<template>
    <!-- 弹出学生详细信息对话框 -->
    <el-dialog title="学生详细信息" :visible.sync="scanStudentFormVisible">
    <el-form :model="browseDetailData">
        <el-form-item label="照片" :label-width="formLabelWidth">
        <el-col :span="12">
            <div class="demo-basic--circle" style="float:left">
            <!-- :src="require('@/assets/upload/' + browseDetailData.stuPhoto)" -->
            <div class="block"><el-avatar shape="square" :size="50" :src="require('@/assets/upload/' + browseDetailData.stuPhoto)"  >
            </el-avatar></div>
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
        <el-button type="primary" @click="scanStudentFormVisible = false">关 闭</el-button>
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
                formLabelWidth: '80px',
                // 弹出添加学生记录对话框
                scanStudentFormVisible: false,
            }
        },
        mounted: function () {
            // 用$on事件来接收参数 判断查看/编辑详细信息页面是否显示
            Bus.$on('scanStudentFormVisible', (data) => {
                this.scanStudentFormVisible = true;
            })
            // 用$on事件来接收参数  获取用户点击的stuId
            Bus.$on('stuId', (data) => {
                // 通过then方法获取promise对象
                this.$axios({
                    method: "get",
                    url: "admin/getStudentByStuId/"+data,
                }).then((response) => {
                    if (response.data['data'] != null) {
                        console.log(response.data['data']);
                        // res为获得到的state里的数据
                        // 包含 照片，姓名，性别，籍贯，联系方式，级别，家庭住址，班主任
                        this.browseDetailData.stuId = data ;
                        this.browseDetailData.stuPhoto = response.data['data'][0].stuPhoto;
                        this.browseDetailData.stuName = response.data['data'][0].stuName ;
                        this.browseDetailData.stuSex = response.data['data'][0].stuSex ;
                        this.browseDetailData.stuOriginPlace = response.data['data'][0].stuOriginPlace ;
                        this.browseDetailData.stuContactInformation = response.data['data'][0].stuContactInformation ;
                        this.browseDetailData.levelName = response.data['data'][0].levelName ;
                        this.browseDetailData.stuAddress = response.data['data'][0].stuAddress ;
                        this.browseDetailData.teaName = response.data['data'][0].teaName ;
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
        }
    }
</script>