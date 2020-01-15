# pmms-vue
# 学生党员管理系统vue前端-README.md
## 一、登录功能
1. 学生登录
学生登录后将学生学号存储到session中，key为stuId，用于以后针对具体学生进行操作
2. 管理员登录
管理员登录后将管理员级别存储到session中，key为admLevel，用于展示不同等级管理员拥有不同权限
## 二、管理员查看所有党员
未完成  get请求出问题


# 使用过程中问题记录：
## 1. 问题描述：post表单传值出错
分析原因：前后台headers设置传值方式不统一
解决方案：设置请求头文件  用于和springboot后台配合
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
## 2. 问题描述：浏览器vue报错位置错误、刷新显示旧代码
分析原因：
解决方案：
3. 