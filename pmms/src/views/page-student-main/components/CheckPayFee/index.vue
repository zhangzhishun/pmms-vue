
<template>
<div>
  <h1>查看是否缴纳党费</h1>
  <div style="color:red">{{result}}</div>
</div>
</template>

<script>
    import store from '@/store'
    export default {
        name: "CheckPayFee",
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
            
        },
        created(){
            // POST方式提交表单信息
            this.$axios({
                method: "get",
                url: "student/getPartyDuesByStuId/"+this.$store.state.user,
            }).then((res) => {
                console.log(res.data);
                // 如果返回code为200说明后台处理了请求  否则输出网络错误
                if(res.data.code == "200"){
                    // 如果返回的success为true代表后台添加成功 否则直接输出返回的msg消息
                    this.result = res.data.msg;
                }else {
                    alert("网络错误");
                }
            })
        },
        data() {
            return {
                result: ''
            };
        }
    };
</script>


<style>
  
</style>
