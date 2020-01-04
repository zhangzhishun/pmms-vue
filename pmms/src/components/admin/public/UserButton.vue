<template>
    <el-dropdown trigger="click" @command="batchOperate" >
        <el-button type="primary" size="mini">
            User<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        methods: {
            batchOperate(command) {
                switch (command) {
                    case "exit": this.exit(); break;
                }
            },
            // 用户请求退出
            exit() {
                console.log("用户请求退出")
            },
        },
    }
</script>