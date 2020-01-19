# pmms-vue
# 学生党员管理系统vue前端-README.md
## 所有依赖
1. vue + element 前端使用饿了么提供的vue框架
2. axios 用于实现get、post请求
3. xlsx、file-saver、script-loader 用于将el-table中选中的数据导出到excel中

## 一、登录功能
1. 学生登录
学生登录后将学生学号存储到session中，key为stuId，用于以后针对具体学生进行操作
2. 管理员登录
管理员登录后将管理员级别存储到session中，key为admLevel，用于展示不同等级管理员拥有不同权限
## 二、管理员查看所有党员
1. 党员管理
点击不同支部结果显示不同 
2. 发展党员
后台写完 
getStudentByPBAndLevel
POST
pb：支部编号
level：学生身份等级

前端未实现 