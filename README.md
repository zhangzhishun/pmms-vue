# pmms-vue
# 学生党员管理系统vue前端-README.md
## 所有依赖
1. vue + element 前端使用饿了么提供的vue框架
2. axios 用于实现get、post请求
3. xlsx、file-saver、script-loader 用于将el-table中选中的数据导出到excel中
4. 通过moment.js，进行格式转换    npm install moment -s
## 一、登录功能
1. 学生登录
学生登录后将学生学号存储到store中，获取方式：this.$store.state.user
2. 管理员登录
管理员登录后将管理员名字和级别存储到store中，获取方式：this.$store.state.role 1-3代表三种管理员
## 二、管理员查看所有党员
1. 党员管理
点击不同支部结果显示不同 
2. 发展党员
修改 删除实现
添加 未实现
文件上传 未实现
头像 未实现
3. 个人信息