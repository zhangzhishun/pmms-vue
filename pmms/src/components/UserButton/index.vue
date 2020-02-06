<!-- 通用模块：界面右上角的用户名和退出按钮 -->
<template>
    <el-dropdown trigger="click" @command="batchOperate" >
        <el-button type="primary" size="mini">
            {{this.$store.state.user}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import store from '@/store'
    export default {
        methods: {
            batchOperate(command) {
                switch (command) {
                    case "exit": this.exit(); break;
                }
            },
            // 用户请求退出
            exit() {
                // 将store置空
                this.$store.commit('setUser', '');    
                this.$store.commit('setRole', '');  
                // 将session置空
                sessionStorage.clear();
                // 返回主页
                this.$router.push({path:'/'})  
            },
        },
    }
</script>