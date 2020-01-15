# pmms-vue
# 学生党员管理系统vue前端-学习笔记
## 1. 问题描述：post表单传值出错
分析原因：前后台headers设置传值方式不统一
解决方案：设置请求头文件  用于和springboot后台配合
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
## 2. 问题描述：浏览器vue报错位置错误、刷新显示旧代码
分析原因：
解决方案：
## 3. Vue 数组赋值踩过的坑
Vue中的数组赋值和在普通的JS中赋值还是有所区别。
以下操作可以引起界面刷新：push，pop ，unshift，shift，reverse，sort，splice
以下操作不会引起界面刷新：slice，concat ，filter
还有一点需要注意：
如果通过直接赋值或者改变长度是无法让界面刷新的。
（1）通过索引直接设置项。
（2）修改数组长度，mylist.length=3
第二点，在从服务器中获取数据后赋值需要注意一个问题：主体对象的改变。
比如在使用axios对象发起请求后，在返回方法中处理数据需要注意：
原文链接：https://blog.csdn.net/qq_31490071/article/details/87971114
## 4. 
