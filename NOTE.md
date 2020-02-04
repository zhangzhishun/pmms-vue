# pmms-vue
# 学生党员管理系统vue前端-学习笔记
## 1. 问题描述：post表单传值出错
分析原因：前后台headers设置传值方式不统一
解决方案：设置请求头文件  用于和springboot后台配合
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
## 2. 问题描述：浏览器vue报错信息不准确
解决方案：输出异常
this.$axios({
    method: "post",
    url: "admin/updateStudent",
    data: qs.stringify({data:JSON.stringify(this.browseDetailData)}),
}).then((res) => {
    console.log(res.data);
}).catch(err => {
    console.log(err.response);
})
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
## 4. vue向后台传输时间格式问题：后台接收：2020-01-20T12:46:23.000Z  数据库存储：2020-01-22 13:04:49
### 1) 修改前端返回时间格式：
通过moment.js，进行时间格式转换
首先安装moment.js：
    npm install moment -s
其次在main.js引入moment.js：
    import moment from "moment"
    Vue.prototype.$moment = moment;
使用：
    var dateValue1 = me.$moment(me.dateValue1).format('YYYY-MM-DD HH:mm:ss');
原文链接：https://blog.csdn.net/qq_36727756/article/details/88970290
### 2) 后台处理时间格式：(使用在DealDate中)
dateStr = oldDateStr.replace("Z", " UTC");//是空格+UTC
DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS Z");
date1 = df.parse(dateStr);
SimpleDateFormat df1 = new SimpleDateFormat ("EEE MMM dd HH:mm:ss Z yyyy", Locale.UK);
date = df1.parse(date1.toString());
//此处是将date类型装换为字符串类型，比如：Sat Nov 18 15:12:06 CST 2017转换为2017-11-18 15:12:06
SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
result = sf.format(date);
## 5.vue刷新页面以后丢失store的数据
刷新页面时vue实例重新加载，store就会被重置，可以把定义刷新前把store存入本地localStorage、sessionStorage、cookie中，localStorage是永久储存，重新打开页面时会读取上一次打开的页面数据，sessionStorage是储存到关闭为止，cookie不适合存大量数据。根据我的需求，最合适的是sessionStorage。
beforeunload在页面刷新时触发，可以监听这个方法，让页面在刷新前存store到sessionStorage中。
当然，在页面刷新时还要读取sessionStorage中的数据到store中，读取和储存都写在app.vue中。
```
export default {
  name: 'app',
  created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
```

