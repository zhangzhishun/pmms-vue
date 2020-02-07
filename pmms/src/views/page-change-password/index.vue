<template>
<div>
  <h1>找回密码-主页</h1>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="学号">
      <el-input v-model="form.stuId" placeholder="学号" ></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.stuName" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="班级">
      <el-input v-model="form.stuClassName" placeholder="班级"></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="form.stuContactInformation" placeholder="联系方式"></el-input>
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
// 引入qs实现字符串转换为可以提交的类型
import * as qs from 'qs'
// 用户登录后将token保存到store中，用于判断用户是否已经登录过
import store from '@/store'
export default {
  name: 'ChangePassword',
  components: {
    store
  },
  methods: {
    onSubmit () {
      if (this.form.newPsw == this.form.newPsw2) {
        // POST方式提交表单信息
        this.$axios({
          method: 'post',
          url: 'changePassword',
          data: qs.stringify(this.form)
        }).then((res) => {
          console.log(res.data)
          // 如果返回code为200说明后台处理了请求  否则输出网络错误
          if (res.data.code == '200') {
            // 如果返回的success为true代表后台添加成功 否则直接输出返回的msg消息
            if (res.data.success == true) {
              alert('重置密码成功')
            } else {
              alert(res.data.msg)
            }
          } else {
            alert('网络错误')
          }
        })
      } else {
        alert('两次输入密码不一致!')
      }
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPsw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        stuId: '20160001',
        stuName: '张三',
        stuClassName: '计科1601',
        stuContactInformation: '12345678900',
        newPsw: '1',
        newPsw2: '1'
      },
      rules: {
        newPsw2: [
          {validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>

</style>
