<template>
<div>
  <h1>个人信息</h1>
  <el-form ref="admDetailData" :model="admDetailData" label-width="100px">
    <el-form-item label="管理员ID">
      <el-input v-model="admDetailData.admId" :readonly="readonly"></el-input>
    </el-form-item>    
    <el-form-item label="管理员名称">
      <el-input v-model="admDetailData.admName" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="管理员级别">
      <el-input v-model="admDetailData.admLevel" :readonly="readonly"></el-input>
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
            admDetailData: {
              admId: '',
              admName: '',
              admLevel: '',
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
              url: "admin/getAdminByAdmName/"+this.$store.state.user,
          }).then((response) => {
              if (response.data['data'] != null) {
                  console.log(response.data['data']);
                  // res为获得到的state里的数据
                  this.admDetailData.admId = response.data['data'].admId ;
                  this.admDetailData.admName = response.data['data'].admName ;
                  this.admDetailData.admLevel = response.data['data'].admLevel ;
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
