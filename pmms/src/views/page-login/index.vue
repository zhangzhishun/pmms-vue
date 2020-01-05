<template>
    <div class="login-box">
        <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
        <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto" show-message>
            <span class="login-title">欢迎登录</span>
            <div style="margin-top: 5px"></div>
            <el-form-item label="用户名" prop="username">
                <el-col :span="22">
                    <el-input type="text" v-model="loginForm.username"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-col :span="22">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <div style="float:center">
                    <el-button type="primary" @click="stuLogin('loginForm')">学生登录</el-button>
                    <el-button type="primary" @click="adminLogin('loginForm')">管理员登录</el-button>
                </div>
                <div style="float:right; margin-top:10px">
                    <el-button type="text" @click="changePassword()">修改密码</el-button>
                    <el-button type="text" @click="onRegit()">注册</el-button>
                </div>
                
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    // 引入qs实现字符串转换为可以提交的类型
    import * as qs from "qs";
    // 用户登录后将token保存到store中，用于判断用户是否已经登录过
    import store from '@/store'
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    // 默认账号密码输入栏为空
                    username: '1',
                    password: 'admin'
                },
                // 表单验证，若未填需要给出提示（在 el-form-item 元素中增加 prop 属性）
                loginFormRules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // 学生登录
            stuLogin(formName) {
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //console.log('submit!');
                        // POST方式提交表单信息，学生登录成功后跳转到StudentInfo.vue界面
                        this.$axios({
                            method: "post",
                            url: "stuLogin",
                            data: qs.stringify(this.loginForm),
                        }).then((res) => {
                            console.log(res.data.base['success']);
                            if(res.data.base["code"] == "200"){
                                // 设置token
                                store.commit('set_token', res.data.token)  
                                this.$router.push({path:'./studentMain'})
                            }else if(res.data.base["code"] == "400"){
                                alert("密码错误");
                            }else if(res.data.base["code"] == "404"){
                                alert("账号不存在");
                            }else if(res.data.base["code"] == "500"){
                                alert("网络异常");
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 管理员登录
            adminLogin(formName) {
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //console.log('submit!');
                        // POST方式提交表单信息，所有管理员登录成功后跳转到Main.vue界面
                        this.$axios({
                            method: "post",
                            url: "adminLogin",
                            data: qs.stringify(this.loginForm),
                        }).then((res) => {
                            console.log(res.data.base['success']);
                            if(res.data.base["code"] == "200"){
                                // 设置token
                                store.commit('set_token', res.data.token)  
                                this.$router.push({path:'./adminMain'})
                            }else if(res.data.base["code"] == "400"){
                                alert("密码错误");
                            }else if(res.data.base["code"] == "404"){
                                alert("账号不存在");
                            }else if(res.data.base["code"] == "500"){
                                alert("网络异常");
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 修改密码
            changePassword() {
                this.$router.push({path:'./changePassword'})
            },
            // 注册
            onRegit() {
                this.$router.push({path:'./register'})
            }
        }
    }
</script>
<style scoped>
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px palegreen;
    }
    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #66CD00;
        font-size: 30px;
        font-weight: bold;
    }
</style>
