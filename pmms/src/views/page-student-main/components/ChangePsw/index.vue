
<template>
<div>
  <h1>修改密码</h1>
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="学号">
            <el-input v-model="form.stuId" :readonly=true></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
            <el-input v-model="form.prePsw" placeholder="旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码"  prop="newPsw">
            <el-input type="password" v-model.trim="form.newPsw" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPsw2">
            <el-input type="password" v-model.trim="form.newPsw2" placeholder="确认新密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    import store from '@/store'
    // 引入qs实现字符串转换为可以提交的类型
    import * as qs from "qs";
    export default {
        name: "ChangePsw",
        components: {
          store,
        },
        // 创建前状态
        beforeCreate () {
            // 在页面加载前读取sessionStorage
            if (sessionStorage.getItem('token') != '') {
                store.state.token = sessionStorage.getItem('token')
            }
            // 在页面刷新前将store保存到sessionStorage里
            window.addEventListener('beforeunload', () => {
                sessionStorage.token = store.state.token
            })
        },
        methods: {
            onSubmit() {
                if(this.form.newPsw == this.form.newPsw2){
                    // POST方式提交表单信息
                    this.$axios({
                        method: "post",
                        url: "student/updateStuPsw",
                        data: qs.stringify(this.form),
                    }).then((res) => {
                        console.log(res.data);
                        // 如果返回code为200说明后台处理了请求  否则输出网络错误
                        if(res.data.code == "200"){
                            // 如果返回的success为true代表后台添加成功 否则直接输出返回的msg消息
                            if(res.data.success == true){
                                alert("更新成功");
                            }else {
                                alert(res.data.msg);
                            }
                        }else {
                            alert("网络错误");
                        }
                    })
                }else{
                    alert("两次输入密码不一致!");
                }
            }
        },
        data() {
            var validatePass = (rule, value, callback) => {            
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                    } else if (value !== this.form.newPsw) {
                    callback(new Error('两次输入密码不一致!'));
                    } else {
                    callback();
                    }
            };
            return {
                form: {
                    stuId: this.$store.state.user ,
                    prePsw: '',
                    newPsw: '',
                    newPsw2: '',
                },
                rules:{
                    newPsw2:[
                        {validator: validatePass, trigger: 'blur' }
                    ]    
                }
            };
        }
    };
</script>


<style>
  
</style>
