// 所有路由信息
import Vue from 'vue'
import Router from 'vue-router'
// 自己写的页面配置路由信息
import Login from '@/views/page-login'
import Register from '@/views/page-register'
import ChangePassword from '@/views/page-change-password'
import AdminMain from '@/views/page-admin-main'
import StudentMain from '@/views/page-student-main'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        // 设置请求拦截 如果为false那么不需要登录即刻访问该界面 
        requireAuth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/adminMain',
      name: 'adminMain',
      component: AdminMain,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/studentMain',
      name: 'studentMain',
      component: StudentMain,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requireAuth: true
      }
    }
  ],
  //mode :"history"//除去#号
})