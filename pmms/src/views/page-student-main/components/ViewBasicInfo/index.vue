<template>
<div>
  <h1>个人信息</h1>
  <el-form ref="stuDetailData" :model="stuDetailData" label-width="100px">
    <el-form-item label="学号">
      <el-input v-model="stuDetailData.stuId" :readonly="readonly"></el-input>
    </el-form-item>    
    <el-form-item label="姓名">
      <el-input v-model="stuDetailData.stuName" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="stuDetailData.stuSex" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model="stuDetailData.majorName" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="班级">
      <el-input v-model="stuDetailData.stuClassName" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="籍贯">
      <el-input v-model="stuDetailData.stuOriginPlace" :readonly="readonly"></el-input>
    </el-form-item>    
    <el-form-item label="联系方式">
      <el-input v-model="stuDetailData.stuContactInformation" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="所属支部">
      <el-input v-model="stuDetailData.pdName" :readonly="readonly"></el-input>
    </el-form-item>   
    <el-form-item label="级别">
      <el-input v-model="stuDetailData.levelName" :readonly="readonly"></el-input>
    </el-form-item>
  </el-form>
</div>

</template>

<script>
    import store from '@/store'
    // 引入公共的bug，来做为中间传达的工具
    import Bus from '@/components/Bus/bus.js'
    export default {
        name: "PersonalInfo",
        data() {
          return {
            stuDetailData: {
              stuId: '',
              stuName: '',
              stuSex: '',
              majorName: '',
              stuClassName: '',
              stuContactInformation: '',
              stuOriginPlace: '',
              pdName: '',
              levelName: '',
            },
            readonly: true
          }
        },
        components: {
        },
        created () {
          // 在页面加载时读取sessionStorage
          if (sessionStorage.getItem('store')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
          }
          // 在页面刷新时将store保存到sessionStorage里
          window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state))
          })

          // 初始化学生信息
          this.$axios({
              method: "get",
              url: "student/getStudentByStuId/"+this.$store.state.user,
          }).then((response) => {
              if (response.data['data'] != null) {
                  console.log(response.data['data']);
                  // res为获得到的state里的数据
                  this.stuDetailData.stuId = response.data['data'][0].stuId ;
                  this.stuDetailData.stuName = response.data['data'][0].stuName ;
                  this.stuDetailData.stuSex = response.data['data'][0].stuSex ;
                  this.stuDetailData.majorName = response.data['data'][0].majorName ;
                  this.stuDetailData.stuClassName = response.data['data'][0].stuClassName ;
                  this.stuDetailData.stuOriginPlace = response.data['data'][0].stuOriginPlace ;
                  this.stuDetailData.stuContactInformation = response.data['data'][0].stuContactInformation ;
                  this.stuDetailData.levelName = response.data['data'][0].levelName ;
                  this.stuDetailData.pdName = response.data['data'][0].pdName ;
              }
          })
        },
        methods: {
          onSubmit() {
            console.log('submit!');
          }
        },
    };
</script>
<style>
</style>
