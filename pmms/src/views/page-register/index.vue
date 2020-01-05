
<template>
<div>
  <h1>注册</h1>
</div>
</template>

<script>
    import store from '@/store'
    export default {
        name: "OnRegit",
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
        data() {
            return {
            };
        }
    };
</script>


<style>
  
</style>
